import { Button, Card, Rate } from "antd";
import { useRelatedProducts } from "../../../shared/services/productApi";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function RelatedProducts({ productId }: { productId: number }) {
  const navigate = useNavigate();

  const { data: products = [], isLoading } = useRelatedProducts(productId);

  if (isLoading) return null;

  const formatVND = (value: number) => {
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-8">
        Sản phẩm liên quan
      </h2>

      {/* LIST */}
      <div
        className="
          flex gap-4 overflow-x-auto pb-4
          snap-x snap-mandatory
          sm:grid sm:grid-cols-2
          lg:grid-cols-4
          sm:overflow-visible
        "
      >
        {products.map((item: any) => (
          <Card
            key={item.id}
            hoverable
            className="min-w-[48%] sm:min-w-0 snap-start"
            cover={
              <img
                src={item.imageUrl}
                alt={item.name}
                className="h-72 w-full object-cover rounded-t-xl"
              />
            }
            onClick={() => navigate(`/products/${item.id}`)}
          >
            <div className="text-center space-y-2">
              {/* NAME (fix dài) */}
              <h3
                className="
                  font-semibold text-sm sm:text-base
                  line-clamp-2
                  min-h-[40px] sm:min-h-[48px]
                "
              >
                {item.name}
              </h3>

              <Rate disabled defaultValue={item.rating || 4} />

              {/* PRICE */}
              <div className="flex justify-center gap-2 min-h-[24px]">
                {item.discountPrice ? (
                  <>
                    <span className="text-pink-600 font-bold">
                      {formatVND(item.discountPrice)}
                    </span>
                    <span className="line-through text-gray-400 text-sm">
                      {formatVND(item.salePrice)}
                    </span>
                  </>
                ) : (
                  <span className="text-pink-600 font-bold">
                    {formatVND(item.salePrice)}
                  </span>
                )}
              </div>

              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                size="large"
                className="w-full !bg-teal-600 hover:!bg-teal-700"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Xem chi tiết
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
