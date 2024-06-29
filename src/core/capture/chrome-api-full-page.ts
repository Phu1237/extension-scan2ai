export default async function () {
  const isFullPage = false;

  return await chrome.tabs.captureVisibleTab();
}
