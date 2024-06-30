// https://ai.google.dev/gemini-api/docs/api-overview
import { API } from '@/constants/ai';
import type { RequestContent } from '@/types/ai';

export default function useGemini() {
  const buildRequestMessage = (messages: Array<any>, previousMessages: Array<any> = []) => {
    const requestMessages = previousMessages;
    const content = messages.map((message) => {
      return buildRequestContent(message);
    });
    requestMessages.push({
      role: 'user',
      parts: content
    });
    return requestMessages;
  };
  const buildRequestContent = (content: string | RequestContent) => {
    if (typeof content === 'string') {
      return {
        text: content
      };
    }
    if (!content.type) return;
    switch (content.type) {
      case 'text':
        return {
          text: content.content
        };
      case 'image':
        return {
          inline_data: content.content
        };
      default:
        return content;
    }
  };
  const makeRequest = (attributes: any, payload: any) => {
    let uri = API.GEMINI.uri;
    uri = uri.replace('{{api_model}}', attributes.api_model);
    if (!attributes.use_latest) {
      uri = uri.replace('{{is_latest}}', '-latest');
    }
    uri = uri.replace('{{api_key}}', attributes.api_key);
    return fetch(uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: payload.messages
      })
    });
  };

  return {
    buildRequestMessage,
    makeRequest
  };
}
