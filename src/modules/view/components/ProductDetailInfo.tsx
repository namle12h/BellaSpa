import { CheckCircleOutlined } from "@ant-design/icons";

const ProductDetailInfo = () => {
  return (
    <div className="max-w-5xl mx-auto bg-gray-50 rounded-lg shadow-sm p-6 pt-20 mb-10">
      {/* Title */}
      <h2 className="text-lg font-semibold mb-6">Chi tiết sản phẩm</h2>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left */}
        <div>
          <h3 className="font-medium mb-4">Thông tin sản phẩm</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Chất liệu</span>
              <span>Cotton cao cấp</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Xuất xứ</span>
              <span>Việt Nam</span>
            </div>

            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-500">Kiểu dáng</span>
              <span>Regular fit</span>
            </div>

            <div className="flex justify-between">
              <span className="text-gray-500">Mùa</span>
              <span>4 mùa</span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div>
          <h3 className="font-medium mb-4">Hướng dẫn bảo quản</h3>

          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <CheckCircleOutlined className="!text-green-500" />
              <span>Giặt máy ở nhiệt độ thường</span>
            </li>

            <li className="flex items-center gap-2">
              <CheckCircleOutlined className="!text-green-500" />
              <span>Không sử dụng chất tẩy mạnh</span>
            </li>

            <li className="flex items-center gap-2">
              <CheckCircleOutlined className="!text-green-500" />
              <span>Ủi ở nhiệt độ trung bình</span>
            </li>

            <li className="flex items-center gap-2">
              <CheckCircleOutlined className="!text-green-500" />
              <span>Phơi trong bóng râm</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailInfo;
