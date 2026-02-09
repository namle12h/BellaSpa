import { Breadcrumb, Button, message, Rate, Spin, Tag } from "antd";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useProductDetail } from "../../../shared/services/productApi";
import { useParams } from "react-router-dom";
import { useCart } from "../../../shared/context/CartContext";

type ProductImage = {
  id: number;
  imageUrl: string;
  isPrimary: boolean;
  sortOrder: number;
};

export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  images: ProductImage[];
  salePrice?: number;
  oldPrice?: number;
  stockQty?: number;
  description?: string;
  category?: string;

}




export default function ProductDetailView() {
  const { id } = useParams<{ id: string }>();

  const { data: product, isLoading } = useProductDetail(Number(id));
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");




  const [mainImage, setMainImage] = useState<string>("");

  const { addToCart } = useCart();

  // const images: ProductImage[] = product?.images ?? [];
  const images: ProductImage[] = Array.isArray(product?.images)
    ? product.images
    : [];


  const sortedImages = [...images].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    if (!product) return;

    const primaryImage =
      sortedImages.find(img => img.isPrimary)?.imageUrl ||
      sortedImages[0]?.imageUrl ||
      product.imageUrl;

    setMainImage(primaryImage);
  }, [product]);


  useEffect(() => {
    console.log("IMAGES:", product?.images);
  }, [product]);


  useEffect(() => {
    if (!product) return;

    const sizes = product.size?.split(",").map((s: any) => s.trim()) ?? [];
    const colors = product.color?.split(",").map((c: any) => c.trim()) ?? [];

    if (!size && sizes.length > 0) {
      setSize(sizes[0]);       // 👈 size đầu tiên từ DB
    }

    if (!color && colors.length > 0) {
      setColor(colors[0]);     // 👈 màu đầu tiên từ DB
    }
  }, [product]);

  // const primaryThumbnail = sortedImages.find(img => img.isPrimary)?.imageUrl;

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  if (!product) return null;



  const SIZES = product?.size?.split(",").map((s: any) => s.trim()) ?? [];
  const COLORS = product?.color?.split(",").map((c: any) => c.trim()) ?? [];

  const COLOR_MAP: Record<string, string> = {
    Trắng: "#ffffff",
    Đen: "#000000",
    Đỏ: "#ef4444",     // ✅ THÊM DÒNG NÀY
    Be: "#f5f5dc",
    Hồng: "#f472b6",
    Xanh: "#3b82f6",
  };



  return (
    <div className="container mx-auto max-w-[1200px] px-4 py-20">
      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { title: "Trang chủ" },
          { title: "Bộ sưu tập" },
          { title: product.name },
        ]}
        className="mb-6"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 py-4">
        {/* LEFT: IMAGE */}
        <div>
          <div className="relative rounded-xl overflow-hidden bg-gray-100">
            <img
              src={mainImage || product.imageUrl || "/upload/product-default.jpg"}
              className="w-full h-[520px] object-cover"
              alt={product.name}
            />
            {product.discount && (
              <Tag color="red" className="absolute top-4 right-4 text-sm">
                -{product.discount}%
              </Tag>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4">
            {sortedImages.map((img) => (
              <img
                key={img.id}
                src={img.imageUrl}
                onClick={() => setMainImage(img.imageUrl)}
                className={`w-20 h-20 object-cover rounded-lg border cursor-pointer
                ${mainImage === img.imageUrl
                    ? "border-emerald-500"
                    : "border-gray-300 hover:border-emerald-400"
                  }`}
              />

            ))
            }
          </div>

        </div>

        {/* RIGHT: INFO */}
        <div>
          <span className="text-emerald-600 text-sm font-medium">
            {product.category}
          </span>
          <h1 className="text-3xl font-playfair-display font-semibold mt-1 break-words">
            {product.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-2">
            <Rate disabled defaultValue={5} />
            <span className="text-sm text-gray-500"> ({product.reviewCount || 20} đánh giá)</span>
            <span className="text-sm text-gray-500">| | Đã bán {product.sold || 20}</span>
          </div>

          {/* Price */}
          {/* Price */}
          <div className="mt-4">
            {product.discountPercent > 0 && product.discountPrice ? (
              <>

                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-emerald-600">
                    {product.discountPrice.toLocaleString()}đ
                  </span>

                  <span className="text-gray-400 line-through text-lg">
                    {product.salePrice?.toLocaleString()}đ
                  </span>
                </div>

                <span className="inline-block mt-1 text-sm text-red-500 font-medium">
                  Tiết kiệm {product.discountPercent}%
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-emerald-600">
                {product.salePrice?.toLocaleString()}đ
              </span>
            )}
          </div>


          {/* Description */}
          <p className="text-gray-600 mt-4 leading-relaxed">
            {product.description}
          </p>


          {/* Color */}
          <div className="mt-6">
            <p className="font-medium mb-2">
              Màu sắc: {color}
            </p>

            <div className="flex gap-3">
              {COLORS.map((c: any) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className={`w-9 h-9 rounded-full border-2 transition
          ${color === c
                      ? "border-emerald-500 scale-110"
                      : "border-gray-300"
                    }`}
                  style={{ backgroundColor: COLOR_MAP[c] || "#e5e7eb" }}
                  title={c}
                />
              ))}
            </div>
          </div>




          {/* Size */}
          <div className="mt-6">
            <p className="font-medium mb-2">
              Kích thước: {size}
            </p>

            <div className="flex gap-2">
              {SIZES.map((s: any) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-4 py-2 rounded-md border text-sm transition ${size === s
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white border-gray-300 hover:border-emerald-400"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>



          {/* Quantity */}
          <div className="mt-6">
            <p className="font-medium mb-2">Số lượng</p>
            <div className="flex items-center gap-3">
              <button
                className="w-9 h-9 border rounded"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="w-9 h-9 border rounded"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
              <span className="text-sm text-gray-500">
                Còn {product.stockQty} sản phẩm
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-8">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              size="large"
              className="flex-1 !bg-emerald-600 hover:!bg-emerald-700"
              onClick={(e) => {
                e.stopPropagation();
                if (!size || !color) {
                  message.warning("Vui lòng chọn màu sắc và kích thước");
                  return;
                }

                addToCart(product, color, size);
              }}
            >
              Thêm vào giỏ hàng
            </Button>

            <Button size="large" icon={<HeartOutlined />} />
          </div>

          {/* Policies */}
          <div className="bg-gray-50 rounded-xl p-4 mt-8 space-y-3 text-sm">
            <p>🚚 Miễn phí vận chuyển cho đơn hàng từ 500.000đ</p>
            <p>🔁 Đổi trả miễn phí trong 7 ngày</p>
            <p>🛡️ Bảo hành chính hãng 100%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
