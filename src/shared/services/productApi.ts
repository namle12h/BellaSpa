
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { message } from "antd";
import { axiosClient } from "../lib/axiosClient";

// 🧴 Lấy danh sách sản phẩm
export const fetchProducts = async (page: number, limit: number) => {
  const res = await axiosClient.get(`/products?page=${page}&limit=${limit}`);
    console.log("🔥 API raw data:", res.data);
  return res.data;
};

export const useProducts = (page: number, limit: number) => {
  return useQuery({
    queryKey: ["products", page, limit],
    queryFn: () => fetchProducts(page, limit),
    
    staleTime: 0, // cache 5 phút
  });
};

// 🧴 Lấy sản phẩm đã gắn với dịch vụ
export const fetchServiceProducts = async (serviceId: number) => {
  const res = await axiosClient.get(`/services/${serviceId}/products`);
  return res.data;
};

export const useServiceProducts = (serviceId: number) => {
  return useQuery({
    queryKey: ["service-products", serviceId],
    queryFn: () => fetchServiceProducts(serviceId),
    enabled: !!serviceId,
  });
};

// 🧩 Thêm sản phẩm vào dịch vụ
export const addServiceProduct = async ({
  serviceId,
  productId,
  quantity,
  note,
}: any) => {
  const res = await axiosClient.post(`/services/${serviceId}/products`, {
    productId,
    quantity,
    note,
  });
  return res.data;
};

export const useAddServiceProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addServiceProduct,
    onSuccess: (_, variables) => {
      message.success("✅ Đã thêm sản phẩm vào dịch vụ!");
      // Refresh danh sách sản phẩm của dịch vụ tương ứng
      queryClient.invalidateQueries({
        queryKey: ["service-products", variables.serviceId],
      });
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.message || "❌ Thêm sản phẩm thất bại!");
    },
  });
};

// 🗑️ Xóa sản phẩm khỏi dịch vụ
export const deleteServiceProduct = async ({
  serviceId,
  id,
}: {
  serviceId: number;
  id: number;
}) => {
  const res = await axiosClient.delete(`/services/${serviceId}/products/${id}`);
  return res.data;
};

export const useDeleteServiceProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteServiceProduct,
    onSuccess: (_, variables) => {
      message.success("🗑️ Đã xóa sản phẩm khỏi dịch vụ!");
      queryClient.invalidateQueries({
        queryKey: ["service-products", variables.serviceId],
      });
    },
    onError: () => message.error("❌ Không thể xóa sản phẩm!"),
  });
};

// 🧩 Thêm mới sản phẩm (chung)
export const createProduct = async (productData: any) => {
  const res = await axiosClient.post(`/products`, productData);
  return res.data;
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      message.success("🎉 Thêm sản phẩm thành công!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: (error: any) => {
      message.error(error.response?.data?.message || "❌ Thêm sản phẩm thất bại!");
    },
  });
};


// 🔍 Lấy chi tiết sản phẩm theo ID
export const fetchProductDetail = async (id: number) => {
  const res = await axiosClient.get(`/products/${id}`);
  return res.data;
};



export const useProductDetail = (id: number) => {
  return useQuery({
    queryKey: ["product-detail", id],
    queryFn: () => fetchProductDetail(id),
    enabled: !!id, // ⭐ rất quan trọng
    staleTime: 5 * 60 * 1000, // cache 5 phút
  });
};
