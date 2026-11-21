import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import type { dataResponse } from "@/types/response";
import type { DataCreateItem } from "../types/items.type";

const ITEMS_QUERY_KEY = [PREFIX_KEY.GET, "GET_ITEMS"];
const URL = "/items";

export const useCreateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (body: DataCreateItem) => {
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
          errorMessage || "Gagal menambahkan item. Silakan coba lagi.",
        );
        throw error;
      }
    },
    onSuccess: async (response) => {
      showSuccessToast(response.message || "Item berhasil ditambahkan.");
      await queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
};
