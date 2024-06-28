import type { Options } from '@/types/selecting';

let isSelecting: boolean = false;
let clientX: number | null = null;
let clientY: number | null = null;
let pageX: number | null = null;
let pageY: number | null = null;
let width: number | null = null;
let height: number | null = null;

let options: Options = {
}

function clearSelection() {
  clientX = null;
  clientY = null;
  pageX = null;
  pageY = null;
  width = null;
  height = null;
  if (!options.window) return;
  const selection = options.window.getSelection()!;
  // Remove selection to prevent selection bug
  if (selection.empty) {
    selection.empty();
  } else if (selection.removeAllRanges) {  // Firefox
    selection.removeAllRanges();
  }
}

function initEventListeners(): void {
  document.addEventListener('mousemove', onMouseUpdate, false);
  document.addEventListener('mouseenter', onMouseUpdate, false);
  document.addEventListener('mousedown', onMouseDown, false);
  document.addEventListener('mouseup', onMouseUp, false);
}
function destroyEventListeners(): void {
  document.removeEventListener('mousemove', onMouseUpdate);
  document.removeEventListener('mouseenter', onMouseUpdate);
  document.removeEventListener('mousedown', onMouseDown);
  document.removeEventListener('mouseup', onMouseUp);
}

function onMouseDown(event: MouseEvent): void {
  if (event.button !== 0) return;
  isSelecting = true;
  clientX = event.clientX;
  clientY = event.clientY;
  pageX = event.pageX;
  pageY = event.pageY;
  const select = document.getElementById('scan2ai-select')!;
  select.classList.remove('hidden');
  const result = document.getElementById('scan2ai-result')!;
  result.classList.add('hidden');
  setSelected(pageY, pageX);
  options.onSelectingStart?.();
}

function onMouseUpdate(event: MouseEvent): void {
  if (!isSelecting || !pageX || !pageY) return;
  const select = document.getElementById('scan2ai-select')!;
  const currentX = event.pageX;
  const currentY = event.pageY;
  // width = Math.max(currentX, x) - Math.min(currentX, x);
  // height = Math.max(currentY, y) - Math.min(currentY, y);
  width = currentX - pageX;
  height = currentY - pageY;
  // select.style.top = e.clientY + 'px';
  // select.style.left = e.clientX + 'px';
  select.style.width = width + 'px';
  select.style.height = height + 'px';
  options.onSelectingUpdate?.();
}

function setSelected(top = 0, left = 0, width = 0, height = 0) {
  const select = document.getElementById('scan2ai-select')!;
  select.style.top = top + 'px';
  select.style.left = left + 'px';
  select.style.width = width + 'px';
  select.style.height = height + 'px';
}

function onMouseUp() {
  if (!isSelecting) return;
  if (!width || !height) {
    isSelecting = false;
    return;
  }
  isSelecting = false;
  const select = document.getElementById('scan2ai-select')!;
  select.classList.add('hidden');
  const result = document.getElementById('scan2ai-result')!;
  result.classList.remove('hidden');

  options.onSelectingEnd?.({
    clientX,
    clientY,
    pageX,
    pageY,
    width,
    height,
  });
  clearSelection();
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
  destroyEventListeners();
}
