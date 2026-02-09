import { Button } from 'antd';
import {
  CheckOutlined,
  HomeOutlined,
  PrinterOutlined,
  StarOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  InfoCircleOutlined
} from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useOrderDetail } from '../../../shared/services/orderApi';


const PaymentSuccessPage = () => {
  // --- Dữ liệu mẫu (Mock Data) ---
  const { txnRef } = useParams();

  const {
    data,
    isLoading,
    isError
  } = useOrderDetail(txnRef!);



  if (isLoading) return <div>Đang tải...</div>;
  if (isError) return <div>Lỗi tải đơn hàng.</div>;
  if (!data) return <div>Đơn hàng không tìm thấy.</div>;

  const orderInfo = data;


  // Format tiền tệ VNĐ
  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex items-center justify-center font-sans">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-2xl w-full">

        {/* 1. HEADER SECTION */}
        <div className="bg-[#1cc0a0] text-center py-10 px-6 text-white">
          <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg opacity-90">
            <CheckOutlined className="!text-[#1cc0a0] text-4xl font-bold" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Thanh Toán Thành Công!</h1>
          <p className="text-white/90 text-lg">Cảm ơn bạn đã đặt dịch vụ tại spa của chúng tôi</p>
        </div>

        {/* 2. BODY SECTION */}
        <div className="p-8">

          {/* Order ID Box */}
          <div className="bg-[#eafffa] border border-[#1cc0a0]/20 rounded-xl p-5 mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <p className="text-gray-500 text-xs mb-1">Mã đơn hàng</p>
              <p className="text-xl font-bold text-gray-800">{orderInfo.txnRef}</p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-gray-500 text-xs mb-1">Ngày đặt</p>
              <p className="text-gray-800 font-medium">
                {orderInfo.date} <span className="text-gray-400 text-xs ml-1">{orderInfo.time}</span>
              </p>
            </div>
          </div>

          {/* Customer Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3">
              <div className="bg-[#1cc0a0]/10 w-10 h-10 rounded-lg flex items-center justify-center text-[#1cc0a0]">
                <UserOutlined />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Khách hàng</p>
                <p className="text-sm font-medium text-gray-700 truncate">{orderInfo.receiverName}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3">
              <div className="bg-[#1cc0a0]/10 w-10 h-10 rounded-lg flex items-center justify-center text-[#1cc0a0]">
                <MailOutlined />
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] text-gray-400 uppercase font-bold">Email</p>
                <p className="text-sm font-medium text-gray-700 truncate">{orderInfo.email}</p>
              </div>
            </div>

            <div className="bg-gray-50 p-3 rounded-xl flex items-center gap-3">
              <div className="bg-[#1cc0a0]/10 w-10 h-10 rounded-lg flex items-center justify-center text-[#1cc0a0]">
                <PhoneOutlined />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold">Số điện thoại</p>
                <p className="text-sm font-medium text-gray-700">{orderInfo.receiverPhone}</p>
              </div>
            </div>
          </div>

        {/* Order Details */}
<div className="mb-8">
  <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-lg">
    <FileTextOutlined className="text-[#1cc0a0]" /> Chi tiết đơn hàng
  </h3>

  <div className="bg-gray-50 rounded-2xl p-6">
    {/* List Items */}
    <div className="space-y-4 mb-6">
      {orderInfo.orderItems?.map((item: any) => (
        <div key={item.productId} className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img
              src={item.imageUrl}
              alt={item.productName}
              className="w-12 h-12 rounded-lg object-cover bg-[#1cc0a0]/20"
            />
            <div>
              <p className="font-medium text-gray-700">{item.productName}</p>
              <p className="text-xs text-gray-400">Số lượng: {item.quantity}</p>
            </div>
          </div>

          <span className="font-bold text-gray-800">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      ))}
    </div>

    <div className="border-t border-gray-200 my-4"></div>

    {/* Summary */}
    <div className="space-y-2">
      <div className="flex justify-between text-gray-500 text-sm">
        <span>Tạm tính</span>
        <span>{formatCurrency(orderInfo.total)}</span>
      </div>

      {/* discount API không trả → bỏ */}
      {/* <div className="flex justify-between text-[#1cc0a0] text-sm font-medium">
        <span>Giảm giá (10%)</span>
        <span>-0đ</span>
      </div> */}

      <div className="flex justify-between items-center pt-2">
        <span className="font-bold text-gray-800 text-lg">Tổng cộng</span>
        <span className="font-bold text-[#1cc0a0] text-2xl">
          {formatCurrency(orderInfo.total)}
        </span>
      </div>
    </div>
  </div>

  {/* Payment Method */}
  <div className="bg-gray-50 rounded-xl p-4 mt-2 flex justify-between items-center">
    <span className="text-gray-500 text-sm">Phương thức thanh toán</span>
    <span className="font-medium text-gray-700 flex items-center gap-2">
      <CreditCardOutlined />
      {orderInfo.paymentMethod === "cod" ? "Thanh toán khi nhận hàng" : "Thanh toán online"}
    </span>
  </div>
</div>


          {/* Info Alert */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex gap-3 mb-8">
            <InfoCircleOutlined className="text-blue-500 mt-1" />
            <div className="text-xs text-blue-700 leading-relaxed">
              <span className="font-bold">Xác nhận đặt lịch</span>
              <br />
              Chúng tôi đã gửi email xác nhận đến <span className="font-bold">customer@example.com</span>. Vui lòng kiểm tra hộp thư để xem chi tiết lịch hẹn và hướng dẫn.
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <Button
              type="primary"
              size="large"
              className="bg-[#1cc0a0] hover:bg-[#17a589] border-none h-12 text-sm font-semibold rounded-xl shadow-md shadow-teal-200"
              icon={<HomeOutlined />}
              href="/home"
            >
              Về trang chủ
            </Button>
            <Button
              size="large"
              className="h-12 text-gray-600 border-gray-300 font-medium rounded-xl hover:text-[#1cc0a0] hover:border-[#1cc0a0]"
              icon={<PrinterOutlined />}
            >
              In hóa đơn
            </Button>
            <Button
              size="large"
              className="h-12 text-[#1cc0a0] border-[#1cc0a0] font-medium rounded-xl hover:bg-[#eafffa]"
              icon={<StarOutlined />}
            >
              Đánh giá dịch vụ
            </Button>
          </div>

          {/* Footer Text */}
          <div className="text-center text-xs text-gray-400">
            <p className="mb-1">Cần hỗ trợ? Liên hệ với chúng tôi</p>
            <div className="space-x-4 font-medium text-[#1cc0a0]">
              <span className="cursor-pointer hover:underline"><PhoneOutlined /> 1900 xxxx</span>
              <span className="cursor-pointer hover:underline"><MailOutlined /> support@spa.com</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;