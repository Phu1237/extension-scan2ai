import extHtml from './content/ext.html?raw';
import extCss from './content/ext.css?raw';
import {
  crop,
  selected,
  getBodyHeight,
  hideOverflow,
  getClipboardContents
} from './content/helpers';
import captureChromeAPIVisibleContent from './capture/chrome-api-visible-content';
import useSelecting from './selecting';

const { isFullPage, capturePlace, captureType } = captureChromeAPIVisibleContent();
const { selectingDragAndDrop, selectingClickToStartAndEnd } = useSelecting();
const { init: initSelecting, destroy: destroySelecting } = selectingDragAndDrop();

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

function onChromeMessage(
  request: any,
  sender: chrome.runtime.MessageSender,
  sendResponse: () => any
) {
  log('listen', request);
  if (request.result) {
    if (request.result === 'selected') {
      const img = request.value.result;
      const x = request.value.x;
      const y = request.value.y;
      const width = request.value.width;
      const height = request.value.height;
      crop(img, x, y, width, height);
    } else if (request.result === 'crop') {
      const shadowEl = document.getElementById('scan2ai')!;
      const shadow = shadowEl.shadowRoot!;
      const resultEl = shadow.getElementById('scan2ai-result')!;
      resultEl.classList.remove('hidden');
    }
    return;
  }
  if (request.action === 'reinit') {
    init();
  } else if (request.action === 'destroy') {
    document.getElementById('scan2ai')?.remove();
    destroySelecting();
    // chrome.runtime.onMessage.removeListener(onChromeMessage);
  }
}

chrome.runtime.onMessage.addListener(onChromeMessage);

function initExtension() {
  const extension = document.createElement('div');
  extension.id = 'scan2ai';
  extension.setAttribute(
    'style',
    `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: ${getBodyHeight()}px;
    z-index: 9999;
  `
  );

  const shadow = extension.attachShadow({ mode: 'open' });
  const html = document.createElement('div');
  html.id = 'scan2ai-html';
  html.innerHTML = extHtml;
  html.style.width = '100%';
  html.style.height = '100%';
  shadow.appendChild(html);
  const style = document.createElement('style');
  style.textContent = extCss;
  style.id = 'scan2ai-style';
  shadow.appendChild(style);

  // extension.appendChild(html);
  document.body.appendChild(extension);
  // init button events
  shadow.getElementById('scan2ai-result-dialog-close')?.addEventListener('click', () => {
    const resultEl = shadow.getElementById('scan2ai-result')!;
    resultEl.classList.add('hidden');
    const selectEl = shadow.getElementById('scan2ai-select')!;
    selectEl.classList.remove('hidden');
    hideOverflow(false);
    const selectAreaEl = shadow.getElementById('scan2ai-select-area')!;
    selectAreaEl.classList.add('hidden');
  });
  shadow.querySelectorAll('[data-name="scan2ai-result-action"]').forEach((el) => {
    el.addEventListener('click', () => {
      chrome.runtime.sendMessage({
        action: el.getAttribute('data-action')
      });
    });
  });
  initSelecting(shadow, {
    window: window,
    document: document,
    onSelectingStart: () => {
      log('onSelectingStart');
      if (fullpage) {
        //
      } else {
        hideOverflow(true);
      }
    },
    onSelectingEnd: (result) => {
      log('onSelectingEnd', result);
      // if (fullpage) {
      //   //
      // } else {
      //   document.body.style.removeProperty('overflow');
      // }
      const selectEl = shadow.getElementById('scan2ai-select')!;
      selectEl.classList.add('hidden');
      const x = fullpage ? result.pageX : result.clientX;
      const y = fullpage ? result.pageY : result.clientY;
      const width = result.width;
      const height = result.height;
      if (!x || !y || !width || !height) {
        const selectEl = shadow.getElementById('scan2ai-select')!;
        selectEl.classList.remove('hidden');
        hideOverflow(false);
        return;
      }
      // Wait for 100ms for the selecting area to be hidden
      setTimeout(() => {
        selected(
          {
            capturePlace: capturePlace,
            captureType: captureType
          },
          x,
          y,
          width,
          height
        );
      }, 50);
    }
  });
}

const fullpage = isFullPage;

async function showClipboardImage() {
  const clipboard = getClipboardContents((render) => {
    if (!render) return;
    console.log(render);

    const cbImage = document.getElementById('scan2ai-clipboard-img')! as HTMLImageElement;
    cbImage.src = String(render);
  });
}

function init() {
  showClipboardImage();
  initExtension();
}
init();
