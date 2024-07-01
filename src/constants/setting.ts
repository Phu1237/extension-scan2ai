import { API, GEMINI, OPENAI, MORE } from "@/constants/ai"
import { HELLO_WORLD_IMAGE } from '@/constants/sample'
import { CAPTURE_METHOD_VALUE, SELECTING_METHOD_VALUE } from "./common";
import type { DefaultStorage } from "@/types/storage";

export const CAPTURE_METHOD_LIST = [
  {
    name: 'Chrome API (visible content)',
    value: CAPTURE_METHOD_VALUE.CHROME_API_VISIBLE_CONTENT,
    hint: 'Just capture what visible on your current screen (Best compatible, Chrome API))'
  },
  {
    name: 'Chrome API (full page)',
    value: CAPTURE_METHOD_VALUE.CHROME_API_FULL_PAGE,
    hint: 'Capture the entire page, but may not work correctly as expected (Chrome API)',
    props: {
      disabled: true
    }
  },
  {
    name: 'HTML2Canvas',
    value: CAPTURE_METHOD_VALUE.HTML2CANVAS,
    hint: 'Capture the entire page, but may not work correctly with some websites',
    props: {
      disabled: true
    }
  },
];

export const SELECTING_METHOD_LIST = [
  {
    name: 'Drag and Drop',
    value: SELECTING_METHOD_VALUE.MOUSE_DRAG_AND_DROP,
  },
  {
    name: 'Click to Start and End',
    value: SELECTING_METHOD_VALUE.MOUSE_CLICK_TO_START_AND_END,
  },
];

export const HISTORY_LIMIT_SIZE_LIST = [
  4,
  8,
  12,
  16,
  20,
  24,
];

export const API_LIST = [
  API.GEMINI,
  API.OPENAI,
];

export const API_MODEL_LIST = {
  [API.GEMINI.value]: [
    GEMINI.GEMINI_PRO_VISION,
    GEMINI.GEMINI_1_5_FLASH,
    GEMINI.GEMINI_1_5_PRO,
    MORE.CUSTOM,
  ],
  [API.OPENAI.value]: [
    OPENAI.GPT_4O,
    OPENAI.GPT_4,
    OPENAI.GPT_4_TURBO,
    MORE.CUSTOM,
  ],
};

export const TOOLTIP = {
  CAPTURE_METHOD: 'Choose how extension will capture the image.',
  SELECTING_METHOD: 'Choose how to select the area.',
  HISTORY_LIMIT_SIZE: 'Limit the number of saved history records. -1 for unlimited',
  API: 'Choose the AI assistant to use.',
  API_MODEL: 'Choose the AI model to use.',
  API_MODEL_USE_LATEST: 'Using the latest update of the model or not.',
  API_MODEL_NAME: 'In case the AI model is not available in the list yet, please fill it out here.',
  API_KEY: 'X'
};

export const DEFAULT: DefaultStorage = {
  captureMethod: CAPTURE_METHOD_VALUE.CHROME_API_VISIBLE_CONTENT,
  selectingMethod: SELECTING_METHOD_VALUE.MOUSE_DRAG_AND_DROP,
  api: API.GEMINI.value,
  apiInfo: {
    [API.GEMINI.value]: {
      apiModel: GEMINI.GEMINI_1_5_FLASH.value,
      useLatest: true,
    },
    [API.OPENAI.value]: {
      apiModel: OPENAI.GPT_4O.value,
    },
  },
  image: HELLO_WORLD_IMAGE,
  historyLimitSize: 16,
}