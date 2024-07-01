import type { Storage, StorageHistoryItem } from '@/types/storage';
import { CHROME_STORAGE } from '@/constants/common';
import { DEFAULT } from '@/constants/setting';
import useCommon from './usecommon';

export default function useChromeStorage() {
  const { log } = useCommon();

  const fetchChromeStorage = () => {
    return Promise.all([
      getChromeStorage(CHROME_STORAGE.LOCAL),
      getChromeStorage(CHROME_STORAGE.SYNC)
    ]);
  };
  const getChromeStorage = (
    storage: string,
    keys: Array<string> | null = null
  ): Promise<Storage> => {
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
  };
  const setChromeStorage = (storage: string, items: Storage) => {
    switch (storage) {
      case 'local':
        return chrome.storage.local.set(items);
      case 'sync':
        return chrome.storage.sync.set(items);
      default:
        throw new Error('Unsupported storage type');
    }
  };
  const clearChromeStorage = async (storage: string) => {
    switch (storage) {
      case 'local':
        return await chrome.storage.local.clear();
      case 'sync':
        return await chrome.storage.sync.clear();
      default:
        throw new Error('Unsupported storage type');
    }
  };
  const pushChromeStorageHistory = async (item: StorageHistoryItem) => {
    const local = await getChromeStorage(CHROME_STORAGE.LOCAL, ['history']);
    const sync = await getChromeStorage(CHROME_STORAGE.SYNC, ['historyLimitSize']);
    const history = local.history ?? [];
    const historyLimitSize = sync.historyLimitSize ?? DEFAULT.historyLimitSize;
    history.unshift(item);
    if (historyLimitSize !== -1) {
      history.splice(sync.historyLimitSize ?? DEFAULT.historyLimitSize);
      log('pushChromeStorageHistory cleaning old histories. Limit: ' + historyLimitSize);
    }
    setChromeStorage(CHROME_STORAGE.LOCAL, {
      history: history
    });
  };
  const clearChromeStorageHistory = async () => {
    return await setChromeStorage(CHROME_STORAGE.LOCAL, {
      history: []
    });
  };
  const pushChromeStorageExtraContent = async (content: string) => {
    const sync = await getChromeStorage(CHROME_STORAGE.SYNC, ['extraContent']);
    const extraContent = sync.extraContent ?? [];
    extraContent.push(content);
    return setChromeStorage(CHROME_STORAGE.SYNC, {
      extraContent: extraContent
    });
  };
  const removeChromeStorageExtraContent = async (content: string, removeIndex: number = -1) => {
    const sync = await getChromeStorage(CHROME_STORAGE.SYNC, ['extraContent']);
    const extraContent = sync.extraContent ?? [];
    const rIndex = removeIndex > -1 ? removeIndex : extraContent.indexOf(content);
    if (rIndex > -1) {
      console.log(rIndex);
      extraContent.splice(rIndex, 1);
    }
    console.log(extraContent);

    return setChromeStorage(CHROME_STORAGE.SYNC, {
      extraContent: extraContent
    });
  };
  const clearChromeStorageExtraContent = async () => {
    return await setChromeStorage(CHROME_STORAGE.LOCAL, {
      extraContent: []
    });
  };

  return {
    fetchChromeStorage,
    getChromeStorage,
    setChromeStorage,
    clearChromeStorage,
    pushChromeStorageHistory,
    clearChromeStorageHistory,
    pushChromeStorageExtraContent,
    removeChromeStorageExtraContent,
    clearChromeStorageExtraContent
  };
}
