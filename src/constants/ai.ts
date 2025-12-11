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
    uri: 'https://generativelanguage.googleapis.com/v1beta/models/{{api_model}}:generateContent?key={{api_key}}'
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
  },
  OPENAI_COMPATIBLE: {
    name: 'OpenAI Compatible',
    value: 'openai-compatible',
    hint: {
      model: 'OpenAI compatible model.',
      api_key: 'API Key for your compatible provider.'
    },
    uri: ''
  }
};

// https://api-docs.deepseek.com/quick_start/pricing
// https://api-docs.deepseek.com/
export const DEEPSEEK = {
  DEEPSEEK_CHAT: {
    name: 'DeepSeek Chat',
    value: 'deepseek-chat',
    supports: ['text']
  },
  DEEPSEEK_REASONER: {
    name: 'DeepSeek Reasoner',
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
  GEMINI_2_5_FLASH: {
    name: 'Gemini 2.5 Flash',
    value: 'gemini-2.5-flash',
    supports: ['text', 'image']
  },
  GEMINI_2_5_FLASH_LITE: {
    name: 'Gemini 2.5 Flash-Lite',
    value: 'gemini-2.5-flash-lite',
    supports: ['text', 'image']
  },
  GEMINI_2_5_PRO: {
    name: 'Gemini 2.5 Pro',
    value: 'gemini-2.5-pro',
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
// https://platform.openai.com/api-keys
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
  GPT_4O_MINI: {
    name: 'GPT-4o Mini',
    value: 'gpt-4o-mini',
    supports: ['text', 'image']
  },
  O1_PREVIEW: {
    name: 'o1-preview',
    value: 'o1-preview',
    supports: ['text']
  },
  O1_MINI: {
    name: 'o1-mini',
    value: 'o1-mini',
    supports: ['text']
  },
  GPT_4_1: {
    name: 'GPT-4.1',
    value: 'gpt-4.1',
    supports: ['text', 'image']
  },
  GPT_5: {
    name: 'GPT-5',
    value: 'gpt-5',
    supports: ['text', 'image']
  },
  GPT_5_MINI: {
    name: 'GPT-5 Mini',
    value: 'gpt-5-mini',
    supports: ['text', 'image']
  },
  GPT_5_NANO: {
    name: 'GPT-5 Nano',
    value: 'gpt-5-nano',
    supports: ['text', 'image']
  },
  GPT_5_PRO: {
    name: 'GPT-5 Pro',
    value: 'gpt-5-pro',
    supports: ['text', 'image']
  },
  GPT_5_1: {
    name: 'GPT-5.1',
    value: 'gpt-5.1',
    supports: ['text', 'image']
  },
  DALL_E_3: {
    name: 'DALL·E 3',
    value: 'dall-e-3',
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
  GROK_2_VISION_1212: {
    name: 'Grok 2 Vision-1212',
    value: 'grok-2-vision-1212',
    supports: ['text', 'image']
  },
  GROK_4_FAST_REASONING: {
    name: 'Grok 4 Fast Reasoning',
    value: 'grok-4-fast-reasoning',
    supports: ['text', 'image']
  },
  GROK_4_FAST_NON_REASONING: {
    name: 'Grok 4 Fast Non-Reasoning',
    value: 'grok-4-fast-non-reasoning',
    supports: ['text', 'image']
  },
  GROK_4_1_FAST_REASONING: {
    name: 'Grok 4.1 Fast Reasoning',
    value: 'grok-4-1-fast-reasoning',
    supports: ['text', 'image']
  },
  GROK_4_1_FAST_NON_REASONING: {
    name: 'Grok 4.1 Fast Non-Reasoning',
    value: 'grok-4-1-fast-non-reasoning',
    supports: ['text', 'image']
  },
  GROK_CODE_FAST_1: {
    name: 'Grok Code Fast 1',
    value: 'grok-code-fast-1',
    supports: ['text', 'image']
  }
};

export const MORE = {
  CUSTOM: {
    name: 'Custom',
    value: ''
  }
};
