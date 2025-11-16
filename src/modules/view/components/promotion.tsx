import  { useState } from 'react';
import { Button } from 'antd';
import {  ClockCircleOutlined, SearchOutlined, TagOutlined, FireOutlined, GiftOutlined, CalendarOutlined, HeartOutlined } from '@ant-design/icons';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';


const allPrograms = [
    {
        id: 1,
        category: 'Khuyến Mãi',
        tags: ['Khuyến Mãi'],
        discountTag: '-50%',
        title: 'Khuyến Mãi Mừng Khai Trương - Giảm 50%',
        description: 'Chào mừng khách hàng mới với ưu đãi đặc biệt giảm giá 50% cho tất cả các dịch vụ massage trị liệu cao cấp...',
        duration: '90 phút',
        oldPrice: '1.000.000đ',
        newPrice: '500.000đ',
        img: 'public/upload/8af94b862c2b684d29bee575c59f9c81.jpg',
        color: 'bg-red-500',
    },
    {
        id: 2,
        category: 'Liệu Trình Mới',
        tags: ['Liệu Trình Mới', 'Mới'],
        title: 'Liệu Trình Trẻ Hóa Da Collagen 24K',
        description: 'Công nghệ chăm sóc da tiên tiến nhất với collagen vàng 24K, giúp làn da trẻ hóa, săn chắc và rạng rỡ. Liệu trình độc quyền.',
        duration: '120 phút',
        oldPrice: '3.000.000đ',
        newPrice: '2.500.000đ',
        img: 'public/upload/670fcca6c07b92ed0fd3e005f02fc9be.jpg',
        color: 'bg-teal-500',
    },
    {
        id: 3,
        category: 'Sự Kiện',
        tags: ['Sự Kiện'],
        title: 'Serenity Wellness Weekend - Cuối Tuần Thư Giãn',
        description: 'Tham gia sự kiện đặc biệt cuối tuần với các hoạt động yoga, thiền định, và trải nghiệm spa toàn diện, kết nối với thiên nhiên.',
        duration: '2 ngày',
        oldPrice: '',
        newPrice: '1.800.000đ',
        img: 'public/upload/95332035d47d4f05e4ab35c79bd8cde9.jpg',

        color: 'bg-purple-600',
    },
    {
        id: 4,
        category: 'Khuyến Mãi',
        tags: ['Khuyến Mãi'],
        discountTag: '-22%',
        title: 'Ưu Đãi Liệu Trình Trị Mụn Chuyên Sâu',
        description: 'Gói chăm sóc da chuyên sâu, loại bỏ mụn trứng cá và thâm, mang lại làn da mịn màng, tự tin.',
        duration: '60 phút',
        oldPrice: '1.200.000đ',
        newPrice: '936.000đ',
        img: 'public/upload/8714beed03fd62887b73582017df0bc0.jpg',
        color: 'bg-red-500',
    },
    {
        id: 5,
        category: 'Gói Dịch Vụ',
        tags: ['Gói Dịch Vụ', 'Mới'],
        discountTag: '-40%',
        title: 'Gói Combo Massage Toàn Thân & Detox',
        description: 'Liệu trình kết hợp massage thư giãn cơ thể và thải độc tố, giúp cơ thể khỏe mạnh, tràn đầy năng lượng.',
        duration: '120 phút',
        oldPrice: '2.500.000đ',
        newPrice: '1.500.000đ',
        img: 'public/upload/b4180f7148c7f688eb4e74fb26cc23d9.jpg',
        color: 'bg-green-600',
    },
    {
        id: 6,
        category: 'Liệu Trình Mới',
        tags: ['Liệu Trình Mới', 'Mới'],
        title: 'Liệu Trình Chăm Sóc Bà Bầu',
        description: 'Massage nhẹ nhàng, an toàn dành cho mẹ bầu, giúp giảm đau nhức, thư giãn tinh thần và giảm căng thẳng.',
        duration: '90 phút',
        oldPrice: '',
        newPrice: '850.000đ',
        img: 'public/upload/efbd042cf6a7b54937abae2e5fd49c4f.jpg',
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
        { key: 'Liệu Trình Mới', label: 'Liệu Trình Mới', icon: <TagOutlined /> },
        { key: 'Sự Kiện', label: 'Sự Kiện', icon: <CalendarOutlined /> },
        { key: 'Gói Dịch Vụ', label: 'Gói Dịch Vụ', icon: <GiftOutlined /> },
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
    const ProgramCard = ({ program} :ProgramCardProps) => (
        <div 
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 transition-transform duration-300 hover:shadow-2xl hover:scale-[1.02] relative"
        >
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={program.img} 
                    alt={program.title} 
                    className="w-full h-full object-cover" 
                    onError={(e:any) => { e.target.onerror = null; e.target.src = "public/upload/670fcca6c07b92ed0fd3e005f02fc9be.jpg"; }}
                />
                
                {/* Discount Tag */}
                {program.discountTag && (
                    <span className={`absolute top-0 left-0 text-white font-bold px-3 py-1 rounded-br-lg ${program.color}`}>
                        {program.discountTag}
                    </span>
                )}
                {/* Mới Tag */}
                {program.tags.includes('Mới') && (
                    <span className="absolute top-0 right-0 text-white font-bold bg-teal-500 px-3 py-1 rounded-bl-lg text-sm">
                        Mới
                    </span>
                )}
            </div>

            <div className="p-4 flex flex-col h-full">
                {/* Program Type */}
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md text-white ${program.color} opacity-90 self-start`}>
                    {program.category}
                </span>

                <h3 className="text-lg font-bold text-gray-800 mt-2">{program.title}</h3>
                <p className="text-gray-600 mt-1 text-sm leading-relaxed flex-grow line-clamp-3">{program.description}</p>
                
                <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex items-center text-teal-600 font-semibold text-sm">
                        {program.category === 'Sự Kiện' ? <CalendarOutlined className="mr-1" /> : <ClockCircleOutlined className="mr-1" />}
                        {program.duration}
                    </div>
                    <div className="text-right">
                        {program.oldPrice && (
                            <p className="text-xs text-gray-400 line-through">
                                {program.oldPrice}
                            </p>
                        )}
                        <p className="text-lg font-bold text-red-500">
                            {program.newPrice}
                        </p>
                    </div>
                </div>

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
                    src="public/upload/670fcca6c07b92ed0fd3e005f02fc9be.jpg" 
                    alt="Promotion Banner" 
                    className="w-full h-full object-cover brightness-75" 
                    onError={(e:any) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x800/E8F2F0/54A99B?text=Spa+Promotion+Background"; }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
                    <div className="text-center text-white p-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
                            Chương Trình & Ưu Đãi
                        </h1>
                        <p className="mt-2 md:mt-4 text-lg md:text-xl font-medium drop-shadow-lg">
                            Khám phá các liệu trình mới, chương trình khuyến mãi đặc biệt và sự kiện độc quyền tại spa của chúng tôi
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