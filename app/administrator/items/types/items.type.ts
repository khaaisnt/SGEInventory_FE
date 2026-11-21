import { MetaData } from "@/constants/metadata.type";

export interface Item {
  id: number;
  name: string;
  description: string;
  totalQuantity: number;
  availableQuantity: number;
  status: string;
  createdAt: string;
  updaredAt: string;
}

export interface ItemResponse {
    data: Item[];
    meta: MetaData;
}
