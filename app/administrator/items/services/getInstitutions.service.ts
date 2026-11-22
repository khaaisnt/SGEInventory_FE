import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useQuery } from "@tanstack/react-query";
import { ItemResponse } from "../types/institutions.type";

const PRIMARY_QUERY_KEY = "GET_INSTITUTION";
const URL = "/lembaga";

export const useGetInstitutions = (page: number, limit: number) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, page, limit];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get<ItemResponse>(URL, {
        params: { page, limit },
      });
      return response.data;
    },
  });
};
