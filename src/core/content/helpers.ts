import type { ChromeMessageRequest } from '@/types/chromemessage';

export async function sendChromeMessage(message: ChromeMessageRequest) {
  return await chrome.runtime.sendMessage(message);
}

export function crop(img: string, x: number, y: number, width: number, height: number) {
  let canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement;
  canvas = canvas as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');
  if (!canvas || !ctx) return;
  const image = new Image();
  image.src = img;
  image.onload = () => {
    canvas.setAttribute('width', String(width));
    canvas.setAttribute('height', String(height));
    ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

    sendChromeMessage({
      action: 'crop',
      value: canvas.toDataURL()
    });
  };
}

export function selected(atrributes: any, x: number, y: number, width: number, height: number) {
  sendChromeMessage({
    action: 'selected',
    attributes: atrributes,
    value: {
      x,
      y,
      width,
      height
    }
  });
}

export function getBodyHeight() {
  const body = document.body,
    html = document.documentElement;

  return Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );
}
