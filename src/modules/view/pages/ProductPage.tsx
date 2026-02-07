import { useProducts, useProductsByCategory } from "../../../shared/services/productApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../shared/components/Header";
import Footer from "../../../shared/components/Footer";
import { Button, Card, Pagination, Rate, Spin, Tag } from "antd";
import FeaturedProducts from "../components/FeaturedProducts";
import { useCart } from "../../../shared/context/CartContext";
import PromoBanner from "../components/PromoBanner";
import CollectionBanner from "../components/CollectionBanner";
import { useCategories } from "../../../shared/services/categoriesApi";

export default function ProductPageView() {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get("category") || "all";

  const categoryId =
    categoryParam === "all" ? undefined : Number(categoryParam);

  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "8");
  const { data: categoriesData = [] } = useCategories();
  const isAll = categoryParam === "all";


  const { addToCart } = useCart();

  // ✅ Gọi API
  const productsQuery = isAll
    ? useProducts(page, limit)
    : useProductsByCategory(page, limit, categoryId!);

  const { data: products, isLoading, isError } = productsQuery;

  // ✅ Lấy dữ liệu từ backend
  const productList = products?.content ?? [];
  const total = products?.totalElements ?? 0;


  const categories = [
    { label: "Tất cả", value: "all" },
    ...categoriesData.map((cat: any) => ({
      label: cat.name,
      value: cat.id.toString(),
    })),
  ];


  const handleCategoryChange = (value: string) => {
    setSearchParams({
      category: value,
      page: "1",
      limit: limit.toString(),
    });
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

      <CollectionBanner />


      <FeaturedProducts />

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* Tiêu đề */}
          <div className="text-left mb-8">
            <h1 className="text-3xl font-playfair-display text-gray-700">Tất Cả Sản Phẩm</h1>

          </div>

          {/* Filter */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex gap-2 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryChange(cat.value)}
                  className={`px-4 py-1 rounded-full border text-sm transition ${categoryParam === cat.value

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
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {productList.map((p: any) => (
              <Card
                key={p.id}
                hoverable

                onClick={() => navigate(`/products/${p.id}`)}
                cover={
                  <div className="relative overflow-hidden rounded-t-xl">
                    <img
                      src={p.imageUrl || "/upload/product-default.jpg"}
                      alt={p.name}
                      className="h-56 w-full object-cover rounded-t-xl"
                    />
                    {p.discountPercent > 0 && (
                      <Tag
                        color="red"
                        className="!absolute top-3 left-3 z-10 font-semibold"
                      >
                        -{p.discountPercent}%
                      </Tag>
                    )}
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

                className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 h-full"
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

                <div className="mt-auto">
                  {/* Giá */}
                  <div className="mb-3">
                    {p.discountPercent > 0 && p.discountPrice ? (
                      <div className="flex items-center gap-2">
                        <span className="text-red-600 font-semibold text-base">
                          {p.discountPrice.toLocaleString()} VND
                        </span>
                        <span className="text-gray-400 line-through text-sm">
                          {p.salePrice.toLocaleString()} VND
                        </span>
                      </div>
                    ) : (
                      <span className="text-red-600 font-semibold text-base">
                        {p.salePrice?.toLocaleString()} VND
                      </span>
                    )}
                  </div>


                  {/* Buttons */}
                  <div className="flex gap-2 w-full min-w-0">
                    <Button
                      type="primary"
                      size="small"
                      className="flex-1 min-w-0 !bg-teal-600 hover:!bg-teal-700 truncate"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(p);
                      }}
                    >
                      Thêm vào giỏ
                    </Button>

                    <Button
                      type="default"
                      size="small"
                      className="flex-1 min-w-0 border-teal-500 text-teal-500 truncate hover:bg-teal-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${p.id}`);
                      }}
                    >
                      Xem chi tiết
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

      {/* <ProductCategories /> */}
      <PromoBanner />


      <Footer />
    </div>
  );
}
