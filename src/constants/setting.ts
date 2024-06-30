import { API, GEMINI, OPENAI, MORE } from "@/constants/ai"
import { HELLO_WORLD_IMAGE } from '@/constants/sample'
import { CAPTURE_METHOD_VALUE, SELECTING_METHOD_VALUE } from "./common";
import type { DefaultStorage } from "@/types/storage";

export const CAPTURE_METHOD_LIST = [
  {
    name: 'Chrome API (visible content)',
    value: CAPTURE_METHOD_VALUE.CHROME_API_VISIBLE_CONTENT
  },
  {
    name: 'Chrome API (full page)',
    value: CAPTURE_METHOD_VALUE.CHROME_API_FULL_PAGE
  },
  {
    name: 'HTML2Canvas',
    value: CAPTURE_METHOD_VALUE.HTML2CANVAS
  },
];

export const SELECTING_METHOD_LIST = {
  MOUSE_DRAG_AND_DROP: {
    name: 'Drag and Drop',
    value: SELECTING_METHOD_VALUE.MOUSE_DRAG_AND_DROP,
  },
  MOUSE_CLICK_TO_START_AND_END: {
    name: 'Click to Start and End',
    value: SELECTING_METHOD_VALUE.MOUSE_CLICK_TO_START_AND_END,
  },
}

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

export const DEFAULT: DefaultStorage = {
  captureMethod: CAPTURE_METHOD_VALUE.CHROME_API_VISIBLE_CONTENT,
  selectingMethod: SELECTING_METHOD_VALUE.MOUSE_DRAG_AND_DROP,
  api: API.GEMINI.value,
  apiInfo: {
    [API.GEMINI.value]: {
      apiModel: GEMINI.GEMINI_1_5_FLASH.value,
    },
    [API.OPENAI.value]: {
      apiModel: OPENAI.GPT_4O.value,
    },
  },
  image: HELLO_WORLD_IMAGE
}
