import extHtml from './content/ext.html?raw';
import extCss from './content/ext.css?raw';
import {
  CHROME_MESSAGE_BACKGROUND_ACTION,
  CHROME_MESSAGE_CONTENT_ACTION,
  DEFAULT_EXTRA_CONTENTS
} from './content/constants';
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
const { selectingDragAndDrop } = useSelecting();
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

function addQuickActionButtons() {
  chrome.storage.sync.get(['extraContent'], (res) => {
    const shadowEl = document.getElementById('scan2ai')!;
    const shadow = shadowEl.shadowRoot!;
    const quickScanEl = shadow.getElementById('scan2ai-result-quick-scan')!;
    quickScanEl.classList.remove('hidden');

    const quickScanActionsEl = shadow.getElementById('scan2ai-result-quick-scan-actions')!;
    quickScanActionsEl.innerHTML = '';
    const quickActions = [...DEFAULT_EXTRA_CONTENTS];
    const extraContent = res.extraContent || [];
    quickActions.push(...extraContent);
    quickActions.forEach((action: string) => {
      const btn = document.createElement('button');
      btn.textContent = action;
      btn.classList.add('btn', 'btn-primary', 'm-1');
      btn.addEventListener('click', () => {
        chrome.runtime.sendMessage({
          action: CHROME_MESSAGE_BACKGROUND_ACTION.SCAN,
          value: action
        });
      });
      quickScanActionsEl.appendChild(btn);
    });
  });
}

function onChromeMessage(request: any) {
  log('listen', request);
  if (request.result) {
    if (request.result === 'selected') {
      const img = request.value.result;
      const x = request.value.x;
      const y = request.value.y;
      const width = request.value.width;
      const height = request.value.height;
      crop(img, x, y, width, height);
    }
    return;
  }
  switch (request.action) {
    case CHROME_MESSAGE_CONTENT_ACTION.REINIT:
      init();
      break;
    case CHROME_MESSAGE_CONTENT_ACTION.DESTROY:
      document.getElementById('scan2ai')?.remove();
      destroySelecting();
      hideOverflow(false);
      break;
    case CHROME_MESSAGE_CONTENT_ACTION.SHOW_RESULT: {
      const shadowEl = document.getElementById('scan2ai')!;
      const shadow = shadowEl.shadowRoot!;
      const selectEl = shadow.getElementById('scan2ai-select')!;
      selectEl.classList.add('hidden');
      const resultEl = shadow.getElementById('scan2ai-result')!;
      resultEl.classList.remove('hidden');
      const quickScanEl = shadow.getElementById('scan2ai-result-quick-scan')!;
      quickScanEl.classList.add('hidden');
      addQuickActionButtons();
      break;
    }
  }
}

chrome.runtime.onMessage.addListener(onChromeMessage);

const fullpage = isFullPage;

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
  /**
   * Button events
   */
  // Toolbar button
  shadow.getElementById('scan2ai-toolbar-btn')?.addEventListener('click', (el) => {
    const btnEl = el.currentTarget as HTMLElement;
    btnEl.classList.toggle('active');
    btnEl.querySelector('#open-toolbar-icon')?.classList.toggle('hidden');
    btnEl.querySelector('#close-toolbar-icon')?.classList.toggle('hidden');
    const actionsEl = shadow.getElementById('scan2ai-toolbar-actions')!;
    actionsEl.classList.toggle('hidden');
  });
  // Other toolbar buttons
  shadow.querySelectorAll('[data-name="scan2ai-toolbar-action"]').forEach((el) => {
    el.addEventListener('click', () => {
      const action = el.getAttribute('data-action');
      log('scan2ai-toolbar-action', action);
      switch (action) {
        case CHROME_MESSAGE_BACKGROUND_ACTION.TURN_OFF:
        case CHROME_MESSAGE_BACKGROUND_ACTION.HISTORY:
        case CHROME_MESSAGE_BACKGROUND_ACTION.SETTING:
        case CHROME_MESSAGE_BACKGROUND_ACTION.INSTRUCTION:
        case CHROME_MESSAGE_BACKGROUND_ACTION.SETTING:
          chrome.runtime.sendMessage({
            action: el.getAttribute('data-action')
          });
          break;
        case CHROME_MESSAGE_BACKGROUND_ACTION.CLIPBOARD_SCAN:
          getClipboardContents((render) => {
            log('getClipboardContents', render);
            if (!render) {
              alert(
                'No valid image found in the clipboard data!\nExample:\n- For Windows: Windows + Shift + S'
              );
              return;
            }
            const base64Img = render as string;
            crop(base64Img);
          });
          break;
        default:
          log('Action not registered!', action);
      }
    });
  });
  shadow.querySelectorAll('[data-name="scan2ai-result-action"]').forEach((el) => {
    el.addEventListener('click', () => {
      const action = el.getAttribute('data-action');
      switch (action) {
        case CHROME_MESSAGE_BACKGROUND_ACTION.TURN_OFF:
        case CHROME_MESSAGE_BACKGROUND_ACTION.HISTORY:
        case CHROME_MESSAGE_BACKGROUND_ACTION.SETTING:
        case CHROME_MESSAGE_BACKGROUND_ACTION.SCAN:
          chrome.runtime.sendMessage({
            action: el.getAttribute('data-action')
          });
          break;
        default:
          log('Action not register', action);
      }
    });
  });
  initSelecting(shadow, {
    window: window,
    document: document,
    onSelectingStart: () => {
      log('onSelectingStart');
      const toolbarEl = shadow.querySelector('.scan2ai-toolbar')!;
      toolbarEl.classList.add('hidden');
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
      const toolbarEl = shadow.querySelector('.scan2ai-toolbar')!;
      toolbarEl.classList.remove('hidden');
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
      }, 100);
    }
  });
}

function init() {
  initExtension();
}
init();
