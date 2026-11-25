import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useQuery } from "@tanstack/react-query";
import { HistoryMeResponse } from "../types/history.type";

const PRIMARY_QUERY_KEY = "GET_HISTORY_ME";
const URL = "/borrowings/me";

export const useGetHistoryMe = (page: number, limit: number) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, page, limit];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get<HistoryMeResponse>(URL, {
        params: { page, limit },
      });
      return response.data;
    },
  });
};
