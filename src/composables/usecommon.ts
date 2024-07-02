import type { ImageObject } from '@/types/common';
import { CHROME_STORAGE } from '@/constants/common';

export default function useCommon() {
  const isDev = import.meta.env.MODE === 'development';
  const log = (...args: any) => {
    if (isDev) {
      if (args.length > 2) {
        console.group(args[0]);
        for (let i = 1; i < args.length; i++) {
          console.log(args[i]);
        }
        console.groupEnd();
        return;
      }
      console.log(...args);
      return;
    }
  };
  const getStorageUsage = async (storage: string) => {
    let used = 0;
    let quota = 0;
    let usage = 0;
    if (storage === CHROME_STORAGE.LOCAL) {
      used = await chrome.storage.local.getBytesInUse();
      quota = chrome.storage.local.QUOTA_BYTES;
    } else if (storage === CHROME_STORAGE.SYNC) {
      used = await chrome.storage.sync.getBytesInUse();
      quota = chrome.storage.sync.QUOTA_BYTES;
    }
    usage = used / quota;

    return {
      used,
      quota,
      usage
    };
  };
  const base64ImageToImageObject = (image: string): ImageObject => {
    const regex = /^data:(image\/[a-z]+);base64,(.*)$/;
    const matches = image.match(regex) || [];
    return {
      mime_type: matches[1],
      data: matches[2]
    };
  };

  return {
    isDev,
    log,
    getStorageUsage,
    base64ImageToImageObject
  };
}
