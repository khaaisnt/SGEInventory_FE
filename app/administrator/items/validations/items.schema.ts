import * as yup from "yup";

export const createItemSchema = yup.object({
  name: yup.string().required("Nama item harus diisi"),
  description: yup.string().default(""),
  totalQuantity: yup.number().required("Kuantitas harus diisi"),
});
