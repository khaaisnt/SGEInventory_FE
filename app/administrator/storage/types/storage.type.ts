import { MetaData } from "@/constants/metadata.type";

export interface Storage {
  id: number;
  status: string;
  eventName: string;
  startDate: string;
  endDate: string;
  notes: string;
  photoUrl: string;
  user: {
    id: number;
    fullName: string;
  };
  lembaga: {
    id: number;
    name: string;
  };
  items: [
    {
      id: number;
      name: string;
      quantity: number;
    },
  ];
  createdAt: string;
  updatedAt: string;
}

export interface StorageDetailResponse {
  data: Storage;
}

export interface StorageResponse {
  data: Storage[];
  meta: MetaData;
}
