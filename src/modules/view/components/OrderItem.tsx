import { useEffect, useState } from "react";
interface OrderItemProps {
  name: string;
  quantity: number;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  color?: string;
  size?: string;
  image?: string;
}


export default function OrderItem({ name, quantity, price, originalPrice,
  discountPercent,
  color,
  size, image }: OrderItemProps) {
  const [formattedPrice, setFormattedPrice] = useState("");

  useEffect(() => {
    // ✅ Định dạng giá tiền theo chuẩn Việt Nam
    setFormattedPrice(price.toLocaleString("vi-VN"));
  }, [price]);

  return (
    <div className="flex items-center py-4 border-b">
      {/* Ảnh sản phẩm */}
      <div className="w-16 h-16 flex-shrink-0 relative">
        <img
          src={image || "/placeholder.svg"}
          alt={name}
          className="w-full h-full object-cover object-top rounded-md"
        />
      </div>

      {/* Thông tin sản phẩm */}
      <div className="ml-4 flex-grow">
        <h3 className="font-medium text-gray-800">{name}</h3>

        <p className="text-sm text-gray-500">
  {color && (
    <>
      Màu: <span className="font-medium">{color}</span>
    </>
  )}

  {color && size && " · "}

  {size && (
    <>
      Size: <span className="font-medium">{size}</span>
    </>
  )}

  {!color && !size && (
    <span className="italic text-gray-400">
      Không có phân loại
    </span>
  )}
</p>


        <p className="text-gray-500">SL: {quantity}</p>
      </div>

      {/* Giá */}
      <div className="text-right min-w-[120px]">
        {originalPrice && originalPrice > price ? (
          <>
            <p className="font-semibold text-pink-600">
              {formattedPrice} VND
            </p>

            <p className="text-sm text-gray-400 line-through">
              {originalPrice.toLocaleString("vi-VN")} VND
            </p>

            {discountPercent && (
              <span className="text-xs text-green-600">
                -{discountPercent}%
              </span>
            )}
          </>
        ) : (
          <p className="font-semibold text-gray-700">
            {formattedPrice} VND
          </p>
        )}
      </div>

    </div>
  );
}
