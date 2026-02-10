
import { useCategoriesWithQuantity } from "../../../shared/services/categoriesApi";
import { useNavigate } from "react-router-dom";
export const CATEGORY_IMAGES: Record<string, string> = {
  "o-khoc": "https://cf.shopee.vn/file/4cc1fd1176b697d8bf8e3cfc9e62f539",
  "qun": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200",
  "vy": "https://cdn.kkfashion.vn/29652-home_default/dam-xoe-co-dan-tong-phoi-tui-mau-hong-hl27-09.jpg",
  "o-s-mi": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREhhVEyNKjSxUQbemWnJBOpH2pWit0X7Lltg&s",
};




export default function CategorySection() {
  const navigate = useNavigate();
  const { data: categories = [], isLoading } = useCategoriesWithQuantity();

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
  <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
  <div
    className="
      flex gap-4 overflow-x-auto pb-2
      sm:grid sm:grid-cols-2
      lg:grid-cols-4
      sm:overflow-visible
    "
  >
    {categories.map((item) => {
      const image =
        CATEGORY_IMAGES[item.slug] ||
        "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200";

      return (
        <div
          key={item.id}
          onClick={() => navigate(`/products?category=${item.id}`)}
          className="
            relative group cursor-pointer
            min-w-[70%] sm:min-w-0
            overflow-hidden rounded-xl sm:rounded-2xl shadow-md
          "
        >
          <img
            src={image}
            alt={item.name}
            className="
              h-[180px] sm:h-[240px] lg:h-[320px]
              w-full object-cover
              transition-transform duration-500 group-hover:scale-110
            "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          <div className="absolute bottom-3 left-3 sm:bottom-5 sm:left-5 text-white">
            <h3 className="text-sm sm:text-base lg:text-xl font-semibold">
              {item.name}
            </h3>
            <p className="text-xs sm:text-sm opacity-90">
              {item.productCount} sản phẩm
            </p>
          </div>
        </div>
      );
    })}
  </div>
</section>


  );
}
