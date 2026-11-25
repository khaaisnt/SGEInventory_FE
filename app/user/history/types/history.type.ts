import { MetaData } from "@/constants/metadata.type";

export interface HistoryMe {
  id: number;
  status: string;
  purpose: string;
  pickUpDate: string;
  returnDate: string;
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
      itemId: 1;
      itemName: string;
      quantity: 2;
    },
  ];
  returnPhotoUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryMeResponse {
  data: HistoryMe[];
  meta: MetaData;
}
