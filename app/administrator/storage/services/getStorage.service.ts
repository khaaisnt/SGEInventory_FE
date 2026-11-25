import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useQuery } from "@tanstack/react-query";
import { StorageDetailResponse } from "../types/storage.type";

const PRIMARY_QUERY_KEY = "GET_STORAGE";
const URL = "/consignments";

export const useGetStorage = (storageId: number, enabled = true) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, storageId];

  return useQuery({
    queryKey: keys,
    enabled: enabled && storageId > 0,
    queryFn: async () => {
      const response = await axiosInstance.get<StorageDetailResponse>(
        `${URL}/${storageId}`,
      );
      return response.data;
    },
  });
};
