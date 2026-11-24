import { MetaData } from "@/constants/metadata.type";

export interface Borrow {
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
      itemId: number;
      itemName: string;
      quantity: number;
    },
  ];
  createdAt: string;
  updatedAt: string;
}

export interface BorrowsResponse {
  data: Borrow[];
  meta: MetaData;
}
