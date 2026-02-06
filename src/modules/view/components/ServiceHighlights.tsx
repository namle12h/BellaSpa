import { TruckOutlined, SyncOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

export default function ServiceHighlights() {
  const items = [
    {
      icon: <TruckOutlined className="text-2xl text-teal-600" />,
      title: "Miễn phí vận chuyển",
      desc: "Giao hàng miễn phí cho đơn hàng trên 500.000đ",
    },
    {
      icon: <SyncOutlined className="text-2xl text-teal-600" />,
      title: "Đổi trả dễ dàng",
      desc: "Đổi trả trong vòng 7 ngày nếu không hài lòng",
    },
    {
      icon: <CustomerServiceOutlined className="text-2xl text-teal-600" />,
      title: "Hỗ trợ 24/7",
      desc: "Đội ngũ chăm sóc khách hàng luôn sẵn sàng hỗ trợ",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  // Auto slide mỗi 3s (mobile)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* ===== MOBILE SLIDER ===== */}
        <div className="block md:hidden text-center overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div
                key={index}
                className="min-w-full flex flex-col items-center px-4"
              >
                <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {items.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === activeIndex ? "bg-teal-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ===== DESKTOP GRID ===== */}
        <div className="hidden md:grid grid-cols-3 gap-12 text-center">
          {items.map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 flex items-center justify-center mb-6">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {item.title}
              </h3>
              <p className="text-gray-500 text-sm max-w-xs">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
