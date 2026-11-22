import { MetaData } from "@/constants/metadata.type";

export interface Institutions {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface ItemResponse {
  data: Institutions[];
  meta: MetaData;
}
