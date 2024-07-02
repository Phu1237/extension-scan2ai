import type { ChromeMessageRequest } from '@/types/chromemessage';

const log = (...args: any) => {
  if (import.meta.env.MODE === 'development') {
    if (args.length > 2) {
      console.group(args[0]);
      for (let i = 1; i < args.length; i++) {
        console.log(args[i]);
      }
      console.groupEnd();
      return;
    }
    console.log(...args);
    return;
  }
};

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.action.setBadgeText({
//     text: 'OFF'
//   });
// });

// async function captureTab(tab) {
//   return await chrome.tabs.captureVisibleTab((dataUrl) => {
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
//   });
// }

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  // if (tab.url.startsWith(extensions) || tab.url.startsWith(webstore)) {
  // Retrieve the action badge to check if the extension is 'ON' or 'OFF'
  const prevState = await chrome.action.getBadgeText({ tabId: tab.id });
  // Next state will always be the opposite
  const nextState = prevState === 'ON' ? 'OFF' : 'ON';

  // captureTab(tab);
  // Set the action badge to the next state
  await chrome.action.setBadgeText({
    tabId: tab.id,
    text: nextState
  });
  if (nextState === 'ON') {
    // Fix bug of import raw multiple times
    // const variable is declared
    if (prevState === '') {
      await chrome.scripting.executeScript(
        {
          target: { tabId: tab.id },
          files: [
            // 'html2canvas.min.js',
            'content.js'
          ]
        },
        () => {}
      );
    } else {
      chrome.tabs.sendMessage(tab.id, {
        action: 'reinit'
      });
    }
  } else {
    chrome.tabs.sendMessage(tab.id, {
      action: 'destroy'
    });
  }
  // }
});

chrome.runtime.onMessage.addListener(async function (
  request: ChromeMessageRequest,
  sender,
  sendResponse
) {
  log(sender.tab ? 'from a content script:' + sender.tab : 'from the extension');
  log('request', request);
  switch (request.action) {
    case 'selected':
      if (request.attributes.capturePlace && request.attributes.capturePlace === 'background') {
        switch (request.attributes.captureType) {
          case 'visible': {
            const result = await chrome.tabs.captureVisibleTab();

            if (!sender.tab || !sender.tab.id) return;
            chrome.tabs.sendMessage(sender.tab.id, {
              result: 'selected',
              value: {
                ...request.value,
                result: result
              }
            });
            break;
          }
          case 'fullpage':
            // captureTab(sender.tab);
            break;
          default:
        }
      }
      break;
    case 'crop':
      chrome.storage.local.set({
        image: request.value
      });
      if (!sender.tab || !sender.tab.id) return;
      chrome.tabs.sendMessage(sender.tab.id, {
        result: 'crop',
        value: request.value
      });
      break;
    case 'off':
      if (!sender.tab || !sender.tab.id) return;
      await chrome.tabs.sendMessage(sender.tab.id, {
        action: 'destroy'
      });
      await chrome.action.setBadgeText({
        tabId: sender.tab.id,
        text: 'OFF'
      });
      break;
    case 'history':
      chrome.windows.create({ url: 'ui.html#/history', type: 'popup' });
      break;
    case 'setting':
      chrome.windows.create({ url: 'ui.html#/setting', type: 'popup' });
      break;
    case 'scan':
      chrome.windows.create({ url: 'ui.html#/', type: 'popup' });
      break;
  }
});
