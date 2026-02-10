import { useProducts, useProductsByCategory } from "../../../shared/services/productApi";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../../../shared/components/Header";
import Footer from "../../../shared/components/Footer";
import { Button, Card, Pagination, Rate, Spin, Tag } from "antd";
import FeaturedProducts from "../components/FeaturedProducts";
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
          <div
            className="
    grid grid-cols-2 gap-4
    sm:grid-cols-2 sm:gap-6
    md:grid-cols-3
    lg:grid-cols-4 lg:gap-8
  "
          >

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
                      className="
    h-44 sm:h-56
    w-full object-cover
    flex-shrink-0
  "
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
                className="
                  rounded-xl shadow-md hover:shadow-lg transition-all duration-300
                  h-full flex flex-col
                "

                styles={{
                  body: {
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                  },
                }}

              >
                <h3 className="
  text-sm sm:text-base font-semibold mb-1
  line-clamp-2
  min-h-[40px]
">

                  {p.name}

                </h3>


                <p
                  className="
                  hidden sm:block
                  text-gray-600 text-sm mb-3
                  max-h-[42px]      /* chiều cao ~ 2 dòng */
                  overflow-hidden
                  relative
                "
                >
                  {p.description}
                </p>





                <div className="flex items-center gap-1 mb-1 sm:mb-2">
                  <Rate
                    disabled
                    allowHalf
                    defaultValue={p.rating || 4.5}
                    style={{ fontSize: 10 }}          // 📱 mobile nhỏ
                    className="sm:[&_.ant-rate-star]:text-sm"
                  />

                  <span className="text-gray-500 text-[9px] sm:text-xs">
                    ({p.reviews || 0} đánh giá)
                  </span>
                </div>


                <div className="mt-auto">
                  {/* Giá */}
                  <div className="mb-2 sm:mb-3">
                    {p.discountPercent > 0 && p.discountPrice ? (
                      <div className="flex items-center gap-2">
                        {/* Giá sau giảm */}
                        <span className="text-red-600 font-semibold text-sm sm:text-base">
                          {p.discountPrice.toLocaleString()} VND
                        </span>

                        {/* Giá gốc */}
                        <span className="text-gray-400 line-through text-xs sm:text-sm">
                          {p.salePrice.toLocaleString()} VND
                        </span>
                      </div>
                    ) : (
                      <span className="text-red-600 font-semibold text-sm sm:text-base">
                        {p.salePrice?.toLocaleString()} VND
                      </span>
                    )}
                  </div>


                  {/* Buttons */}
                  <div className="flex gap-2 w-full min-w-0">

                    <Button
                      type="default"
                      size="small"
                      className="flex-1 min-w-0 !bg-teal-500 border-teal-500 text-teal-500 truncate hover:bg-teal-50"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/products/${p.id}`);
                      }}
                    >
                      <span className="block text-white  sm:hidden">Xem</span>

                      {/* Desktop */}
                      <span className="hidden text-white  sm:block">Xem chi tiết</span>
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
