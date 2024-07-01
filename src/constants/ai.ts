export const API = {
  GEMINI: {
    name: 'Gemini',
    value: 'gemini',
    hint: {
      model: 'Gemini Models Document: <a href="https://ai.google.dev/gemini-api/docs/models/gemini" target="_blank">here</a>',
      api_key: 'Get Gemini API key <a href="https://platform.openai.com/api-keys" target="_blank">here</a>',
    },
    uri: 'https://generativelanguage.googleapis.com/v1beta/models/{{api_model}}{{use_latest}}:generateContent?key={{api_key}}',
  },
  OPENAI: {
    name: 'OpenAI',
    value: 'openai',
    hint: {
      model: 'OpenAI Document: <a href="https://platform.openai.com/docs/models" target="_blank">here</a>',
      api_key: 'Get OpenAI API key <a href="https://aistudio.google.com/app/apikey" target="_blank">here</a>',
    },
    uri: 'https://api.openai.com/v1/chat/completions'
  },
}

// https://ai.google.dev/gemini-api/docs/models/gemini
// https://platform.openai.com/api-keys
export const GEMINI = {
  TEXT_EMBEDDING: {
    name: 'Text Embedding',
    value: 'text-embedding-004'
  },
  GEMINI_1_0_PRO: {
    name: 'Gemini 1.0 Pro',
    value: 'gemini-1.0-pro'
  },
  GEMINI_PRO_VISION: {
    name: 'Gemini Pro Vision',
    value: 'gemini-pro-vision'
  },
  GEMINI_1_5_FLASH: {
    name: 'Gemini 1.5 Flash',
    value: 'gemini-1.5-flash'
  },
  GEMINI_1_5_PRO: {
    name: 'Gemini 1.5 Pro',
    value: 'gemini-1.5-pro'
  },
}

// https://platform.openai.com/docs/models
// https://aistudio.google.com/app/apikey
export const OPENAI = {
  GPT_3_5_TURBO: {
    name: 'GPT-3.5 Turbo',
    value: 'gpt-3.5-turbo'
  },
  GPT_4: {
    name: 'GPT-4',
    value: 'gpt-4'
  },
  GPT_4O: {
    name: 'GPT-4o',
    value: 'gpt-4o'
  },
  GPT_4_TURBO: {
    name: 'GPT-4 Turbo',
    value: 'gpt-4-turbo'
  },
  DALL_E_3: {
    name: 'DALL-E 3',
    value: 'dall-e-3'
  },
  TTS_SPEED: {
    name: 'TTS Speed',
    value: 'tts-1'
  },
  TTS_QUALITY: {
    name: 'TTS Quality',
    value: 'tts-1-hd'
  },
  WHISPER_1: {
    name: 'Whisper 1',
    value: 'whisper-1'
  },
  TEXT_EMBEDDING_3_SMALL: {
    name: 'Text Embedding 3 Small',
    value: 'text-embedding-3-small'
  },
  TEXT_EMBEDDING_3_LARGE: {
    name: 'Text Embedding 3 Large',
    value: 'text-embedding-3-large'
  },
  TEXT_MODERATION_STABLE: {
    name: 'Text Moderation Stable',
    value: 'text-moderation-stable'
  },
  TEXT_MODERATION_LATEST: {
    name: 'Text Moderation Latest',
    value: 'text-moderation-latest'
  }
}

export const MORE = {
  CUSTOM: {
    name: 'Custom',
    value: 'custom'
  }
}
