import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import axiosInstance from "@/lib/axiosInstace";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import type { dataResponse } from "@/types/response";
import type { DataReqStorage } from "../types/storage.type";

const URL = "/consignments";

export const useRequestStore = () => {
  return useMutation({
    mutationFn: async (request: DataReqStorage) => {
      const formData = new FormData();
      formData.append("lembagaId", String(request.lembagaId));
      formData.append("eventName", request.eventName);
      formData.append("items", JSON.stringify(request.items));
      formData.append("startDate", request.startDate);
      formData.append("endDate", request.endDate);
      formData.append("photo", request.photo);
      formData.append("notes", request.notes);

      try {
        const { data: response } = await axiosInstance.post<dataResponse>(
          URL,
          formData,
        );
        return response;
      } catch (error: unknown) {
        const errorMessage = axios.isAxiosError<dataResponse>(error)
          ? error.response?.data?.message
          : error instanceof Error
            ? error.message
            : undefined;

        showErrorToast(
          errorMessage || "Gagal mengirim permintaan penyimpanan.",
        );
        throw error;
      }
    },
    onSuccess: (response) => {
      showSuccessToast(
        response.message || "Permintaan penyimpanan berhasil dikirim.",
      );
    },
  });
};