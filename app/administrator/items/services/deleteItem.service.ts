import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import type { dataResponse } from "@/types/response";

interface DeleteItemRequest {
  id: number;
}

const ITEMS_QUERY_KEY = [PREFIX_KEY.GET, "GET_ITEMS"];
const ITEM_QUERY_KEY = [PREFIX_KEY.GET, "GET_ITEM"];
const URL = "/items";

export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: DeleteItemRequest) => {
      try {
        const { data: response } = await axiosInstance.delete<dataResponse>(
          `${URL}/${id}`,
        );
        return response;
      } catch (error: unknown) {
        const errorMessage = axios.isAxiosError<dataResponse>(error)
          ? error.response?.data?.message
          : error instanceof Error
            ? error.message
            : undefined;

        showErrorToast(errorMessage || "Gagal menghapus item.");
        throw error;
      }
    },
    onSuccess: async (response, { id }) => {
      showSuccessToast(response.message || "Barang berhasil dihapus.");
      queryClient.removeQueries({
        queryKey: [...ITEM_QUERY_KEY, id],
        exact: true,
      });
      await queryClient.invalidateQueries({ queryKey: ITEMS_QUERY_KEY });
    },
  });
};
