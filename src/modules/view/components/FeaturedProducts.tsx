import { Rate, Spin, Empty } from "antd";
import { HeartOutlined } from "@ant-design/icons";
import { useEffect, useRef } from "react";
import { useRandomProducts } from "../../../shared/services/productApi";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const { products, isLoading, isError } = useRandomProducts(4);

  // 👉 Auto slide (mobile only)
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let index = 0;
    const cards = slider.children;
    const total = cards.length;

    const interval = setInterval(() => {
      if (window.innerWidth >= 640 || total === 0) return;

      index = (index + 1) % total;
      const card = cards[index] as HTMLElement;

      slider.scrollTo({
        left: card.offsetLeft,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [products]);

  if (isLoading) {
    return (
      <section className="py-16 text-center">
        <Spin />
      </section>
    );
  }

  if (isError || products.length === 0) {
    return (
      <section className="py-16 text-center">
        <Empty description="Không có sản phẩm nổi bật" />
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-pink-500 mt-2">
            Những sản phẩm được yêu thích nhất tại Thảo Susi Store
          </p>
        </div>

        {/* Slider */}
        <div
          ref={sliderRef}
          className="
            flex gap-4 overflow-x-auto pb-3
            snap-x snap-mandatory
            sm:grid sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            sm:overflow-visible
          "
        >
          {products.map((p: any) => {
  const hasDiscount =
    p.salePrice && Number(p.salePrice) < Number(p.price);

  const discountPercent =
    p.discountPercent ||
    (hasDiscount
      ? Math.round(
          ((p.price - p.salePrice) / p.price) * 100
        )
      : 0);

  return (
    <Link
      to={`/products/${p.id}`}
      key={p.id}
      className="
        min-w-[48%] sm:min-w-0
        snap-start
        bg-white rounded-xl shadow-md hover:shadow-xl transition
        overflow-hidden relative
        block
      "
    >
      {/* Badge giảm giá */}
      {hasDiscount && (
        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
          -{discountPercent}%
        </span>
      )}

      {/* Wishlist (chặn click lan ra ngoài) */}
      <button
        onClick={(e) => e.preventDefault()}
        className="absolute top-3 right-3 bg-white rounded-full p-2 shadow z-10 hover:text-pink-500"
      >
        <HeartOutlined />
      </button>

      {/* Image */}
      <div className="h-[200px] sm:h-[260px] lg:h-[320px] overflow-hidden">
        <img
          src={p.thumbnail || p.imageUrl}
          alt={p.name}
          className="w-full h-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-3 sm:p-5 text-center">
        <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-1 line-clamp-2">
          {p.name}
        </h3>

        <Rate
          disabled
          defaultValue={p.rating || 5}
          className="text-xs sm:text-sm"
        />

        {/* Giá */}
        <div className="mt-2">
          {hasDiscount ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-pink-500 font-semibold text-sm sm:text-base">
                {Number(p.salePrice).toLocaleString()} VND
              </span>
              <span className="text-gray-400 line-through text-xs sm:text-sm">
                {Number(p.price).toLocaleString()} VND
              </span>
            </div>
          ) : (
            <p className="text-pink-500 font-semibold text-sm sm:text-base">
              {Number(p.salePrice).toLocaleString()} VND
            </p>
          )}
        </div>
      </div>
    </Link>
  );
})}

   
        </div>
      </div>
    </section>
  );
}
