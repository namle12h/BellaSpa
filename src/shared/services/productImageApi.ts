
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../lib/axiosClient";
// 📸 Lấy danh sách ảnh phụ

export const fetchProductImages = async (productId: number) => {
  const res = await axiosClient.get(`/products/${productId}/images`);
  return res.data;
};

export const useProductImages = (productId?: number | null) =>
  useQuery({
    queryKey: ["product-images", productId],
    queryFn: () => fetchProductImages(productId!),
    enabled: !!productId,
  });

/* ================== DELETE ================== */

export const useDeleteProductImage = (productId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (imageId: number) =>
      axiosClient.delete(`/products/product-images/${imageId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-images", productId],
      });
    },
  });
};

/* ================== UPDATE FILE ================== */

export const useUpdateProductImage = (productId: number | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      imageId,
      file,
    }: {
      imageId: number;
      file: File;
    }) => {
      const formData = new FormData();
      formData.append("file", file);

      return axiosClient.put(
        `products/product-images/${imageId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["product-images", productId],
      });
    },
  });
};