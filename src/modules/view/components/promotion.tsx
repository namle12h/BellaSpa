import { useState } from 'react';
import { Button } from 'antd';
import {  SearchOutlined, TagOutlined, FireOutlined, GiftOutlined, CalendarOutlined, HeartOutlined } from '@ant-design/icons';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';

const allPrograms = [
    {
        id: 1,
        category: 'Khuyến Mãi',
        tags: ['Khuyến Mãi'],
        discountTag: '-50%',
        title: 'SALE KHAI TRƯƠNG – GIẢM 50% TOÀN BỘ SẢN PHẨM',
        description: 'Mừng khai trương cửa hàng thời trang, giảm ngay 50% tất cả quần áo, váy đầm, áo sơ mi và phụ kiện. Số lượng có hạn!',
        duration: '01/03 - 10/03',
        oldPrice: '1.000.000đ',
        newPrice: '500.000đ',
        img: 'https://public.readdy.ai/ai/img_res/335ee3c2fdd764e1ea72ba6e1b5374ec.jpg',
        color: 'bg-red-500',
    },
    {
        id: 2,
        category: 'Bộ Sưu Tập Mới',
        tags: ['Bộ Sưu Tập Mới', 'Mới'],
        title: 'BST SPRING SUMMER 2026',
        description: 'Khám phá bộ sưu tập Xuân Hè với thiết kế trẻ trung, chất liệu cao cấp và gam màu thời thượng.',
        duration: 'Ra mắt tháng 3/2026',
        oldPrice: '1.500.000đ',
        newPrice: '1.290.000đ',
        img: 'https://readdy.ai/api/search-image?query=spring%20summer%20fashion%20collection%20display%20with%20light%20pastel%20colored%20feminine%20dresses%20and%20floral%20patterns%2C%20fresh%20bright%20women%20clothing%20on%20elegant%20mannequins%2C%20modern%20fashion%20boutique%20setting%20with%20natural%20sunlight%2C%20soft%20teal%20and%20pink%20tones%2C%20professional%20fashion%20photography%20with%20airy%20fresh%20aesthetic&width=800&height=600&seq=promo-spring-summer1&orientation=landscape',
        color: 'bg-teal-500',
    },
    {
        id: 3,
        category: 'Sự Kiện',
        tags: ['Sự Kiện'],
        title: 'FASHION WEEKEND – MUA 2 TẶNG 1',
        description: 'Sự kiện cuối tuần siêu hot: Mua 2 sản phẩm bất kỳ tặng 1 sản phẩm giá trị tương đương hoặc thấp hơn.',
        duration: 'Thứ 7 & Chủ Nhật',
        oldPrice: '',
        newPrice: 'Ưu đãi đặc biệt',
        img: 'https://public.readdy.ai/ai/img_res/cdc55f557069f8acba4b362284a7c880.jpg',
        color: 'bg-purple-600',
    },
    {
        id: 4,
        category: 'Khuyến Mãi',
        tags: ['Khuyến Mãi'],
        discountTag: '-30%',
        title: 'FLASH SALE ĐẦM DỰ TIỆC',
        description: 'Giảm 30% các mẫu váy dự tiệc cao cấp, thiết kế sang trọng, tôn dáng hoàn hảo.',
        duration: 'Chỉ hôm nay',
        oldPrice: '1.200.000đ',
        newPrice: '840.000đ',
        img: 'https://readdy.ai/api/search-image?query=elegant%20evening%20party%20dresses%20collection%20on%20mannequins%20with%20luxurious%20fabrics%20and%20sophisticated%20designs%2C%20glamorous%20women%20formal%20gowns%20in%20rich%20colors%2C%20upscale%20fashion%20boutique%20setting%20with%20dramatic%20lighting%2C%20professional%20fashion%20photography%20with%20elegant%20refined%20aesthetic%2C%20red%20flash%20sale%20promotional%20atmosphere&width=800&height=600&seq=promo-party-dress1&orientation=landscape',
        color: 'bg-red-500',
    },
    {
        id: 5,
        category: 'Combo Ưu Đãi',
        tags: ['Combo Ưu Đãi', 'Mới'],
        discountTag: '-40%',
        title: 'COMBO ÁO SƠ MI + QUẦN TÂY',
        description: 'Set đồ công sở thanh lịch dành cho nữ, giảm 40% khi mua theo combo.',
        duration: 'Áp dụng đến 31/03',
        oldPrice: '2.000.000đ',
        newPrice: '1.200.000đ',
        img: 'https://public.readdy.ai/ai/img_res/dd63401431db2bb1f32d22cd71f574cd.jpg',
        color: 'bg-green-600',
    },
    {
        id: 6,
        category: 'Bộ Sưu Tập Mới',
        tags: ['Bộ Sưu Tập Mới', 'Mới'],
        title: 'BST STREET STYLE',
        description: 'Phong cách năng động, trẻ trung với hoodie, áo thun oversized và quần cargo cá tính.',
        duration: 'Limited Edition',
        oldPrice: '',
        newPrice: 'Từ 450.000đ',
        img: 'https://public.readdy.ai/ai/img_res/6828844127523205e5770ac5ec1995e2.jpg',
        color: 'bg-teal-500',
    },
];

// --- MAIN COMPONENT ---

const PromotionsPage = () => {
    const [activeFilter, setActiveFilter] = useState('all'); // 'all', 'Khuyến Mãi', 'Liệu Trình Mới', 'Sự Kiện', 'Gói Dịch Vụ'
    const [searchTerm, setSearchTerm] = useState('');

    const filterOptions = [
        { key: 'all', label: 'Tất Cả', icon: <HeartOutlined /> },
        { key: 'Khuyến Mãi', label: 'Khuyến Mãi', icon: <FireOutlined /> },
        { key: 'Bộ Sưu Tập Mới', label: 'Bộ Sưu Tập Mới', icon: <TagOutlined /> },
        { key: 'Sự Kiện', label: 'Sự Kiện', icon: <CalendarOutlined /> },
        { key: 'Combo Ưu Đãi', label: 'Combo Ưu Đãi', icon: <GiftOutlined /> },
    ];


    const filteredPrograms = allPrograms.filter(program => {
        const categoryMatch = activeFilter === 'all' || program.category === activeFilter;
        const searchMatch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            program.description.toLowerCase().includes(searchTerm.toLowerCase());
        return categoryMatch && searchMatch;
    });

    interface Program {
        id: number;
        category: string;
        tags: string[];
        discountTag?: string; // Optional field
        title: string;
        description: string;
        duration: string;
        oldPrice: string;
        newPrice: string;
        img: string;
        color: string;
    }

    interface ProgramCardProps {
        program: Program; // Use the defined interface here
    }
    const ProgramCard = ({ program }: ProgramCardProps) => (
        <div
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 
  hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 relative"
        >

            <div className="relative h-56 overflow-hidden">
                <img
                    src={program.img}
                    alt={program.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                {/* Discount */}
                {program.discountTag && (
                    <span className="absolute top-4 left-4 bg-black text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                        {program.discountTag}
                    </span>
                )}

                {program.tags.includes('Mới') && (
                    <span className="absolute top-4 right-4 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                        NEW
                    </span>
                )}
            </div>


            <div className="p-4 flex flex-col h-full">
                {/* Program Type */}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md text-white ${program.color} opacity-90 self-start`}>
                    {program.category}
                </span>

                <h3 className="text-xl font-semibold text-gray-900 mt-3 group-hover:text-black transition">
                    {program.title}
                </h3>

                <p className="text-gray-500 mt-2 text-sm leading-relaxed flex-grow line-clamp-2">
                    {program.description}</p>

                {/* <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center text-teal-600 font-semibold text-sm">
                        {program.category === 'Sự Kiện' ? <CalendarOutlined className="mr-1" /> : <ClockCircleOutlined className="mr-1" />}
                        {program.duration}
                    </div>
                    <div className="text-right">
                        {program.oldPrice && (
                            <p className="text-sm text-gray-400 line-through">
                                {program.oldPrice}
                            </p>
                        )}
                        <p className="text-xl font-bold text-black tracking-wide">
                            {program.newPrice}
                        </p>
                    </div>

                </div> */}

                <Button
                    type="primary"
                    size="large"
                    className="w-full bg-teal-600 border-none font-semibold rounded-lg px-8 py-2 h-auto text-base shadow-md mt-4 hover:bg-teal-700 transition duration-300"
                >
                    Đăng ký ngay
                </Button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-white font-sans">
            <Header />

            {/* Banner Section - Chương Trình & Ưu Đãi */}
            <div className="relative w-full h-[40vh] md:h-[55vh] overflow-hidden">
                <img
                    src="upload/670fcca6c07b92ed0fd3e005f02fc9be.jpg"
                    alt="Promotion Banner"
                    className="w-full h-full object-cover brightness-75"
                    onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x800/E8F2F0/54A99B?text=Spa+Promotion+Background"; }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
                    <div className="text-center text-white p-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
                            Ưu Đãi & Bộ Sưu Tập
                        </h1>

                        <p className="mt-2 md:mt-4 text-lg md:text-xl font-medium drop-shadow-lg">
                            Khám phá các chương trình khuyến mãi, bộ sưu tập mới và sự kiện thời trang nổi bật của chúng tôi
                        </p>

                    </div>
                </div>
            </div>

            {/* Bộ lọc và Tìm kiếm */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

                {/* Search Bar */}
                <div className="flex justify-center mb-8">
                    <div className="relative w-full max-w-xl">
                        <SearchOutlined className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm chương trình, khuyến mãi, sự kiện..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-12 border border-gray-300 rounded-full shadow-md focus:ring-teal-500 focus:border-teal-500 text-lg"
                        />
                    </div>
                </div>

                {/* Filter Tabs (Buttons) */}
                <div className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mb-12">
                    {filterOptions.map(filter => (
                        <button
                            key={filter.key}
                            onClick={() => setActiveFilter(filter.key)}
                            className={`
                                flex items-center py-2 px-4 sm:px-6 rounded-full text-base font-semibold transition-all duration-300 my-1
                                ${activeFilter === filter.key
                                    ? 'bg-teal-600 text-white shadow-md shadow-teal-300/50'
                                    : 'bg-white text-gray-600 border border-gray-300 hover:bg-teal-50 hover:text-teal-600'
                                }
                            `}
                        >
                            {filter.icon}
                            <span className="ml-2">{filter.label}</span>
                        </button>
                    ))}
                </div>

                {/* Tiêu đề danh sách và Số lượng */}
                <h2 className="text-3xl font-extrabold text-gray-800 mb-8">
                    Tất Cả Chương Trình
                </h2>
                <p className="text-lg text-gray-500 mb-8">
                    Tìm thấy {filteredPrograms.length} chương trình
                </p>

                {/* Grid Danh sách Chương trình */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPrograms.length > 0 ? (
                        filteredPrograms.map((program) => (
                            <ProgramCard key={program.id} program={program} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-xl text-gray-500">
                            Không tìm thấy chương trình nào phù hợp.
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PromotionsPage;