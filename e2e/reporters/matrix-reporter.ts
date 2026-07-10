import type { Reporter, TestCase, TestResult, FullConfig, FullResult, Suite } from "@playwright/test/reporter";
import fs from "fs";
import path from "path";

// One row per test case, one column per project (mobile/desktop/...) — the stock Playwright
// HTML report lists every (test, project) pair as its own row instead, which makes comparing
// dimensions side by side tedious. This is a lightweight companion, not a replacement: the full
// HTML report is still where you go for screenshots/traces on a specific run.

function getProjectName(test: TestCase): string {
  let suite: Suite | undefined = test.parent;
  while (suite) {
    const project = suite.project();
    if (project) return project.name;
    suite = suite.parent;
  }
  return "unknown";
}

// titlePath() is ["", projectName, filePath, ...describeTitles, testTitle] — drop the leading
// empty root entry and the project name so the same test across projects collapses onto one
// row, keeping the file as the group key.
function splitTitlePath(test: TestCase): { file: string; rowLabel: string } {
  const [, , file, ...rest] = test.titlePath();
  return { file, rowLabel: rest.join(" › ") };
}

const STATUS_STYLE: Record<string, { bg: string; fg: string; label: string }> = {
  passed: { bg: "#e6f4ea", fg: "#1e7e34", label: "passed" },
  failed: { bg: "#fdecea", fg: "#c62828", label: "failed" },
  timedOut: { bg: "#fdecea", fg: "#c62828", label: "timed out" },
  interrupted: { bg: "#fff3e0", fg: "#e65100", label: "interrupted" },
  skipped: { bg: "#f1f1f1", fg: "#757575", label: "skipped" },
};

type Cell = { status: string; duration: number; retries: number };

export default class MatrixReporter implements Reporter {
  private outputFile: string;
  private title: string;
  // file -> rowLabel -> project -> cell. Preserves first-seen order for stable, readable output.
  private groups = new Map<string, Map<string, Map<string, Cell>>>();
  private projects: string[] = [];

  constructor(options: { outputFile?: string; title?: string } = {}) {
    this.outputFile = options.outputFile || "matrix-report.html";
    this.title = options.title || "Test Matrix";
  }

  onBegin(config: FullConfig, _suite: Suite) {
    this.projects = config.projects.map((p) => p.name);
  }

  onTestEnd(test: TestCase, result: TestResult) {
    const { file, rowLabel } = splitTitlePath(test);
    const project = getProjectName(test);
    if (!this.groups.has(file)) this.groups.set(file, new Map());
    const fileGroup = this.groups.get(file)!;
    if (!fileGroup.has(rowLabel)) fileGroup.set(rowLabel, new Map());
    fileGroup.get(rowLabel)!.set(project, {
      status: result.status,
      duration: result.duration,
      retries: result.retry,
    });
  }

  onEnd(_result: FullResult) {
    const html = this.buildHtml();
    fs.mkdirSync(path.dirname(this.outputFile), { recursive: true });
    fs.writeFileSync(this.outputFile, html);
    // eslint-disable-next-line no-console
    console.log(`\nMatrix report: ${path.resolve(this.outputFile)}\n`);
  }

  private buildHtml(): string {
    const esc = (s: string) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

    const cellHtml = (cell: Cell | undefined) => {
      if (!cell) return `<td class="cell empty">—</td>`;
      const style = STATUS_STYLE[cell.status] ?? { bg: "#f1f1f1", fg: "#757575", label: cell.status };
      const retryNote = cell.retries > 0 ? ` <span class="retry">(retry ${cell.retries})</span>` : "";
      return `<td class="cell"><span class="badge" style="background:${style.bg};color:${style.fg}">${style.label}</span><div class="duration">${(cell.duration / 1000).toFixed(1)}s${retryNote}</div></td>`;
    };

    const sections = [...this.groups.entries()]
      .map(([file, rowMap]) => {
        const body = [...rowMap.entries()]
          .map(
            ([rowLabel, cells]) =>
              `<tr><td class="row-label">${esc(rowLabel)}</td>${this.projects.map((p) => cellHtml(cells.get(p))).join("")}</tr>`
          )
          .join("\n");
        return `<h2>${esc(file)}</h2><table><thead><tr><th>Test</th>${this.projects
          .map((p) => `<th>${esc(p)}</th>`)
          .join("")}</tr></thead><tbody>${body}</tbody></table>`;
      })
      .join("\n");

    return `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>${esc(this.title)}</title>
<style>
  body { font-family: -apple-system, Segoe UI, Roboto, sans-serif; margin: 24px; color: #1a1a1a; background: #fff; }
  h1 { font-size: 20px; }
  h2 { font-size: 14px; color: #444; margin-top: 32px; margin-bottom: 8px; font-weight: 600; }
  table { border-collapse: collapse; width: 100%; margin-bottom: 8px; }
  th, td { border: 1px solid #e0e0e0; padding: 8px 12px; text-align: left; font-size: 13px; vertical-align: top; }
  th { background: #fafafa; font-weight: 600; color: #555; }
  .row-label { max-width: 480px; }
  .cell.empty { color: #bbb; text-align: center; }
  .badge { display: inline-block; padding: 2px 8px; border-radius: 10px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
  .duration { font-size: 11px; color: #888; margin-top: 4px; }
  .retry { color: #e65100; }
</style>
</head>
<body>
<h1>${esc(this.title)}</h1>
${sections || "<p>No tests ran.</p>"}
</body>
</html>`;
  }
}
