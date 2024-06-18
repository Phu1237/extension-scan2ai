// https://ai.google.dev/gemini-api/docs/api-overview

export default function useGemini() {
  const getResponse = (token: string) => {
    return fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + token,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: 'Explain how AI works'
                }
              ]
            }
          ]
        })
      }
    );
  }

  return {

  }
}
