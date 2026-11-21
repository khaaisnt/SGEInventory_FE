import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import type { RegisterType } from "../types/register.type";
import axiosInstance from "@/lib/axiosInstace";

interface RegisterResponse {
  data: [
    id: number,
    fullName: string,
    nim: string,
    email: string,
    contact: string,
    role: string,
    createdAt: string,
    updatedAt: string,
  ];
  message: string;
}

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (body: RegisterType) => {
      try {
        const { data: response } = await axiosInstance.post<RegisterResponse>(
          "/users",
          body,
        );

        toast.success(response.message || "Pendaftaran berhasil");
        router.push("/login");

        return response;
      } catch (error: unknown) {
        const errorMessage =
          (axios.isAxiosError<RegisterResponse>(error)
            ? error.response?.data?.message
            : error instanceof Error
              ? error.message
              : undefined) || "Pendaftaran gagal, silakan coba lagi";

        toast.error(errorMessage);
        throw error;
      }
    },
  });
};
