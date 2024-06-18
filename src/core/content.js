console.log(123);

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

html2canvas(document.body).then(canvas => {
  let ctx = canvas.getContext('2d');
  document.getElementById('img').src = canvas.toDataURL();
  // let img = document.getElementById('img');
  // let canvasA = document.getElementById('canvas');
  // let ctxA = canvasA.getContext('2d');
  // ctxA.drawImage(img, 0, 0, 100, 100);
  // document.body.appendChild(canvas)
});
/**
 * Mode 1: Click and hold
 * Mode 2: Click to start and click to end
 */
let selectingMode = 1;
let selectingStart = false;
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

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);

function onMouseUpdate(e) {
  // if (selectingMode === 1) return;
  if (!selectingStart) return;
  console.log(1);
  let select = document.getElementById('scan2ai-select');
  let currentX = e.pageX;
  let currentY = e.pageY;
  // width = Math.max(currentX, x) - Math.min(currentX, x);
  // height = Math.max(currentY, y) - Math.min(currentY, y);
  width = currentX - x;
  height = currentY - y;
  // select.style.top = e.clientY + 'px';
  // select.style.left = e.clientX + 'px';
  select.style.width = width + 'px';
  select.style.height = height + 'px';
}

function onMouseDown(e) {
  if (e.which !== 1) return;
  console.log('onMouseDown', selectingStart);
  selectingStart = true;
  x = e.pageX;
  y = e.pageY;
  let select = document.getElementById('scan2ai-select');
  select.classList.remove('hidden');
  let result = document.getElementById('scan2ai-result');
  result.classList.add('hidden');
  setSelected(y, x);
}

function setSelected(top, left, width = 0, height = 0) {
  let select = document.getElementById('scan2ai-select');
  select.style.top = top + 'px';
  select.style.left = left + 'px';
  select.style.width = width + 'px';
  select.style.height = height + 'px';
}

function onMouseUp(e) {
  console.log('onMouseUp', selectingStart);
  if (!selectingStart) return;
  if (!width || !height) {
    selectingStart = false;
    return;
  }
  selectingStart = false;
  console.log('onMouseUp', selectingStart);
  crop();
  let select = document.getElementById('scan2ai-select');
  select.classList.add('hidden');
  let result = document.getElementById('scan2ai-result');
  result.classList.remove('hidden');
}

function getBodyHeight() {
  var body = document.body,
    html = document.documentElement;

  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function init() {
  let style = document.createElement('style');
  style.textContent = extCss();
  style.id = 'scan2ai-style';
  document.body.appendChild(style);
  let html = document.createElement('div');
  html.id = 'scan2ai-html';
  html.style.position = 'absolute';
  html.style.top = '0';
  html.style.left = '0';
  html.style.width = '100%';
  html.style.height = getBodyHeight() + 'px';
  html.style.zIndex = '2147483640';
  html.innerHTML = extHtml();
  document.body.appendChild(html);
  // let html2canvasScript = document.createElement('script');
  // html2canvasScript.src = 'https://html2canvas.hertzen.com/dist/html2canvas.min.js';
  // html2canvasScript.id = 'scan2ai-html2canvas-script';
  // document.body.appendChild(html2canvasScript);
  // let script = document.createElement('script');
  // script.textContent = js();
  // script.id = 'scan2ai-script';
  // document.body.appendChild(script);
}
init();
