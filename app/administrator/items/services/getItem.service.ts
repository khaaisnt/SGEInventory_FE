import { PREFIX_KEY } from "@/constants/common";
import axiosInstance from "@/lib/axiosInstace";
import { useQuery } from "@tanstack/react-query";

const PRIMARY_QUERY_KEY = "GET_ITEM";
const URL = "/items";

export const useGetItem = (itemId: number) => {
  const keys = [PREFIX_KEY.GET, PRIMARY_QUERY_KEY, itemId];

  return useQuery({
    queryKey: keys,
    queryFn: async () => {
      const response = await axiosInstance.get(`${URL}/${itemId}`);
      return response.data;
    },
  });
};
