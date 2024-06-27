import { init } from './selecting/a';

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

function crop(x: number, y: number, width: number, height: number) {
  console.log('crop', x, y, width, height);
  let canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  canvas = canvas as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  const img = document.getElementById('img') as CanvasImageSource;
  if (!canvas || !ctx || !img) return;
  canvas.setAttribute('width', String(width));
  canvas.setAttribute('height', String(height));
  // canvas.style.width = width + 'px';
  // canvas.style.height = height + 'px';
  ctx.drawImage(img, x, y, width, height, 0, 0, width, height);

  chrome.runtime.sendMessage({
    action: 'capturedImage',
    value: canvas.toDataURL()
  });
}

function getBodyHeight() {
  const body = document.body,
    html = document.documentElement;

  return Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
}

function initExtension() {
  const style = document.createElement('style');
  style.textContent = extCss();
  style.id = 'scan2ai-style';
  document.body.appendChild(style);
  const html = document.createElement('div');
  html.id = 'scan2ai-html';
  html.style.position = 'absolute';
  html.style.top = '0';
  html.style.left = '0';
  html.style.width = '100%';
  html.style.height = getBodyHeight() + 'px';
  html.style.zIndex = '9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999';
  html.innerHTML = extHtml();
  document.body.appendChild(html);
}
initExtension();

const fullpage = false;

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
    crop(x, y, width, height);
    if (fullpage) {
      //
    } else {
      document.body.style.removeProperty('overflow');
    }
  }
});
