import { Button, Card, Spin } from "antd";
import { axiosClient } from "../../../shared/lib/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
    const navigate = useNavigate();

    const page = 1;   // cố định cho sản phẩm nổi bật
    const limit = 8;  // hiển thị 6 sp

    const fetchFeaturedProducts = async () => {
        const res = await axiosClient.get("/products", {
            params: {
                page,
                limit,
                featured: true, // nếu backend có hỗ trợ
            },
        });

        return res.data;
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["featured-products", page, limit],
        queryFn: fetchFeaturedProducts,
    });

    const products = data?.content ?? [];

    // Loading
    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Spin size="large" />
            </div>
        );
    }

    // Error
    if (isError) {
        return (
            <div className="text-center text-red-500 py-20">
                Lỗi tải sản phẩm nổi bật.
            </div>
        );
    }

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-[1200px]">
                {/* Title */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Sản phẩm nổi bật
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Những sản phẩm được yêu thích nhất trong mùa này
                    </p>
                </div>

                {/* Grid */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((p: any) => (
                        <Card
                            key={p.id}
                            hoverable
                            onClick={() => navigate(`/products/${p.id}`)}
                            cover={
                                <img
                                    src={p.imageUrl || "/upload/product-default.jpg"}
                                    alt={p.name}
                                    className="h-90 w-full object-cover"
                                />
                            }
                            className="rounded-xl shadow-md hover:shadow-lg transition"
                            styles={{ body: { padding: "16px" } }}
                        >
                            <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                {p.name}
                            </h3>

                            <div className="flex items-center justify-between">
                                <span className="text-teal-600 font-bold text-lg">
                                    {p.salePrice?.toLocaleString() || p.price?.toLocaleString()} VNĐ
                                </span>
                            </div>

                        </Card>


                    ))}

                </div>
                <div className="flex justify-center mt-10">
                    <Button
                        type="primary"
                        className="!bg-teal-600 px-8 h-11 text-base font-medium"
                        onClick={() => navigate("/products")}
                    >
                        Xem tất cả sản phẩm
                    </Button>
                </div>

            </div>
        </section>
    );
}
