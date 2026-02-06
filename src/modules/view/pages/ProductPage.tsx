import { useProducts } from "../../../shared/services/productApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../shared/components/Header";
import Footer from "../../../shared/components/Footer";
import BookingModal from "../components/BookingModal";
import BookingButtonFixed from "../components/ButtonBooking";
import { useState } from "react";
import { Button, Card, Pagination, Rate, Spin, Tag } from "antd";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductCategories from "../components/ProductCategories";
import { useCart } from "../../../shared/context/CartContext";

export default function ProductPageView() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "6");
  const category = searchParams.get("category") || "all";
  const sort = searchParams.get("sort") || "new";


  const { addToCart } = useCart();

  // ✅ Gọi API
  const { data: products, isLoading, isError } = useProducts(page, limit);

  // ✅ Lấy dữ liệu từ backend
  const productList = products?.content ?? [];
  const total = products?.totalElements ?? 0;


  const categories = [
    { label: "Tất cả", value: "all" },
    { label: "Váy", value: "dress" },
    { label: "Áo sơ mi", value: "shirt" },
    { label: "Quần", value: "pants" },
    { label: "Áo khoác", value: "jacket" },
  ];

  const handleCategoryChange = (value: string) => {
    setSearchParams({ category: value, sort, page: "1" });
  };

  



  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString(), limit: limit.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Loading
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Spin size="large" />
      </div>
    );
  }

  // ✅ Error
  if (isError) {
    return (
      <div className="text-center text-red-500 py-20">
        Lỗi tải sản phẩm. Vui lòng thử lại.
      </div>
    );
  }

  return (
    <div>
      <Header />



      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* Tiêu đề */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold">Bộ sưu tập</h1>
            <p className="text-gray-500 mt-2">
              Khám phá toàn bộ sản phẩm thời trang của chúng tôi
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-1 rounded-full border text-sm transition ${category === cat.value
                    ? "bg-emerald-500 text-white border-emerald-500"
                    : "bg-white text-gray-600 hover:border-emerald-500"
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {productList.map((p: any) => (
              <Card
                key={p.id}
                hoverable
                onClick={() => navigate(`/products/${p.id}`)}
                cover={
                  <div className="relative">
                    <img
                      src={p.imageUrl || "/upload/product-default.jpg"}
                      alt={p.name}
                      className="h-56 w-full object-cover rounded-t-xl"
                    />
                    {p.label && (
                      <Tag
                        color={
                          p.label === "Bán chạy"
                            ? "red"
                            : p.label === "Premium"
                              ? "purple"
                              : p.label === "Giảm giá"
                                ? "green"
                                : "blue"
                        }
                        className="absolute top-3 left-3 font-semibold"
                      >
                        {p.label}
                      </Tag>
                    )}
                  </div>
                }
                className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                styles={{ body: { padding: "16px" } }}
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {p.name}
                </h3>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {p.description}
                </p>

                <div className="flex items-center gap-1 mb-2">
                  <Rate disabled allowHalf defaultValue={p.rating || 4.5} />
                  <span className="text-gray-500 text-xs">
                    ({p.reviews || 0} đánh giá)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-pink-600 font-bold text-lg">
                    {p.salePrice?.toLocaleString()} VND
                  </span>
                  <div className="flex gap-2">
                    <Button type="primary" className="!bg-pink-600 hover:!bg-pink-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}>
                      Thêm vào giỏ

                    </Button>
                    <Button
                      type="default"
                      className="border-pink-500 text-pink-500 hover:bg-pink-50"
                    >
                      Xem Chi Tiết
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Pagination backend */}
          <div className="flex justify-center mt-12">
            <Pagination
              current={page}
              pageSize={limit}
              total={total}
              onChange={handlePageChange}
              showSizeChanger={false}
            />
          </div>
        </div>
      </section>

      <FeaturedProducts />
      <ProductCategories />

      <BookingModal open={open} onClose={() => setOpen(false)} />
      <BookingButtonFixed onClick={() => setOpen(true)} />
      <Footer />
    </div>
  );
}
