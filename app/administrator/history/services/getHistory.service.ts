import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useQuery } from "@tanstack/react-query";
import { HistoryResponse } from "../types/history.type";

const PRIMARY_QUERY_KEY = "GET_HISTORY";
const URL = "/logs";

export const useGetHistory = (page: number, limit: number, search: string) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, page, limit, search];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get<HistoryResponse>(URL, {
        params: { page, limit, search },
      });
      return response.data;
    },
  });
};
