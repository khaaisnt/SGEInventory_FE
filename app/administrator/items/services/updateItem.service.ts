import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import type { dataResponse } from "@/types/response";
import type { DataCreateItem } from "../types/items.type";

interface UpdateItemRequest extends DataCreateItem {
  id: number;
}

const ITEMS_QUERY_KEY = [PREFIX_KEY.GET, "GET_ITEMS"];
const URL = "/items";

export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...body }: UpdateItemRequest) => {
      try {
        const { data: response } = await axiosInstance.put<dataResponse>(
          `${URL}/${id}`,
          body,
        );
        return response;
      } catch (error: unknown) {
        const errorMessage = axios.isAxiosError<dataResponse>(error)
          ? error.response?.data?.message
          : error instanceof Error
            ? error.message
            : undefined;

        showErrorToast(errorMessage || "Gagal memperbarui item.");
        throw error;
      }
    },
    onSuccess: async (response, { id }) => {
      showSuccessToast(response.message || "Barang berhasil diperbarui.");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY }),
        queryClient.invalidateQueries({
          queryKey: [PREFIX_KEY.GET, "GET_ITEM", id],
        }),
      ]);
    },
  });
};
