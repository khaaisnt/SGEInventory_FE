export interface DataReqBorrow {
  purpose: string;
  lembagaId: number;
  pickUpDate: string;
  returnDate: string;
  items: {
    itemId: number;
    quantity: number;
  }[];
}
