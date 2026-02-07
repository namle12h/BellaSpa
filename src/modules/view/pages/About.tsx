import { useState } from 'react';

import { StarOutlined, HeartOutlined, CheckCircleOutlined, SafetyCertificateOutlined, UserAddOutlined } from '@ant-design/icons';
import Header from '../../../shared/components/Header';
import Footer from '../../../shared/components/Footer';
import { ExpertTeamSection } from '../components/ExperTeamSection';






interface TabContentProps {
    tabKey: string;
}

const SerenitySpa = () => {
    const tabs = [
        { key: 'story', label: 'Câu chuyện' },
        { key: 'mission', label: 'Sứ mệnh' },
        { key: 'values', label: 'Giá trị' },
    ];

    const [activeTab, setActiveTab] = useState<string>('story');

    const TabContent = ({ tabKey }: TabContentProps) => {
        if (tabKey === 'story') {
            return (
                <div className="bg-white p-6 md:p-12 rounded-xl shadow-lg mt-6 max-w-6xl mx-auto border border-gray-100">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12">

                        <div className="space-y-6 md:w-1/2 text-center md:text-left order-2 md:order-1">
                            <h2 className="text-4xl font-extrabold text-gray-800">Câu chuyện của chúng tôi</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Chúng tôi bắt đầu hành trình thời trang với một niềm tin giản dị:
quần áo không chỉ để mặc, mà còn để thể hiện con người bạn.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Ra đời từ niềm đam mê với thiết kế và chất liệu, thương hiệu được xây dựng với mong muốn mang đến những sản phẩm thời trang hiện đại, dễ ứng dụng trong đời sống hằng ngày nhưng vẫn giữ được nét tinh tế và cá tính riêng. 
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Chúng tôi tin rằng thời trang đẹp nhất là khi bạn cảm thấy thoải mái và tự tin là chính mình.
                            </p>
                        </div>

                        {/* Hình ảnh (phải/dưới) - Bắt chước hiệu ứng khung viền và ánh sáng ấm áp */}
                        <div className="md:w-1/2 w-full  order-1 md:order-2">
                            <img
                                src="upload/about.jpg"
                                alt="Phòng thư giãn Serenity Spa"
                                className="w-full h-auto rounded-xl shadow-2xl border-4 border-white object-cover transform hover:scale-[1.01] transition-transform duration-300"
                            />
                        </div>
                    </div>
                </div>
            );
        }

        // Nội dung cho Tab "Sứ mệnh"
        if (tabKey === 'mission') {
            return (
                <div className="bg-white p-6 md:p-12 rounded-xl shadow-lg mt-6 max-w-6xl mx-auto border border-gray-100">
                    <h2 className="text-4xl font-extrabold text-gray-800 text-center">Sứ mệnh của chúng tôi</h2>
                    <p className="text-xl text-gray-600 leading-relaxed mt-6 mb-10 text-center max-w-3xl mx-auto">
                        Mang đến trải nghiệm thời trang hiện đại và tinh tế, giúp khách hàng tự tin thể hiện phong cách cá nhân trong nhịp sống hiện đại
                    </p>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="flex flex-col items-center text-center p-4">
                            <StarOutlined className="text-teal-600 text-4xl mb-3 p-3 bg-teal-50 rounded-full shadow-md" />
                            <h3 className="text-3xl font-bold text-gray-800">5000+</h3>
                            <p className="text-base text-gray-500 mt-1">Khách hàng hài lòng</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-4">
                            <UserAddOutlined className="text-teal-600 text-4xl mb-3 p-3 bg-teal-50 rounded-full shadow-md" />
                            <h3 className="text-3xl font-bold text-gray-800">15+</h3>
                            <p className="text-base text-gray-500 mt-1">Năm kinh nghiệm</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-4">
                            <SafetyCertificateOutlined className="text-teal-600 text-4xl mb-3 p-3 bg-teal-50 rounded-full shadow-md" />
                            <h3 className="text-3xl font-bold text-gray-800">500+</h3>
                            <p className="text-base text-gray-500 mt-1">Sản phẩm thời trang hot trend</p>
                        </div>

                        <div className="flex flex-col items-center text-center p-4">
                            <CheckCircleOutlined className="text-teal-600 text-4xl mb-3 p-3 bg-teal-50 rounded-full shadow-md" />
                            <h3 className="text-3xl font-bold text-gray-800">98%</h3>
                            <p className="text-base text-gray-500 mt-1">Tỷ lệ hài lòng</p>
                        </div>
                    </div>
                </div>
            );
        }

        // Nội dung cho Tab "Giá trị"
        if (tabKey === 'values') {
            return (
                <div className="bg-white p-6 md:p-12 rounded-xl shadow-lg mt-6 max-w-6xl mx-auto border border-gray-100">
                    <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">Giá trị cốt lõi</h2>

                    {/* Lưới giá trị 2 cột, responsive thành 1 cột trên di động */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="flex items-start bg-pink-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                            <HeartOutlined className="text-pink-500 text-4xl mr-5 mt-1" />
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800">Lấy khách hàng làm trung tâm</h3>
                                <p className="text-base text-gray-600 mt-1">
                                    Chúng tôi luôn lắng nghe và thấu hiểu nhu cầu của khách hàng để mang đến những sản phẩm phù hợp, dễ mặc và đáp ứng đúng phong cách cá nhân.
                                    </p>
                            </div>
                        </div>

                        <div className="flex items-start bg-yellow-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                            <StarOutlined className="text-yellow-500 text-4xl mr-5 mt-1" />
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800">Chất lượng là ưu tiên hàng đầu</h3>
                                <p className="text-base text-gray-600 mt-1">Mỗi sản phẩm được chọn lọc kỹ lưỡng từ chất liệu, phom dáng đến đường may, đảm bảo sự thoải mái, bền bỉ và tính thẩm mỹ lâu dài.</p>
                            </div>
                        </div>

                        <div className="flex items-start bg-teal-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                            <CheckCircleOutlined className="text-teal-600 text-4xl mr-5 mt-1" />
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800">Tinh tế & Ứng dụng cao</h3>
                                <p className="text-base text-gray-600 mt-1">Thiết kế hướng đến sự tối giản, dễ phối và phù hợp với nhiều hoàn cảnh trong cuộc sống hằng ngày.</p>
                            </div>
                        </div>

                        <div className="flex items-start bg-blue-50 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                            <SafetyCertificateOutlined className="text-blue-700 text-4xl mr-5 mt-1" />
                            <div>
                                <h3 className="text-2xl font-semibold text-gray-800">Uy tín & Trách nhiệm</h3>
                                <p className="text-base text-gray-600 mt-1">
                                    Chúng tôi xây dựng thương hiệu dựa trên sự minh bạch, cam kết rõ ràng về sản phẩm và dịch vụ, đồng hành lâu dài cùng khách hàng.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />

            {/* Banner Section - Tái tạo giao diện đầu trang */}
            <div className="relative w-full h-[45vh] md:h-[60vh] overflow-hidden">
                {/* Hình nền (dùng placeholder thay cho ảnh local) */}
                <img
                    src="upload/about.jpg"
                    alt="Serenity Spa Banner"
                    className="w-full h-full object-cover brightness-75"
                    onError={(e: any) => { e.target.onerror = null; e.target.src = "upload/about.jpg"; }}
                />

                {/* Lớp phủ văn bản */}
                <div className="absolute inset-0 flex items-center justify-center  bg-opacity-10">
                    <div className="text-center text-white p-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
                            Về Thảo Susi Store
                        </h1>
                        <p className="mt-2 md:mt-4 text-lg md:text-xl font-medium drop-shadow-lg">
                            Nơi giao thoa giữa nghệ thuật và phong cách
                        </p>
                    </div>
                </div>
            </div>

            {/* Điều hướng Tabs Tùy chỉnh (Đảm bảo khớp phong cách "teal pill") */}
            <div className="w-full -mt-8 md:-mt-12 z-10 relative">
                <div className="flex justify-center space-x-2 md:space-x-4 p-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`
                                py-2 px-6 md:px-8 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg border border-gray-100
                                ${activeTab === tab.key
                                    ? 'bg-teal-500 text-white shadow-teal-300/60' // Active: Màu teal pill
                                    : 'bg-white text-gray-700 hover:bg-gray-100' // Inactive: Màu trắng
                                }
                            `}
                            aria-selected={activeTab === tab.key}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Nội dung Tabs */}
            <div className="mt-8 px-4 md:px-8 pb-12">
                <TabContent tabKey={activeTab} />
                <ExpertTeamSection />

            </div>


            <Footer />
        </div>
    );
};

export default SerenitySpa;