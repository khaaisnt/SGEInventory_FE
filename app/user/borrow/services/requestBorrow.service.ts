import { useMutation } from "@tanstack/react-query";
import { DataReqBorrow } from "../types/borrow.type";
import axiosInstance from "@/lib/axiosInstace";
import { dataResponse } from "@/types/response";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

const URL = "/borrowings";

export const useRequestBorrow = () => {
  return useMutation({
    mutationFn: async (body: DataReqBorrow) => {
      try {
        const { data: response } = await axiosInstance.post<dataResponse>(
          URL,
          body,
        );

        return response;
      } catch (error: unknown) {
        const errorMessage = axios.isAxiosError<dataResponse>(error)
          ? error.response?.data?.message
          : error instanceof Error
            ? error.message
            : undefined;

        showErrorToast(
          errorMessage || "Gagal melakukan peminjaman. Silakan coba lagi.",
        );
        throw error;
      }
    },
    onSuccess: async (response) => {
      showSuccessToast(response.message || "Peminjaman berhasil ditambahkan.");
    },
  });
};
