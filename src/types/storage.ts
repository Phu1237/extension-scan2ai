export interface DefaultStorage extends Storage {
  captureMethod: string;
  selectingMethod: number;
  api: string;
  apiInfo: StorageAPIInfo;
  image: string;
}

export interface Storage {
  captureMethod?: string;
  selectingMethod?: number;
  api?: string;
  apiInfo?: StorageAPIInfo;
  apiKey?: StorageAPIKey;
  image?: string;
}

export interface StorageAPIInfo {
  [key: string]: StorageAPIInfoObject
}

export interface StorageAPIInfoObject {
  apiModel: string;
}

export interface StorageAPIKey {
  [key: string]: string;
}
