import extHtml from './content/ext.html?raw';
import extCss from './content/ext.css?raw';
import { crop, selected, getBodyHeight } from './content/helpers'
import captureChromeAPIVisibleContent from './capture/chrome-api-visible-content';
import useSelecting from './selecting';

const { isFullPage, capturePlace, captureType } = captureChromeAPIVisibleContent();
const { selectingDragAndDrop, selectingClickToStartAndEnd } = useSelecting();
const { init, destroy } = selectingDragAndDrop();

function onChromeMessage(request: any, sender: chrome.runtime.MessageSender, sendResponse: () => any) {
  console.log('listen', request);
  if (request.result === 'selected') {
    const img = request.value.result;
    const x = request.value.x;
    const y = request.value.y;
    const width = request.value.width;
    const height = request.value.height;
    crop(img, x, y, width, height);
  } else if (request.action === 'destroy') {
    document.getElementById('scan2ai')?.remove();
    destroy();
    chrome.runtime.onMessage.removeListener(onChromeMessage);
  }
}

chrome.runtime.onMessage.addListener(onChromeMessage);
chrome.storage.sync.get(null, (result) => {
  console.log(result);
});

function initExtension() {
  const extension = document.createElement('div');
  extension.id = 'scan2ai';
  const style = document.createElement('style');
  style.textContent = extCss;
  style.id = 'scan2ai-style';
  extension.appendChild(style);
  const html = document.createElement('div');
  html.id = 'scan2ai-html';
  html.style.position = 'absolute';
  html.style.top = '0';
  html.style.left = '0';
  html.style.width = '100%';
  html.style.height = getBodyHeight() + 'px';
  html.style.zIndex = '9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999';
  html.innerHTML = extHtml;

  extension.appendChild(html);
  document.body.appendChild(extension);
}
initExtension();

const fullpage = isFullPage;

init({
  window: window,
  document: document,
  onSelectingStart: () => {
    console.log('onSelectingStart');
    if (fullpage) {
      //
    } else {
      document.body.style.overflow = 'hidden';
    }
  },
  onSelectingEnd: (result) => {
    console.log('onSelectingEnd', result);
    const x = fullpage ? result.pageX : result.clientX;
    const y = fullpage ? result.pageY : result.clientY;
    const width = result.width;
    const height = result.height;
    selected({
      capturePlace: capturePlace,
      captureType: captureType
    }, x, y, width, height);
    if (fullpage) {
      //
    } else {
      document.body.style.removeProperty('overflow');
    }
  }
});
