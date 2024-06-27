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

const fullpage = false;
async function captureTab(tab) {
  await chrome.tabs.captureVisibleTab((dataUrl) => {
    // var img = document.createElement('img');
    // img.src = dataUrl;
    // img.onload = () => {
    //   let canvas = document.createElement('canvas');
    //   canvas.width = img.width;
    //   canvas.height = document.body.scrollHeight;
    //   let ctx = canvas.getContext('2d');
    //   ctx.drawImage(img, 0, 0, img.width, img.height);
    //   chrome.tabs.executeScript(null, {
    //     code: "window.scrollTo(0, document.body.scrollHeight)"
    //   }, () => {
    //     setTimeout(function () {
    //       chrome.tabs.captureVisibleTab(null, { format: "png" }, function (dataUrl) {
    //         var img2 = document.createElement('img');
    //         img2.src = dataUrl;
    //         img2.onload = function () {
    //           ctx.drawImage(img2, 0, img.height, img2.width, img2.height);
    //           var finalDataUrl = canvas.toDataURL("image/png");
    //           window.open(finalDataUrl, '_blank');
    //           // Use finalDataUrl as needed
    //         }
    //       });
    //     }, 500)
    //   })
    // }

  });
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  // if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON'

  captureTab(tab);
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
