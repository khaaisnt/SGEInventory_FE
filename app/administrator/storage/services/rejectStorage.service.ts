import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import type { dataResponse } from "@/types/response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const BORROWS_QUERY_KEY = [PREFIX_KEY.GET, "GET_BORROWS"];
const BORROW_URL = "/borrowings";

export const useApproveBorrow = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (borrowId: number) => {
      try {
        const { data: response } = await axiosInstance.patch<dataResponse>(
          `${BORROW_URL}/${borrowId}/approve`,
        );
        return response;
      } catch (error: unknown) {
        const errorMessage = axios.isAxiosError<dataResponse>(error)
          ? error.response?.data?.message
          : error instanceof Error
            ? error.message
            : undefined;

        showErrorToast(errorMessage || "Gagal menyetujui peminjaman.");
        throw error;
      }
    },
    onSuccess: async (response, borrowId) => {
      showSuccessToast(response.message || "Peminjaman berhasil disetujui.");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: BORROWS_QUERY_KEY }),
        queryClient.invalidateQueries({
          queryKey: [PREFIX_KEY.GET, "GET_BORROW", borrowId],
        }),
      ]);
    },
  });
};
