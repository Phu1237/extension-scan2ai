import type { Storage } from '@/types/storage';
import { HELLO_WORLD_IMAGE } from '@/constants/sample';
import useCommon from './usecommon';
import useChromeStorage from './usechromestorage';
import useGemini from './ai/usegemini';
import useOpenAI from './ai/useopenai';
import { API } from '@/constants/ai';

interface ChromeStorages {
  local: Storage;
  sync: Storage;
}

export default function useAI() {
  const getAIName = (name: string) => {
    if (name === 'deepseek') {
      return 'DeepSeek';
    } else if (name === 'gemini') {
      return 'Gemini';
    } else if (name === 'openai') {
      return 'OpenAI';
    } else if (name === 'xai') {
      return 'xAI';
    } else {
      throw new Error(`Unsupported AI name: ${name}`);
    }
  };
  const maskAPIKey = (apiKey: string) => {
    const length = apiKey.length;
    if (length <= 2) return '*'.repeat(length);
    const visibleChars = Math.min(4, Math.round(length / 3));
    const maskedChars = length - visibleChars * 2; // Calculate number of masked characters
    const maskedPart = '*'.repeat(maskedChars);
    return apiKey.substring(0, visibleChars) + maskedPart + apiKey.substring(length - visibleChars);
  };
  const sendRequest = (storages: ChromeStorages, action: string): Promise<Response> => {
    return new Promise((resolve, reject) => {
      const local = storages.local;
      const sync = storages.sync;
      if (
        !sync.api ||
        !local.apiKey ||
        !local.apiKey[sync.api] ||
        !sync.apiInfo ||
        !sync.apiInfo[sync.api]
      ) {
        reject('Missing required API settings');
        return;
      }
      const api = sync.api;
      const apiKey = local.apiKey[api];
      const image = local.image ?? HELLO_WORLD_IMAGE;
      const apiModel = sync.apiInfo[api].apiModel;
      const apiModelUseLatest = sync.apiInfo[api].useLatest ?? true;
      if (api === 'gemini') {
        const { base64ImageToImageObject } = useCommon();
        const { useGemini } = useAI();
        const { buildRequestMessage, sendRequest } = useGemini();
        const imageObject = base64ImageToImageObject(image);
        const messages = buildRequestMessage([
          action,
          {
            type: 'image',
            content: imageObject
          }
        ]);
        sendRequest(
          {
            api_model: apiModel,
            use_latest: apiModelUseLatest,
            api_key: apiKey
          },
          {
            messages: messages
          }
        ).then((response) => resolve(response));
        return;
      } else if (api === 'openai' || api === 'deepseek' || api === 'xai') {
        let endpoint = API.OPENAI.uri;
        switch (api) {
          case 'deepseek':
            endpoint = API.DEEPSEEK.uri;
            break;
          case 'xai':
            endpoint = API.XAI.uri;
        }
        const { useOpenAI } = useAI();
        const { buildRequestMessage, sendRequest } = useOpenAI(endpoint);
        const messages = buildRequestMessage([
          action,
          {
            type: 'image',
            content: image
          }
        ]);
        sendRequest(
          {
            api_model: apiModel,
            api_key: apiKey.trim()
          },
          {
            messages: messages
          }
        ).then((response) => resolve(response));
        return;
      }
      reject('Unsupported Assistant API or unexpected error');
    });
  };
  const handleResponse = async (storages: ChromeStorages, response: Response) => {
    const local = storages.local;
    const sync = storages.sync;
    if (
      !sync.api ||
      !local.apiKey ||
      !local.apiKey[sync.api] ||
      !sync.apiInfo ||
      !sync.apiInfo[sync.api]
    ) {
      return {
        result: 'Missing required API settings',
        success: false
      };
    }
    const api = sync.api;
    const image = local.image ?? HELLO_WORLD_IMAGE;
    const apiModel = sync.apiInfo[api].apiModel;
    const apiModelUseLatest = sync.apiInfo[api].useLatest ?? true;
    const { pushChromeStorageHistory } = useChromeStorage();
    let jsonResult: any;
    let result: string = '';
    if (api === 'gemini') {
      jsonResult = await response.json();

      result =
        jsonResult.candidates?.[0]?.content?.parts?.[0]?.text ??
        jsonResult.error?.message ??
        jsonResult.candidates?.[0]?.finishReason ??
        'Unexpected error. Check raw result.';
    } else if (api === 'openai' || api === 'deepseek' || api === 'xai') {
      jsonResult = await response.json();
      result =
        jsonResult.choices?.[0]?.message.content ??
        jsonResult.error?.message ??
        'Unexpected error. Check raw result.';
    }
    const newHistory = {
      api: api,
      apiInfo: {
        apiModel: apiModel,
        useLatest: apiModelUseLatest
      },
      session: {
        content: image,
        extraContent: ['image to text']
      },
      timestamp: Date.now(),
      success: response.status === 200,
      result: result,
      rawResult: JSON.stringify(jsonResult)
    };
    pushChromeStorageHistory(newHistory);
    return {
      result: result,
      success: response.status === 200
    };
  };

  return {
    useGemini,
    useOpenAI,
    getAIName,
    maskAPIKey,
    sendRequest,
    handleResponse
  };
}
