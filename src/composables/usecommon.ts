import type { ImageObject } from "@/types/common";

export default function useCommon() {
  const base64ImageToImageObject = (image: string): ImageObject => {
    const regex = /^data:(image\/[a-z]+);base64,(.*)$/;
    const matches = image.match(regex) || [];
    return {
      mime_type: matches[1],
      data: matches[2]
    }
  }

  return {
    base64ImageToImageObject
  }
}
