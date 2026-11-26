import type { MetaData } from "@/constants/metadata.type";

interface HistoryUser {
  id: number;
  fullName: string;
  nim: string;
  contact: string;
}

interface HistoryInstitution {
  id: number;
  name: string;
}

interface BorrowingItem {
  itemId: number;
  itemName: string;
  quantity: number;
}

interface ConsignmentItem {
  id: number;
  name: string;
  quantity: number;
}

interface BorrowingHistoryDetail {
  id: number;
  status: string;
  purpose: string;
  pickUpDate: string;
  returnDate: string;
  user: HistoryUser;
  lembaga: HistoryInstitution;
  items: BorrowingItem[];
  returnPhotoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

interface ConsignmentHistoryDetail {
  id: number;
  status: string;
  eventName: string;
  startDate: string;
  endDate: string;
  notes: string;
  photoUrl: string | null;
  user: HistoryUser;
  lembaga: HistoryInstitution;
  items: ConsignmentItem[];
  createdAt: string;
  updatedAt: string;
}

export type HistoryMe =
  | {
      type: "BORROWING";
      createdAt: string;
      borrowing: BorrowingHistoryDetail;
      consignment: null;
    }
  | {
      type: "CONSIGNMENT";
      createdAt: string;
      borrowing: null;
      consignment: ConsignmentHistoryDetail;
    };

export interface HistoryMeResponse {
  message: string;
  data: HistoryMe[];
  meta: MetaData;
}
