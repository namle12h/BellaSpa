const CollectionBanner = () => {
    return (
        <div
            className="relative w-full h-[260px] md:h-[320px] lg:h-[380px] overflow-hidden"
            style={{
                backgroundImage:
                    "url('https://images.unsplash.com/photo-1483985988355-763728e1935b')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40" />

            {/* Content */}
            <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4">
                <h1 className="mb-3  md:text-4xl lg:text-5xl  text-white tracking-wide font-playfair text-3xl font-semibold">
                    Bộ Sưu Tập
                </h1>

                <p className="max-w-2xl text-sm md:text-base text-gray-200 leading-relaxed">
                    Khám phá toàn bộ sản phẩm thời trang nữ hiện đại và thanh lịch
                </p>
            </div>
        </div>
    );
};

export default CollectionBanner;
