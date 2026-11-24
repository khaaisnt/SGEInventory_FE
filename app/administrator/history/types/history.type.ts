import { MetaData } from "@/constants/metadata.type";

export interface History {
  id: number;
  requestType: string;
  requestId: number;
  activity: string;
  actor: {
    id: number;
    fullName: string;
  };
  createdAt: string;
}

export interface HistoryResponse {
  data: History[];
  meta: MetaData;
}
