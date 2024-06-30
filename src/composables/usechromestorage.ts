import { CHROME_STORAGE } from "@/constants/common";
import type { Storage } from "@/types/storage";

export default function useChromeStorage() {
  const fetchChromeStorage = () => {
    return Promise.all([getChromeStorage(CHROME_STORAGE.LOCAL), getChromeStorage(CHROME_STORAGE.SYNC)]);
  }
  const getChromeStorage = (storage: string, keys: Array<string> | null = null): Promise<Storage> => {
    return new Promise((resolve, reject) => {
      switch (storage) {
        case 'local':
          chrome.storage.local.get(keys, (result) => {
            resolve(result as Storage);
          });
          break;
        case 'sync':
          chrome.storage.sync.get(keys, (result) => {
            resolve(result as Storage);
          });
          break;
        default:
          reject('Unsupported storage type');
      }
    });
  }
  const setChromeStorage = (storage: string, items: Storage) => {
    switch (storage) {
      case 'local':
        return chrome.storage.local.set(items);
      case 'sync':
        return chrome.storage.sync.set(items);
      default:
        throw new Error('Unsupported storage type');
    }
  }
  const clearChromeStorage = (storage: string) => {
    switch (storage) {
      case 'local':
        return chrome.storage.local.clear();
      case 'sync':
        return chrome.storage.sync.clear();
      default:
        throw new Error('Unsupported storage type');
    }
  }

  return {
    fetchChromeStorage,
    getChromeStorage,
    setChromeStorage,
    clearChromeStorage,
  }
}
