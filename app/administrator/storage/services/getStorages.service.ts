import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useQuery } from "@tanstack/react-query";
import { StorageResponse } from "../types/storage.type";

const PRIMARY_QUERY_KEY = "GET_STORAGES";
const URL = "/consignments";

export const useGetStorages = (page: number, limit: number, search: string) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, page, limit, search];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get<StorageResponse>(URL, {
        params: { page, limit, search },
      });
      return response.data;
    },
  });
};
