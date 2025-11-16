
const expertsData = [
    {
        name: "Dr. Nguyễn Thị Lan",
        title: "Giám đốc & Chuyên gia da liễu",
        exp: "15 năm kinh nghiệm",
        bio: "Chuyên gia hàng đầu về chăm sóc da và điều trị thẩm mỹ không xâm lấn",
        img: "https://i.pinimg.com/736x/f7/8a/78/f78a78e2a6073f72ab3ef654d4509c15.jpg", // Placeholder
    },
    {
        name: "Trần Mỹ Kim",
        title: "Chuyên viên massage trị liệu",
        exp: "10 năm kinh nghiệm",
        bio: "Chuyên về massage thư giãn và trị liệu phục hồi cơ thể",
        img: "https://i.pinimg.com/736x/4c/54/6b/4c546b17a6ffe05ee742b5bd73abe0f3.jpg", // Placeholder
    },
    {
        name: "Lê Thị Khánh Ly",
        title: "Chuyên viên chăm sóc da",
        exp: "8 năm kinh nghiệm",
        bio: "Chuyên gia về các liệu pháp chăm sóc da và làm đẹp tự nhiên",
        img: "https://i.pinimg.com/736x/b4/db/af/b4dbaf3e511aebf6edae423b8f13fe21.jpg", // Placeholder
    },
    {
        name: "디오 밥스",
        title: "Chuyên gia ",
        exp: "12 năm kinh nghiệm",
        bio: "chuyên gia hàng đầu về thẩm mỹ hàng quốc",
        img: "https://i.pinimg.com/736x/92/71/ac/9271ac41759a83397b4f590163c9a5db.jpg", // Placeholder
    },
];


export const ExpertTeamSection = () => (
    <div className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-4xl font-extrabold text-gray-800">Đội ngũ chuyên gia</h2>
                <p className="mt-3 text-xl text-gray-600">
                    Những chuyên gia giàu kinh nghiệm, tận tâm mang đến dịch vụ chăm sóc tốt nhất cho bạn
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {expertsData.map((expert, index) => (
                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02]">
                        {/* Image matching the aspect ratio in the original image */}
                        <div className="h-64 sm:h-80 overflow-hidden">
                            <img
                                src={expert.img}
                                alt={expert.name}
                                className="w-full h-full object-cover"
                                onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x500/EAF9F7/158079?text=Expert"; }}
                            />
                        </div>

                        {/* Text Content */}
                        <div className="p-5 text-center flex flex-col items-center">
                            <h3 className="text-xl font-bold text-gray-800 mt-2">{expert.name}</h3>
                            <p className="text-teal-600 font-semibold text-sm mt-1">{expert.title}</p>

                            <div className="mt-3 pt-3 border-t border-gray-100 w-full">
                                <p className="text-sm text-gray-500 font-medium">{expert.exp}</p>
                                <p className="text-base text-gray-600 mt-2 leading-relaxed">{expert.bio}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);