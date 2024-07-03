import type { Options } from '@/types/selecting';

export default function () {
  let isSelecting: boolean = false;
  let clientX: number | null = null;
  let clientY: number | null = null;
  let pageX: number | null = null;
  let pageY: number | null = null;
  let width: number | null = null;
  let height: number | null = null;

  let options: Options = {};

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
    } else if (selection.removeAllRanges) {
      // Firefox
      selection.removeAllRanges();
    }
  }

  function initEventListeners(): void {
    document.getElementById('scan2ai-select')?.addEventListener('mousemove', onMouseUpdate, false);
    document.getElementById('scan2ai-select')?.addEventListener('mouseenter', onMouseUpdate, false);
    document.getElementById('scan2ai-select')?.addEventListener('mousedown', onMouseDown, false);
    document.getElementById('scan2ai-select')?.addEventListener('mouseup', onMouseUp, false);
  }
  function destroyEventListeners(): void {
    document.getElementById('scan2ai-select')?.removeEventListener('mousemove', onMouseUpdate);
    document.getElementById('scan2ai-select')?.removeEventListener('mouseenter', onMouseUpdate);
    document.getElementById('scan2ai-select')?.removeEventListener('mousedown', onMouseDown);
    document.getElementById('scan2ai-select')?.removeEventListener('mouseup', onMouseUp);
  }

  function onMouseDown(event: MouseEvent): void {
    if (event.button !== 0) return;
    isSelecting = true;
    clientX = event.clientX;
    clientY = event.clientY;
    pageX = event.pageX;
    pageY = event.pageY;
    const select = document.getElementById('scan2ai-select-area')!;
    select.classList.remove('hidden');
    const result = document.getElementById('scan2ai-result')!;
    result.classList.add('hidden');
    setSelected(pageY, pageX);
    options.onSelectingStart?.();
  }

  function onMouseUpdate(event: MouseEvent): void {
    if (!isSelecting || !pageX || !pageY) return;
    const select = document.getElementById('scan2ai-select-area')!;
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
    const select = document.getElementById('scan2ai-select-area')!;
    select.style.top = top + 'px';
    select.style.left = left + 'px';
    select.style.width = width + 'px';
    select.style.height = height + 'px';
  }

  function onMouseUp() {
    if (!isSelecting) return;
    isSelecting = false;

    options.onSelectingEnd?.({
      clientX: clientX ?? 0,
      clientY: clientY ?? 0,
      pageX: pageX ?? 0,
      pageY: pageY ?? 0,
      width: width ?? 0,
      height: height ?? 0
    });
    clearSelection();
  }

  function init(overrideOptions: Options): void {
    // chèn html, js, event listeners
    options = {
      ...options,
      ...(overrideOptions || {})
    };
    initEventListeners();
  }

  function destroy(): void {
    destroyEventListeners();
  }

  return {
    init,
    destroy
  };
}
