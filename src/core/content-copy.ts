import { captureMethodValue, selectingMethod } from '@/constants/common'
import { DRAG_AND_DROP } from './selecting';

function extCss() {
  return `
    #scan2ai-html, #scan2ai-html * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      cursor: crosshair;
    }
    #scan2ai-html canvas {
      display: block;
      width: auto;
      height: auto;
    }

    #scan2ai-html .hidden {
      display: none !important;
    }

    // #scan2ai-html #backdrop {
    //   position: absolute;
    //   left: 0;
    //   top: 0;
    //   width: 100%;
    //   height: 100%;
    //   background-color: #00000050;
    // }
    #scan2ai-html #scan2ai-select {
      position: absolute;
      background: #00000050;
      z-index: 1000;
    }
    #scan2ai-html #scan2ai-result {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }
  `;
}
function extHtml() {
  return `
    <div id="backdrop"></div>
    <div id="scan2ai-select" class="hidden"></div>
    <img id="img" class="hidden">
    <div id="scan2ai-result" class="hidden">
      <div>
        Interact with your capture area
        <span>x</span>
      </div>
      <div>
        <div style="width: fit-content; border: 1px solid red;">
          <canvas id="canvas"></canvas>
        </div>
      </div>
      <div>
        <div>Bot: ABC</div>
        <div>You</div>
      </div>
    </div>
  `;
}

// chrome.tabs.captureVisibleTab((dataUrl) => {
//   console.log(dataUrl);
// });

// html2canvas(document.body).then(canvas => {
//   let ctx = canvas.getContext('2d');
//   document.getElementById('img').src = canvas.toDataURL();
//   // let img = document.getElementById('img');
//   // let canvasA = document.getElementById('canvas');
//   // let ctxA = canvasA.getContext('2d');
//   // ctxA.drawImage(img, 0, 0, 100, 100);
//   // document.body.appendChild(canvas)
// });
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  document.getElementById('img')?.setAttribute('src', message.value);
  // document.getElementById('img').src = message.value;
})

var x = null;
var y = null;
var width = null;
var height = null;
function clearSelection() {
  x = null;
  y = null;
  width = null;
  height = null;
  // Remove selection to prevent selection bug
  if (window.getSelection) {
    if (window.getSelection().empty) {  // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) {  // Firefox
      window.getSelection().removeAllRanges();
    }
  } else if (document.selection) {  // IE?
    document.selection.empty();
  }
}
function crop() {
  console.log('crop');
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let img = document.getElementById('img');
  canvas.width = width;
  canvas.height = height;
  // canvas.style.width = width + 'px';
  // canvas.style.height = height + 'px';
  ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
  clearSelection();

  chrome.runtime.sendMessage({
    action: 'capturedImage',
    value: canvas.toDataURL()
  });
}

async function initialize() {

  DRAG_AND_DROP.init();
}
initialize();
