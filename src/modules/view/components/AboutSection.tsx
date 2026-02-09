import { Tag } from "antd";

export default function AboutSection() {
    return (
        <section className="py-20 bg-gray-170">
            <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Text bên trái */}
                <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Về <span className="text-teal-600">Thảo Susi Store</span>
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-4">
                        Với hơn 10 năm kinh nghiệm trong ngành thời trang nữ, Thảo Susi Store tự hào là điểm đến tin cậy của hàng nghìn phụ nữ hiện đại. Chúng tôi mang đến những thiết kế thanh lịch, tinh tế, phù hợp với mọi phong cách sống.
                    </p>
                    <p className="text-gray-600 leading-relaxed mb-8">
                        Mỗi sản phẩm đều được chọn lọc kỹ lưỡng từ chất liệu đến đường may, đảm bảo mang lại sự thoải mái và tự tin cho phái đẹp trong mọi khoảnh khắc.
                    </p>

                    {/* Số liệu */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div>
                            <h3 className="text-2xl font-bold text-teal-600">10+</h3>
                            <p className="text-gray-600">Năm Kinh Nghiệm</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-teal-600">50,000+</h3>
                            <p className="text-gray-600">Khách Hàng Tin Tưởng</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-teal-600">500+</h3>
                            <p className="text-gray-600">Mẫu Thiết Kế Mới Mỗi Mùa</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-teal-600">98%</h3>
                            <p className="text-gray-600">Khách Hàng Hài Lòng</p>
                        </div>
                    </div>

                    {/* Badge */}
                    <div className="flex flex-wrap gap-3">
                        <Tag color="magenta" className="px-4 py-2 rounded-full text-base">
                            🌸 Chất Lượng Cao Cấp
                        </Tag>
                        <Tag color="red" className="px-4 py-2 rounded-full text-base">
                            🏆 Top Fashion 2024
                        </Tag>
                        <Tag color="purple" className="px-4 py-2 rounded-full text-base">
                            🛡 Cam Kết Chính Hãng
                        </Tag>
                    </div>
                </div>

                {/* Ảnh bên phải */}
                <div className="flex justify-center">
                    <img
                        src="/upload/z7504337376449_3fd70de8b702711a5c38fdbf96655231.jpg"
                        alt="Thảo Susi Store"
                        width={350}
                        height={300}
                        className="rounded-2xl shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
}
