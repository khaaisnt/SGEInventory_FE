import { MetaData } from "@/constants/metadata.type";

export interface Borrow {
  id: number;
  status: string;
  purpose: string;
  pickUpDate: string;
  returnDate: string;
  returnPhotoUrl?: string | null;
  user: {
    id: number;
    fullName: string;
    contact?: string;
    nim?: string;
  };
  lembaga: {
    id: number;
    name: string;
  };
  items: {
    itemId: number;
    itemName: string;
    quantity: number;
  }[];
  createdAt: string;
  updatedAt: string;
}

export interface BorrowDetailResponse {
  data: Borrow;
}

export interface BorrowsResponse {
  data: Borrow[];
  meta: MetaData;
}
