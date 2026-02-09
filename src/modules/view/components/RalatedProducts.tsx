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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((item: any) => (
          <Card
            key={item.id}
            hoverable
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
              <h3 className="font-semibold">{item.name}</h3>

              <Rate disabled defaultValue={item.rating || 4} />

              <div className="flex justify-center gap-2">
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
                className="flex-1 !bg-teal-600 hover:!bg-teal-700"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Thêm vào giỏ hàng
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
