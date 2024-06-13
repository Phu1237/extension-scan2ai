console.log(123);

function extCss() {
  return `
    canvas {
      width: auto;
      height: auto;
    }

    .hidden {
      display: none;
    }

    #backdrop {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: #00000050;
    }
  `;
}
function extHtml() {
  return `
    <div id="backdrop"></div>
    <div id="select" class="hidden"></div>
    <img id="img" class="hidden">
    <div>
      <canvas id="canvas"></canvas>
    </div>
    <div>
      Current mouse position: <span id="x"></span> x <span id="y"></span><br />
      Current selected: <span id="width"></span> x <span id="height"></span>
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
let selectingStart = false;
var x = null;
var y = null;
var width = null;
var height = null;
function crop() {
  console.log('crop');
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  let img = document.getElementById('img');
  canvas.width = width;
  canvas.height = height;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.drawImage(img, x, y, width, height, 0, 0, width, height);
  // document.getElementById('img').src = canvas.toDataURL();
}

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);

function onMouseUpdate(e) {
  let select = document.getElementById('select');
  if (!selectingStart) return;
  let currentX = e.pageX;
  let currentY = e.pageY;
  width = Math.max(currentX, x) - Math.min(currentX, x);
  height = Math.max(currentY, y) - Math.min(currentY, y);
  select.style.top = e.clientY + 'px';
  select.style.left = e.clientX + 'px';
  select.style.width = width + 'px';
  select.style.height = height + 'px';
}

function onMouseDown(e) {
  console.log('onMouseDown', selectingStart);
  if (e.which !== 1) return;
  selectingStart = true;
  x = e.pageX;
  y = e.pageY;
  document.getElementById('x').innerHTML = x;
  document.getElementById('y').innerHTML = y;
  document.getElementById('backdrop').classList.remove('hidden');
  let select = document.getElementById('select');
  select.classList.remove('hidden');
  select.style.position = 'absolute';
  select.style.left = x + 'px';
  select.style.top = y + 'px';
  select.style.width = 0 + 'px';
  select.style.height = 0 + 'px';
  select.style.zIndex = 1;
  select.style.backgroundColor = '#00000010';
}

function onMouseUp(e) {
  console.log('onMouseUp', selectingStart);
  if (selectingStart === false) return;
  selectingStart = false;
  crop();
  let select = document.getElementById('select');
  select.classList.add('hidden');
  // let endX = e.pageX;
  // let endY = e.pageY;
  // console.log(x, y);
  // console.log(endX, endY);
  // let width = endX - x;
  // let height = endY - y;
  document.getElementById('width').innerHTML = width;
  document.getElementById('height').innerHTML = height;
}

function getMouseX() {
  return x;
}

function getMouseY() {
  return y;
}

function init() {
  let style = document.createElement('style');
  style.textContent = extCss();
  style.id = 'scan2ai-style';
  document.body.appendChild(style);
  let html = document.createElement('div');
  html.id = 'scan2ai-html';
  html.style.position = 'fixed';
  html.style.top = '0';
  html.style.left = '0';
  html.style.width = '100%';
  html.style.height = '100%';
  html.style.zIndex = '9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999';
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
