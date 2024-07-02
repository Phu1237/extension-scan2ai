export interface DefaultStorage extends Storage {
  captureMethod: string;
  selectingMethod: number;
  api: string;
  apiInfo: StorageAPIInfo;
  image: string;
  historyLimitSize: number;
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
  extraContent?: Array<string>;
}

export interface StorageAPIInfo {
  [key: string]: StorageAPIInfoObject;
}

export interface StorageAPIInfoObject {
  apiModel: string;
  useLatest?: boolean;
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
