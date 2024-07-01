import { API } from '@/constants/ai';
import type { RequestContent } from '@/types/ai';

export default function useOpenAI() {
  const buildRequestMessage = (messages: Array<any>, previousMessages: Array<any> = []) => {
    const requestMessages = previousMessages;
    const content = messages.map((message) => {
      return buildRequestContent(message);
    });
    requestMessages.push({
      role: 'user',
      content: content
    });
    return requestMessages;
  };
  const buildRequestContent = (content: string | RequestContent) => {
    if (typeof content === 'string') {
      return {
        type: 'text',
        text: content
      };
    }
    if (!content.type) return;
    switch (content.type) {
      case 'image':
        return {
          type: 'image_url',
          image_url: {
            url: content.content
          }
        };
      default:
        return content;
    }
  };
  const makeRequest = (attributes: any, payload: any): Promise<Response> => {
    return fetch(`${API.OPENAI.uri}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${attributes.api_key}`
      },
      body: JSON.stringify({
        model: attributes.api_model,
        messages: payload.messages,
        temperature: 1,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      })
    });
  };

  return {
    buildRequestMessage,
    makeRequest
  };
}
