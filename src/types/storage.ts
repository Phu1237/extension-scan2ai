export interface DefaultStorage extends Storage {
  captureMethod: string;
  selectingMethod: number;
  api: string;
  apiInfo: StorageAPIInfo;
  image: string;
  historyLimitSize: number;
  isFastForward: boolean;
  fastForwardCommand: string;
  extraContent: string[];
}

export interface Storage {
  captureMethod?: string;
  selectingMethod?: number;
  api?: string;
  apiInfo?: StorageAPIInfo;
  apiKey?: StorageAPIKey;
  image?: string;
  history?: StorageHistoryItem[];
  historyLimitSize?: number;
  isFastForward?: boolean;
  fastForwardCommand: string;
  extraContent?: Array<string>;
}

export interface StorageAPIInfo {
  [key: string]: StorageAPIInfoObject;
}

export interface StorageAPIInfoObject {
  apiModel: string;
  useLatest?: boolean;
  apiUrl?: string;
}

export interface StorageAPIKey {
  [key: string]: string;
}

export interface StorageHistoryItem {
  api: string;
  apiInfo: StorageAPIInfoObject;
  timestamp: number;
  session: StorageHistoryItemSession;
  success: boolean;
  result: string;
  rawResult: string;
}

export interface StorageHistoryItemSession {
  content: string;
  extraContent?: string[];
}
