import * as yup from "yup";

export const registerSchema = yup.object({
  fullName: yup.string().required("Nama lengkap harus diisi"),
  email: yup.string().email("Email tidak valid").required("Email harus diisi"),
  password: yup
    .string()
    .min(8, "Kata sandi minimal 8 karakter")
    .required("Kata sandi harus diisi"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password harus diisi"),
  contact: yup.string().required("Kontak harus diisi"),
});
