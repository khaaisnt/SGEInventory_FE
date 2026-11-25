export interface DataReqStorage {
  lembagaId: number;
  eventName: string;
  items: {
    name: string;
    quantity: number;
  }[];
  startDate: string;
  endDate: string;
  photo: File;
  notes: string;
}
