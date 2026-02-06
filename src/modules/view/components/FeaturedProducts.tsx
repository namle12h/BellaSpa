import { Rate } from "antd";
import { HeartOutlined } from "@ant-design/icons";

const products = [
  {
    id: 1,
    name: "Váy Hoa Nhẹ Nhàng",
    price: 450000,
    image: "/upload/z7504336725356_e21b4056e59afdb9a3e43509411d386d.jpg",
    isNew: true,
    rating: 5,
  },
  {
    id: 2,
    name: "Áo Sơ Mi Trắng Thanh Lịch",
    price: 320000,
    image: "/upload/z7504337376449_3fd70de8b702711a5c38fdbf96655231.jpg",
    isNew: false,
    rating: 5,
  },
  {
    id: 3,
    name: "Quần Tây Công Sở",
    price: 380000,
    image:"/upload/z7505356921661_710487bde75057db253711b083819694.jpg",
    isNew: true,
    rating: 5,
  },
  {
    id: 4,
    name: "Áo Khoác Dạ Mùa Đông",
    price: 890000,
    image: "/upload/z7505356922098_be822a3ca9ae0d9ece3bd59bfb2b8248.jpg",
    isNew: false,
    rating: 5,
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-semibold">
            Sản Phẩm Nổi Bật
          </h2>
          <p className="text-pink-500 mt-2">
            Những sản phẩm được yêu thích nhất tại Thảo Susi Store
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden relative"
            >
              {/* Tag */}
              {p.isNew && (
                <span className="absolute top-4 left-4 bg-pink-500 text-white text-xs px-3 py-1 rounded-full z-10">
                  Mới
                </span>
              )}

              {/* Wishlist */}
              <button className="absolute top-4 right-4 bg-white rounded-full p-2 shadow z-10 hover:text-pink-500">
                <HeartOutlined />
              </button>

              {/* Image */}
              <div className="h-[320px] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-5 text-center">
                <h3 className="font-medium text-gray-800 mb-2">
                  {p.name}
                </h3>

                <Rate disabled defaultValue={p.rating} className="text-sm" />

                <p className="mt-3 text-pink-500 font-semibold">
                  {p.price.toLocaleString()} VND
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
