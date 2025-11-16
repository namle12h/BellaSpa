import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../lib/axiosClient";
import { message } from "antd";

// ✅ Lấy danh sách customer
export const fetchCustomers = async (page = 1, limit = 5) => {
  const res = await axiosClient.get(`/customers`, {
    params: { page: page - 1, size: limit },
  });
  return res.data || { content: [], totalElements: 0 };
};

// ✅ Lấy chi tiết
export const fetchCustomerById = async (id: number) => {
  const res = await axiosClient.get(`/customers/${id}`);
  return res.data;
};

export const createCustomer = async (data: any) => {
  try {
    const res = await axiosClient.post(`/customers`, data, {
      headers: { "Content-Type": "application/json" },
    });
    return res.data;
  } catch (error: any) {
    console.log("error", error);

    // Kiểm tra xem có lỗi trả về từ API không
    if (error?.response?.status === 400) {
      // Lỗi từ API, hiển thị thông báo chi tiết
    } else {
      // Nếu lỗi không phải từ API, có thể là lỗi mạng, v.v.
      message.error("Không thể kết nối đến server. Vui lòng thử lại.");
    }

    // Ném lỗi ra để `useMutation` có thể bắt được
    throw error;
  }
};

// ✅ Cập nhật
export const updateCustomer = async (id: number, data: any) => {
  try {
    const res = await axiosClient.put(`/customers/${id}`, data, {
      headers: { "Content-Type": "application/json" },
    })
    return res.data;

  } catch (error) {
    message.error
    console.log("error", error)
  }

};

// ✅ Hook
export const useCustomers = (page = 1, limit = 5) =>
  useQuery({
    queryKey: ["customers", page, limit],
    queryFn: () => fetchCustomers(page, limit),
    staleTime: 1000 * 60 * 5,
  });

export const useCreateCustomer = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient(); // Dùng để invalidate các queries liên quan đến khách hàng

  return useMutation({
    mutationFn: createCustomer,  // Hàm thực hiện gửi request đến API
    onSuccess: () => {
      if (options?.onSuccess) options.onSuccess();  // Nếu có callback thì gọi nó (ví dụ: đóng modal)
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: (error: any) => {
      // Kiểm tra lỗi trả về từ backend
      if (error?.response?.data?.error) {
        const errorMessage = error?.response?.data?.error;

        // Nếu lỗi là "Email đã được đăng ký", hiển thị dưới trường email
        if (errorMessage === "Email đã được đăng ký") {
          message.error("Email đã được đăng ký. Vui lòng thử lại.");

        }
      } else {
        message.error("Đã có lỗi xảy ra. Vui lòng thử lại.");
      }
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      updateCustomer(id, data),
    onSuccess: () => {
      message.success("Cập nhật khách hàng thành công!");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
    onError: () => message.error("Lỗi khi cập nhật khách hàng"),
  });
};


export const fetchCustomerAll = async () => {
  // Sử dụng limit (size) rất lớn để lấy toàn bộ danh sách trong 1 lần gọi
  const ALL_CUSTOMERS_LIMIT = 9999;
  const res = await axiosClient.get(`/customers`, {
    headers: { "Content-Type": "application/json" },
    params: { page: 0, size: ALL_CUSTOMERS_LIMIT }, // Bắt đầu từ trang 0
  });

  // Giả định API trả về định dạng { content: CustomerDTO[], totalElements: number }
  return res.data.content || [];
};

// Trong file API khách hàng của bạn (customerApi.ts)

export const useCustomerAll = () => {
  return useQuery({
    queryKey: ["customers-all"],
    queryFn: fetchCustomerAll,
    // Cache dữ liệu lâu hơn (ví dụ: 1 giờ) vì nó là danh sách tĩnh cho lookup
    staleTime: 1000 * 60 * 60,
  });
};