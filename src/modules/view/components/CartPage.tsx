import { useState } from "react";
import {
  Button,
  InputNumber,
  Empty,
  Card,
  Divider,
  message,
  Checkbox,
} from "antd";
import {
  DeleteOutlined,
  ShoppingCartOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import Header from "../../../shared/components/Header";
import { useCart } from "../../../shared/context/CartContext";
import type { CartItem } from "../../../shared/context/CartContext";



export default function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity } = useCart();
  const getCartKey = (item: CartItem) =>
    `${item.id}_${item.color}_${item.size}`;
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);


  // 🧮 Tính tổng tiền của sản phẩm được chọn
  const selectedTotal = cart
    .filter((item) =>
      selectedRowKeys.includes(getCartKey(item))
    )
    .reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

  const displayTotal =
    selectedRowKeys.length > 0 ? selectedTotal : 0;


  const handleSelect = (
    item: CartItem,
    checked: boolean
  ) => {
    const key = getCartKey(item);

    setSelectedRowKeys((prev) =>
      checked
        ? [...prev, key]
        : prev.filter((k) => k !== key)
    );
  };

  const handleRemove = (item: CartItem) => {
    removeFromCart(item.id, item.color, item.size);

    setSelectedRowKeys((prev) =>
      prev.filter((k) => k !== getCartKey(item))
    );
  };


  const handleQuantityChange = (
    item: CartItem,
    value: number
  ) => {
    updateQuantity(
      item.id,
      item.color,
      item.size,
      value || 1
    );
  };


  const handleCheckout = () => {
    if (cart.length === 0) {
      message.warning("Giỏ hàng đang trống!");
      return;
    }

    const checkoutItems =
      selectedRowKeys.length > 0
        ? cart.filter((item) =>
          selectedRowKeys.includes(getCartKey(item))
        )
        : [];



    if (checkoutItems.length === 0) {
      message.warning("Vui lòng chọn sản phẩm để thanh toán!");
      return;
    }

    localStorage.setItem("checkoutItems", JSON.stringify(checkoutItems));
    message.success("Chuyển đến trang thanh toán 💳");
    navigate("/checkout");
  };

  const handleAddToFavorites = () => {
    if (selectedRowKeys.length === 0) {
      message.info("Vui lòng chọn sản phẩm để thêm vào yêu thích 💖");
      return;
    }
    message.success("Đã thêm sản phẩm vào danh sách yêu thích 💖");
  };

  if (cart.length === 0)
    return (
      <div className="flex flex-col items-center justify-center py-24 bg-gray-50">
        <Empty
          description="Giỏ hàng của bạn đang trống"
          imageStyle={{ height: 120 }}
        />
        <Button
          type="primary"
          className="mt-4 bg-pink-600 hover:bg-pink-700"
          onClick={() => navigate("/products")}
        >
          Tiếp tục mua sắm
        </Button>
      </div>
    );

  return (
    <div>
      <Header />
      <div className="bg-gray-50 min-h-screen py-20">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-3 gap-8">
          {/* 🛍️ Giỏ hàng bên trái */}
          <div className="md:col-span-2 ">
            <Card className="rounded-2xl shadow-md border border-gray-100">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <ShoppingCartOutlined className="text-pink-500" /> Giỏ hàng của bạn
              </h2>

              {cart.map((item) => (
                <div
                  key={getCartKey(item)}
                  className="flex flex-col sm:flex-row items-center justify-between gap-4 py-5 border-b border-gray-100"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <Checkbox
                      checked={selectedRowKeys.includes(getCartKey(item))}
                      onChange={(e) =>
                        handleSelect(item, e.target.checked)
                      }
                    />
                    <img
                      src={item.imageUrl || "/upload/product-default.jpg"}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-lg shadow-sm"
                    />
                    <div className="flex flex-col">
                      <h3 className="font-semibold text-lg text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        Màu: <span className="font-medium">{item.color}</span> ·
                        Size: <span className="font-medium">{item.size}</span>
                      </p>
                      <p className="text-sm">
                        {item.originalPrice && item.originalPrice > item.price ? (
                          <>
                            <span className="text-pink-600 font-semibold">
                              {item.price.toLocaleString()} ₫
                            </span>
                            <span className="text-gray-400 line-through ml-2 text-xs">
                              {item.originalPrice.toLocaleString()} ₫
                            </span>
                            {item.discountPercent && (
                              <span className="ml-2 text-red-500 text-xs font-medium">
                                -{item.discountPercent}%
                              </span>
                            )}
                          </>
                        ) : (
                          <span className="text-pink-600 font-semibold">
                            {item.price.toLocaleString()} ₫
                          </span>
                        )}
                      </p>

                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(v) =>
                        handleQuantityChange(item, v || 1)
                      }
                      className="!w-20"
                    />

                    <Button
                      icon={<DeleteOutlined />}
                      danger
                      shape="circle"
                      onClick={() => handleRemove(item)}
                    />

                  </div>
                </div>
              ))}
            </Card>

            {/* 🔘 Nút thao tác dưới danh sách */}
            <div className="flex flex-wrap gap-3 justify-between mt-6">
              <Button
                onClick={() => navigate("/products")}
                className="border-pink-500 text-pink-600 hover:bg-pink-50"
              >
                Tiếp tục mua sắm
              </Button>
              <Button
                icon={<HeartOutlined />}
                onClick={handleAddToFavorites}
                className="border-pink-500 text-pink-600 hover:bg-pink-50"
              >
                Thêm vào yêu thích
              </Button>
            </div>
          </div>

          {/* 💰 Tóm tắt đơn hàng */}
          <div>
            <Card className="rounded-2xl shadow-md border border-gray-100 top-5 !sticky">
              <h3 className="text-xl font-bold mb-3">Tóm tắt đơn hàng</h3>

              {selectedRowKeys.length === 0 ? (
                <p className="text-gray-500 italic mb-4">
                  💡 Vui lòng chọn sản phẩm để xem tổng tiền
                </p>
              ) : (
                <>
                  <div className="flex justify-between mb-2 text-gray-600">
                    <span>Tạm tính</span>
                    <span>{displayTotal.toLocaleString()} ₫</span>
                  </div>

                  <div className="flex justify-between mb-2 text-gray-600">
                    <span>Phí vận chuyển</span>
                    <span className="text-green-600 font-medium">Miễn phí</span>
                  </div>

                  <div className="flex justify-between mb-2 text-gray-600">
                    <span>Giảm giá</span>
                    <span className="text-green-600">-85.000 ₫</span>
                  </div>

                  <Divider />

                  <div className="flex justify-between mb-4">
                    <span className="font-bold text-lg">Tổng cộng</span>
                    <span className="font-bold text-lg text-pink-600">
                      {(displayTotal - 85000).toLocaleString()} ₫
                    </span>
                  </div>
                </>
              )}

              {/* <div className="mb-3">
                <input
                  placeholder="Nhập mã giảm giá"
                  className="border border-gray-300 rounded-lg w-full px-3 py-2 outline-none focus:ring-2 focus:ring-pink-400"
                />
                <Button className="w-full mt-2">Áp dụng</Button>
              </div> */}

              <Button
                type="primary"
                size="large"
                className="w-full bg-pink-600 hover:bg-pink-700 font-semibold"
                onClick={handleCheckout}
              >
                Thanh toán ngay
              </Button>



              <Divider />
              <div className="text-sm text-gray-500 space-y-1">
                <p>✅ Thanh toán an toàn và bảo mật</p>
                <p>🚚 Miễn phí vận chuyển cho đơn trên 500.000 ₫</p>
                <p>🔁 Đổi trả trong 30 ngày</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
