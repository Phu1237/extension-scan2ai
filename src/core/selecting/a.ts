interface Options {
  document?: Document,
  onSelectingDone?: () => void;
}

let options: Options = {
}

export function init(overrideOptions: Options): void {
  // chèn html, js, event listeners
  options = {
    ...options,
    ...overrideOptions || {}
  };
  initEventListeners();
}

export function destroy(): void {
}

function initEventListeners(): void {
  // options.document?.addEventListener('mousedown', onMouseDown, false);
  options.document?.addEventListener('mousedown', () => console.log(1), false);
  options.document?.addEventListener('mousedown', () => console.log(2), false);
  options.document?.addEventListener('mousedown', onMouseDown, false);
  options.document?.addEventListener('mouseup', onMouseUp, false);
}
function onMouseDown(event: MouseEvent): void {
  console.log(event);
  options.onSelectingDone?.();

}

function onMouseUp(): void {
  options.document?.removeEventListener('mousedown', onMouseDown);
}
