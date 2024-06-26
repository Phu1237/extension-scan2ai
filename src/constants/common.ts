export const captureMethodValue = {
  CHROME_API_VISIBLE_CONTENT: 'chrome-api-visible-content',
  CHROME_API_FULL_PAGE: 'chrome-api-full-page',
  HTML2CANVAS: 'html2canvas',
}
export const captureMethod = [
  {
    name: 'Chrome API (visible content)',
    value: captureMethodValue.CHROME_API_VISIBLE_CONTENT
  },
  {
    name: 'Chrome API (full page)',
    value: captureMethodValue.CHROME_API_FULL_PAGE
  },
  {
    name: 'HTML2Canvas',
    value: captureMethodValue.HTML2CANVAS
  },
];

export const selectingMethod = {
  MOUSE_DRAG_AND_DROP: 1,
  MOUSE_CLICK_TO_START_AND_END: 2,
}
