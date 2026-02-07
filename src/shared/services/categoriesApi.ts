import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../../shared/lib/axiosClient";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await axiosClient.get("/categories");
      return res.data; // [{ id, name, ... }]
    },
  });
};

export interface Category {
  id: number;
  name: string;
  slug: string;
  productCount: number;
}

export const fetchCategoriesWithQuantity = async () => {
  const res = await axiosClient.get("/categories/quantity");
  return res.data as Category[];
};
export const useCategoriesWithQuantity = () => {
  return useQuery({
    queryKey: ["categories", "quantity"],
    queryFn: fetchCategoriesWithQuantity,
    staleTime: 5 * 60 * 1000, // cache 5 phút
  });
};