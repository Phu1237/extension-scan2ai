export const CHROME_STORAGE_KEY = {
  LOCAL: {},
  SYNC: {
    FAST_FORWARD: 'fastForward',
    FAST_FORWARD_COMMAND: 'fastForwardCommand'
  }
};

export const CHROME_MESSAGE_BACKGROUND_ACTION = {
  CLIPBOARD_SCAN: 'clipboard-scan',
  FAST_FORWARD: 'fast-forward',
  HISTORY: 'history',
  INSTRUCTION: 'instruction',
  TURN_OFF: 'turn-off',
  SCAN: 'scan',
  SETTING: 'setting'
};

export const CHROME_MESSAGE_CONTENT_ACTION = {
  REINIT: 'reinit',
  DESTROY: 'destroy',
  SHOW_RESULT: 'show-result'
};

export const DEFAULT_EXTRA_CONTENTS = ['Image to text', 'Describe this image'];
