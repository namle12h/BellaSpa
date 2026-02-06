const categories = [
  {
    id: 1,
    name: "Váy",
    count: 45,
    image:
      "https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200",
  },
  {
    id: 2,
    name: "Áo sơ mi",
    count: 38,
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1200",
  },
  {
    id: 3,
    name: "Quần",
    count: 52,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1200",
  },
  {
    id: 4,
    name: "Áo khoác",
    count: 29,
    image:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1200",
  },
];

export default function CategorySection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      {/* Title */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-serif font-semibold text-gray-900">
          Danh mục sản phẩm
        </h2>
        <p className="mt-3 text-gray-500">
          Tìm kiếm phong cách phù hợp với bạn từ các danh mục đa dạng
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((item) => (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-2xl shadow-md cursor-pointer"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="h-[320px] w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Text */}
            <div className="absolute bottom-5 left-5 text-white">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="text-sm opacity-90">
                {item.count} sản phẩm
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
