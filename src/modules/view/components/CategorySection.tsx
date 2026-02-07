
import { useCategoriesWithQuantity } from "../../../shared/services/categoriesApi";
import { useNavigate } from "react-router-dom";
export const CATEGORY_IMAGES: Record<string, string> = {
  "o-khoc": "https://cf.shopee.vn/file/4cc1fd1176b697d8bf8e3cfc9e62f539",
  "qun": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200",
  "vy": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9BFvDxsAOoPed4yJaO4tOSyk1OQfVXvrMYw&s",
  "o-s-mi": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200",
};




export default function CategorySection() {
  const navigate = useNavigate();
  const { data: categories = [], isLoading } = useCategoriesWithQuantity();

  if (isLoading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((item) => {
          const image =
            CATEGORY_IMAGES[item.slug] ||
            "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1200";

          return (
            <div
              key={item.id}
              onClick={() =>
                navigate(`/products?category=${item.id}`)
              }
              className="relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
            >
              <img
                src={image}
                alt={item.name}
                className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              <div className="absolute bottom-5 left-5 text-white">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-sm opacity-90">
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
