import { Button } from "antd";

const PromoBanner = () => {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-r from-pink-50 to-emerald-50 p-8 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">

        {/* Left content */}
        <div className="flex flex-col items-center text-center">

          {/* Badge */}
          <span className="mb-4 rounded-full bg-pink-100 px-4 py-1 text-sm font-medium text-pink-600">
            Ưu đãi đặc biệt
          </span>

          {/* Title */}
          <h2 className="mb-4 max-w-3xl text-3xl md:text-4xl font-bold leading-tight text-gray-900">
            Giảm đến 50% cho đơn hàng đầu tiên
          </h2>

          {/* Description */}
          <p className="mb-8 max-w-2xl text-base leading-relaxed text-gray-600">
            Đăng ký thành viên ngay hôm nay để nhận ưu đãi độc quyền và
            cập nhật xu hướng thời trang mới nhất
          </p>

          {/* Button */}
          <Button
            type="primary"
            size="large"
            className="bg-blue-600 hover:bg-blue-700 border-none px-8"
          >
            Đăng ký ngay →
          </Button>

        </div>

        {/* Right image */}
        <div className="flex items-center justify-center">
          <div className="overflow-hidden rounded-2xl shadow-lg">
            <img
              src="/upload/2056c3083d8f5e1c8ea6e00b22916948.jpg"
              alt="Shopping"
              className="h-72 w-72 md:h-80 md:w-80 object-cover"
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default PromoBanner;
