chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: "OFF",
  });
});

function reddenPage() {
  document.body.style.backgroundColor = 'red';
}

// chrome.action.onClicked.addListener((tab) => {
//   console.log(123);
//   if (!tab.url.includes('chrome://')) {
//     chrome.scripting.executeScript({
//       target: { tabId: tab.id },
//       func: reddenPage
//     });
//   }
// });

const extensions = 'https://developer.chrome.com/docs/extensions'
const webstore = 'https://developer.chrome.com/docs/webstore'

chrome.action.onClicked.addListener(async (tab) => {
  // if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'

  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState,
  });
  await chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      files: [
        'html2canvas.min.js',
        'content.js'
      ],
    },
    () => { }
  )
  // }
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.action === 'capturedImage') {
      console.log('', request.value);
      chrome.storage.local.set({
        image: request.value
      });
      // sendResponse({ result: 'capturedImage' })
    }
  }
);
