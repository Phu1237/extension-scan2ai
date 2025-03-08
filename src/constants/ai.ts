export const API = {
  DEEPSEEK: {
    name: 'DeepSeek',
    value: 'deepseek',
    hint: {
      model:
        'DeepSeek Models Document: <a href="https://api-docs.deepseek.com/quick_start/pricing" target="_blank">here</a>',
      api_key:
        'Follow this instructions to get <a href="https://api-docs.deepseek.com/" target="_blank">xAI API key</a>.'
    },
    uri: 'https://api.deepseek.com/chat/completions'
  },
  GEMINI: {
    name: 'Gemini',
    value: 'gemini',
    hint: {
      model:
        'Gemini Models Document: <a href="https://ai.google.dev/gemini-api/docs/models/gemini" target="_blank">here</a>',
      api_key:
        'Follow this instructions to get <a href="https://ai.google.dev/gemini-api/docs/api-key" target="_blank">Gemini API key</a>.'
    },
    uri: 'https://generativelanguage.googleapis.com/v1beta/models/{{api_model}}{{use_latest}}:generateContent?key={{api_key}}'
  },
  OPENAI: {
    name: 'OpenAI',
    value: 'openai',
    hint: {
      model:
        'OpenAI Document: <a href="https://platform.openai.com/docs/models" target="_blank">here</a>',
      api_key:
        'Follow this instructions to get <a href="https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key" target="_blank">OpenAI API key</a>.'
    },
    uri: 'https://api.openai.com/v1/chat/completions'
  },
  XAI: {
    name: 'xAI',
    value: 'xai',
    hint: {
      model:
        'xAI Models Document: <a href="https://docs.x.ai/docs/models" target="_blank">here</a>',
      api_key:
        'Follow this instructions to get <a href="https://docs.x.ai/docs/introduction" target="_blank">xAI API key</a>.'
    },
    uri: 'https://api.x.ai/v1/chat/completions'
  }
};

// https://api-docs.deepseek.com/quick_start/pricing
// https://api-docs.deepseek.com/
export const DEEPSEEK = {
  DEEPSEEK_CHAT: {
    name: 'DeepSeek Chat (V3)',
    value: 'deepseek-chat',
    supports: ['text']
  },
  DEEPSEEK_REASONER: {
    name: 'DeepSeek Reasoner (R1)',
    value: 'deepseek-reasoner',
    supports: ['text']
  }
};

// https://ai.google.dev/gemini-api/docs/models/gemini
// https://platform.openai.com/api-keys
export const GEMINI = {
  GEMINI_1_5_FLASH: {
    name: 'Gemini 1.5 Flash',
    value: 'gemini-1.5-flash',
    supports: ['text', 'image']
  },
  GEMINI_1_5_FLASH_8B: {
    name: 'Gemini 1.5 Flash-8B',
    value: 'gemini-1.5-flash-8b',
    supports: ['text', 'image']
  },
  GEMINI_1_5_PRO: {
    name: 'Gemini 1.5 Pro',
    value: 'gemini-1.5-pro',
    supports: ['text', 'image']
  },
  GEMINI_2_0_FLASH: {
    name: 'Gemini 2.0 Flash',
    value: 'gemini-2.0-flash',
    supports: ['text', 'image']
  },
  GEMINI_2_0_FLASH_LITE: {
    name: 'Gemini 2.0 Flash-Lite',
    value: 'gemini-2.0-flash-lite',
    supports: ['text', 'image']
  },
  TEXT_EMBEDDING_004: {
    name: 'Text Embedding 004',
    value: 'text-embedding-004',
    supports: ['text']
  },
  GEMINI_EMBEDDING_EXP_03_07: {
    name: 'Gemini Embedding Exp 03-07',
    value: 'gemini-embedding-exp-03-07',
    supports: ['text']
  }
};

// https://platform.openai.com/docs/models
// https://aistudio.google.com/app/apikey
export const OPENAI = {
  GPT_3_5_TURBO: {
    name: 'GPT-3.5 Turbo',
    value: 'gpt-3.5-turbo',
    supports: ['text']
  },
  GPT_4: {
    name: 'GPT-4',
    value: 'gpt-4',
    supports: ['text', 'image']
  },
  GPT_4_TURBO: {
    name: 'GPT-4 Turbo',
    value: 'gpt-4-turbo',
    supports: ['text', 'image']
  },
  GPT_4O: {
    name: 'GPT-4o',
    value: 'gpt-4o',
    supports: ['text', 'image']
  },
  TEXT_DAVINCI_003: {
    name: 'Text Davinci 003',
    value: 'text-davinci-003',
    supports: ['text']
  },
  DALL_E_2: {
    name: 'DALL·E 2',
    value: 'dall-e-2',
    supports: ['text']
  },
  DALL_E_3: {
    name: 'DALL·E 3',
    value: 'dall-e-3',
    supports: ['text']
  },
  WHISPER_1: {
    name: 'Whisper',
    value: 'whisper-1',
    supports: ['audio']
  },
  TEXT_EMBEDDING_ADA_002: {
    name: 'Text Embedding Ada 002',
    value: 'text-embedding-ada-002',
    supports: ['text']
  },
  TEXT_EMBEDDING_3_SMALL: {
    name: 'Text Embedding 3 Small',
    value: 'text-embedding-3-small',
    supports: ['text']
  },
  TEXT_EMBEDDING_3_LARGE: {
    name: 'Text Embedding 3 Large',
    value: 'text-embedding-3-large',
    supports: ['text']
  }
};

// https://docs.x.ai/docs/models
// https://console.x.ai/team/default/api-keys
export const XAI = {
  GROK_BETA: {
    name: 'Grok Beta',
    value: 'grok-beta',
    supports: ['text']
  },
  GROK_VISION_BETA: {
    name: 'Grok Vision Beta',
    value: 'grok-vision-beta',
    supports: ['text', 'image']
  },
  GROK_2: {
    name: 'Grok 2',
    value: 'grok-2',
    supports: ['text']
  },
  GROK_2_1212: {
    name: 'Grok 2-1212',
    value: 'grok-2-vision-1212',
    supports: ['text']
  },
  GROK_2_VISION_1212: {
    name: 'Grok 2 Vision-1212',
    value: 'grok-2-vision-1212',
    supports: ['text', 'image']
  }
};

export const MORE = {
  CUSTOM: {
    name: 'Custom',
    value: ''
  }
};
