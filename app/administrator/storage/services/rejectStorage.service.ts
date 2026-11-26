import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import type { dataResponse } from "@/types/response";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const STORAGES_QUERY_KEY = [PREFIX_KEY.GET, "GET_STORAGES"];
const STORAGE_URL = "/consignments";

export const useRejectStorage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (storageId: number) => {
      try {
        const { data: response } = await axiosInstance.patch<dataResponse>(
          `${STORAGE_URL}/${storageId}/reject`,
        );
        return response;
      } catch (error: unknown) {
        const errorMessage = axios.isAxiosError<dataResponse>(error)
          ? error.response?.data?.message
          : error instanceof Error
            ? error.message
            : undefined;

        showErrorToast(errorMessage || "Gagal menolak penitipan.");
        throw error;
      }
    },
    onSuccess: async (response, storageId) => {
      showSuccessToast(response.message || "Penitipan berhasil ditolak.");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: STORAGES_QUERY_KEY }),
        queryClient.invalidateQueries({
          queryKey: [PREFIX_KEY.GET, "GET_STORAGE", storageId],
        }),
      ]);
    },
  });
};
