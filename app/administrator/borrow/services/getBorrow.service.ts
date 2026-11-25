import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useQuery } from "@tanstack/react-query";
import type { BorrowDetailResponse } from "../types/borrow.type";

const PRIMARY_QUERY_KEY = "GET_BORROW";
const URL = "/borrowings";

export const useGetborrow = (borrowId: number, enabled = true) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, borrowId];

  return useQuery({
    queryKey: keys,
    enabled: enabled && borrowId > 0,
    queryFn: async () => {
      const response = await axiosInstance.get<BorrowDetailResponse>(
        `${URL}/${borrowId}`,
      );
      return response.data;
    },
  });
};
