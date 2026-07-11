/** Shrinks a font size so `text` fits within `maxWidth` on the given canvas context, never growing past `baseFontSize`. */
export function fitFontSizeToWidth(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  baseFontSize: number,
  fontFamily: string = '"Times New Roman", serif',
  minFontSize: number = Math.round(baseFontSize * 0.55)
): number {
  let fontSize = baseFontSize;
  ctx.font = `normal ${fontSize}px ${fontFamily}`;
  let measured = ctx.measureText(text).width;

  if (measured <= maxWidth) return fontSize;

  // One ratio-based jump gets close; a couple of corrective passes account for
  // font metrics not scaling perfectly linearly with size.
  for (let i = 0; i < 3 && measured > maxWidth; i++) {
    fontSize = Math.max(minFontSize, Math.floor(fontSize * (maxWidth / measured)));
    ctx.font = `normal ${fontSize}px ${fontFamily}`;
    measured = ctx.measureText(text).width;
    if (fontSize <= minFontSize) break;
  }

  return fontSize;
}
