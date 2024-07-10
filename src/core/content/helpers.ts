import type { ChromeMessageRequest } from '@/types/chromemessage';

export async function sendChromeMessage(message: ChromeMessageRequest) {
  return await chrome.runtime.sendMessage(message);
}

export function crop(img: string, x: number, y: number, width: number, height: number) {
  const shadowEl = document.getElementById('scan2ai')!;
  const shadow = shadowEl.shadowRoot!;
  let canvas: HTMLCanvasElement = shadow.getElementById('scan2ai-canvas') as HTMLCanvasElement;
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

export function hideOverflow(hidden: boolean) {
  if (hidden) {
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return;
  }
  document.documentElement.style.removeProperty('overflow');
  document.body.style.removeProperty('overflow');
}

export async function getClipboardContents(
  callback: (render: string | ArrayBuffer | null) => void
) {
  try {
    const clipboardItems = await navigator.clipboard.read();

    for (const clipboardItem of clipboardItems) {
      for (const type of clipboardItem.types) {
        const blob = await clipboardItem.getType(type);
        // we can now use blob here
        if (type.startsWith('image/')) {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            callback(reader.result);
          };
        }
      }
    }
  } catch (err) {
    console.error(err);
  }
}
