export interface Options {
  window?: Window;
  document?: Document;
  onSelectingStart?: Function;
  onSelectingUpdate?: Function;
  onSelectingEnd?: (result: onSelectingResult) => void;
}

export interface onSelectingResult {
  clientX: number;
  clientY: number;
  pageX: number;
  pageY: number;
  width: number;
  height: number;
}
