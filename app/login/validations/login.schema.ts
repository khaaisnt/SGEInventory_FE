import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().required("Email harus diisi"),
  password: yup.string().required("Kata sandi harus diisi"),
});