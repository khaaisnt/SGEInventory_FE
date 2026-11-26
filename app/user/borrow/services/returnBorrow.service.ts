import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import type { dataResponse } from "@/types/response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface ReturnBorrowRequest {
  borrowingId: number;
  photo: File;
}

const BORROWINGS_URL = "/borrowings";
const HISTORY_QUERY_KEY = [PREFIX_KEY.GET, "GET_HISTORY_ME"];

export const useReturnBorrow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ borrowingId, photo }: ReturnBorrowRequest) => {
      const formData = new FormData();
      formData.append("photo", photo);

      try {
        const { data: response } = await axiosInstance.post<dataResponse>(
          `${BORROWINGS_URL}/${borrowingId}/return`,
          formData,
        );
        return response;
      } catch (error: unknown) {
        const errorMessage = axios.isAxiosError<dataResponse>(error)
          ? error.response?.data?.message
          : error instanceof Error
            ? error.message
            : undefined;

        showErrorToast(errorMessage || "Gagal mengirim pengembalian barang.");
        throw error;
      }
    },
    onSuccess: async (response) => {
      showSuccessToast(
        response.message || "Pengembalian barang berhasil dikirim.",
      );
      await queryClient.invalidateQueries({
        queryKey: HISTORY_QUERY_KEY,
      });
    },
  });
};
