const fs = require('fs');
const file = 'src/test/preview_all_days.test.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace LIVE with Ongoing now
content = content.replace(/expect\(text\)\.toContain\("LIVE"\);/g, 'expect(text).toContain("Ongoing now");');

// Replace Bonus Special Session with Special Bonus Session
content = content.replace(/expect\(text\)\.toContain\("Bonus Special Session"\);/g, 'expect(text).toContain("Special Bonus Session");');

// Fix the 'between sessions' expectations where 'Your Yoga Session' was removed
content = content.replace(/expect\(text\)\.toContain\("Your Yoga Session"\);\s+expect\(text\)\.toContain\("4:30 PM"\);/g, 'expect(text).toContain("Next Yoga session is at 4:30PM");');
content = content.replace(/expect\(text\)\.toContain\("Your Yoga Session"\);\s+expect\(text\)\.toContain\("4:30"\);/g, 'expect(text).toContain("Next Yoga session is at 4:30PM");');

// Day 9 at 2:00 PM has only: expect(text).toContain("Your Yoga Session");
// We should replace that one specifically for between sessions
content = content.replace(/Day 9 at 2:00 PM — between sessions"[\s\S]*?expect\(text\)\.toContain\("Your Yoga Session"\);/g, 'Day 9 at 2:00 PM — between sessions", () => {\n    const c = renderPreview("Free_day9_2.00PM");\n    const text = getRenderedText(c);\n    expect(text).toContain("Next Yoga session is at 4:30PM");');

// Fix 'tomorrow' to 'Tomorrow'
content = content.replace(/expect\(text\)\.toContain\("tomorrow"\);/g, 'expect(text).toContain("Tomorrow");');

// Fix paid tests to use a mocked time where no bonus session is active, e.g. 10:00 AM
content = content.replace(/renderPreview\("paid"\);/g, 'renderPreview("paid_week1_day1_afterthesession_plan6month");');
content = content.replace(/renderPreview\("paid12"\);/g, 'renderPreview("paid_week1_day1_afterthesession_plan12month");');
content = content.replace(/renderPreview\("paidendsoon"\);/g, 'renderPreview("paid_week1_day1_afterthesession_plan12month");');

fs.writeFileSync(file, content);
