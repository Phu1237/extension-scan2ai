import useGemini from './ai/usegemini';
import useOpenAI from './ai/useopenai';

export default function useAI() {
  return {
    useGemini,
    useOpenAI,
  }
}
