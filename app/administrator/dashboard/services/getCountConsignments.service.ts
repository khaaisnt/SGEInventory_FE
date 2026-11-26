import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useQuery } from "@tanstack/react-query";
import { CountResponse } from "../types/count.type";

const PRIMARY_QUERY_KEY = "GET_COUNT_CONSIGNMENTS_REQUEST";
const URL = "/consignments/count";

export const useGetCountConsignments = () => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get<CountResponse>(URL);
      return response.data;
    },
  });
};
