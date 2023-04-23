export interface PayloadType {
  partId: string;
  mimeType: string;
  filename: string;
  headers: { name: string; value: string }[];
  body: {
    size: number;
    data?: string;
  };
  parts?: Array<PayloadType>;
}

export interface ThreadMessages {
  id: string;
  threadId: string;
  labelIds: string[];
  snippet: string;
  payload: PayloadType;
  sizeEstimate: number;
  historyId: string;
  internalDate: string;
}
