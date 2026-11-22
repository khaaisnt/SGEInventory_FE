import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useQuery } from "@tanstack/react-query";
import { ItemResponse } from "../types/items.type";

const PRIMARY_QUERY_KEY = "GET_ITEMS";
const URL = "/items";

export const useGetItems = (page: number, limit: number, search: string) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, page, limit, search];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get<ItemResponse>(URL, {
        params: { page, limit, search },
      });
      return response.data;
    },
  });
};
