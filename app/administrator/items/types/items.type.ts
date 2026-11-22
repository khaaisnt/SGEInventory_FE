import { MetaData } from "@/constants/metadata.type";

export interface Item {
  id: number;
  name: string;
  description: string;
  lembaga: {
    id: number;
    name: string;
  };
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

export interface DataCreateItem {
  name: string;
  description: string;
  lembagaId: number;
  totalQuantity: number;
}
