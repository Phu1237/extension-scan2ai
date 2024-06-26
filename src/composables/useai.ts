import { GEMINI, OPENAI, MORE } from "@/constants/aimodel"

export default function useAI() {
  const availableList = [
    GEMINI.GEMINI_PRO_VISION,
    GEMINI.GEMINI_1_5_PRO,
    OPENAI.GPT_4O,
    OPENAI.GPT_4,
    OPENAI.GPT_4_TURBO,
    MORE.CUSTOM,
  ];

  return {
    availableList,
  }
}
