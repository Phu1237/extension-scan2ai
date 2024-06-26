let selectingStart = false;

document.addEventListener('mousemove', onMouseUpdate, false);
document.addEventListener('mouseenter', onMouseUpdate, false);
document.addEventListener('mousedown', onMouseDown, false);
document.addEventListener('mouseup', onMouseUp, false);

function onMouseUpdate(e) {
  // if (selectingMode === 1) return;
  if (!selectingStart) return;
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

export function init() {
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
}
