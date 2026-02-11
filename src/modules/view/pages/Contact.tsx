import { useState } from 'react';
import { Button } from 'antd';
import { EnvironmentOutlined, PhoneOutlined, MailOutlined, ClockCircleOutlined } from '@ant-design/icons';
import Footer from '../../../shared/components/Footer';
import Header from '../../../shared/components/Header';

const ContactInfoSection = () => (
    <div className="md:w-5/12 space-y-8">
        <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">Thông tin liên hệ</h3>

        {/* Địa chỉ */}
        <div className="flex items-start space-x-4">
            <EnvironmentOutlined className="text-teal-600 text-xl mt-1" />
            <div>
                <p className="font-semibold text-lg text-gray-700">Địa chỉ</p>
                <p className="text-gray-600">08 Đường Số 16, Phường Bình Hưng Hòa, Quận Bình Tân, TP. Hồ Chí Minh</p>
            </div>
        </div>

        {/* Điện thoại */}
        <div className="flex items-start space-x-4">
            <PhoneOutlined className="text-teal-600 text-xl mt-1" />
            <div>
                <p className="font-semibold text-lg text-gray-700">Điện thoại</p>
                <p className="text-gray-600">+84 964 980 259</p>
            </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4">
            <MailOutlined className="text-teal-600 text-xl mt-1" />
            <div>
                <p className="font-semibold text-lg text-gray-700">Email</p>
                <p className="text-gray-600">lienhe@thaosusi.com</p>
            </div>
        </div>

        {/* Giờ mở cửa */}
        <div className="flex items-start space-x-4">
            <ClockCircleOutlined className="text-teal-600 text-xl mt-1" />
            <div>
                <p className="font-semibold text-lg text-gray-700">Giờ mở cửa</p>
                <p className="text-gray-600">Thứ 2 - Thứ 6: 9:00 - 20:00</p>
                <p className="text-gray-600">Thứ 7 - Chủ nhật: 8:00 - 21:00</p>
            </div>
        </div>

        <div className="pt-4">
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-3 mb-6">Bản đồ</h3>
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200">
                {/* Nhúng bản đồ Google Maps bằng iframe */}
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3704641779546!2d106.69983691527778!3d10.762622662005968!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f28720e8c9f%3A0xd4cf6fa4b5e57d07!2zMTIzIFjhu5FjIFThur9uZyBIdXQgdGhlb3RyaW5lcywgUC4xLCBUcC5ITQ!5e0!3m2!1sen!2s!4v1649752811713!5m2!1sen!2s"
                    width="100%"
                    height="400"
                    style={{ border: "0" }}
                    // allowFullScreen=""
                    loading="lazy"
                    title="Serenity Spa Map"
                ></iframe>
            </div>
            <a href="https://www.google.com/maps?q=123%20Đường%20Nguyễn%20Huệ,%20Quận%201,%20TP.HCM" className="text-teal-600 font-medium mt-2 block hover:underline" target="_blank" rel="noopener noreferrer">View larger map</a>
        </div>

    </div>
);

/**
 * Section: Form Đặt lịch/Tư vấn (Cột Phải)
 */
const ContactFormSection = () => {
    const [activeFormTab, setActiveFormTab] = useState('appointment'); // 'appointment' hoặc 'contact'

    // Form cho Đặt lịch hẹn
    const AppointmentForm = () => (
        <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Họ và tên */}
                <div>
                    <input type="text" placeholder="Nhập họ và tên" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
                </div>
                {/* Số điện thoại */}
                <div>
                    <input type="tel" placeholder="Nhập số điện thoại" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
                </div>
            </div>

            {/* Email */}
            <div>
                <input type="email" placeholder="Nhập địa chỉ email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>

            {/* Dịch vụ */}
            <div>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-gray-500" required>
                    <option value="">Chọn dịch vụ *</option>
                    <option value="massage">Massage trị liệu</option>
                    <option value="facial">Chăm sóc da mặt</option>
                    <option value="yoga">Yoga & Thiền</option>
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Ngày */}
                <div>
                    <input type="date" placeholder="dd/mm/yyyy" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-gray-500" required />
                </div>
                {/* Giờ */}
                <div>
                    <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-gray-500" required>
                        <option value="">Chọn giờ *</option>
                        <option value="9:00">9:00</option>
                        <option value="10:00">10:00</option>
                        <option value="14:00">14:00</option>
                    </select>
                </div>
            </div>

            {/* Ghi chú */}
            <div>
                <textarea placeholder="Nhập ghi chú hoặc yêu cầu đặc biệt (tối đa 500 ký tự)" rows={4} maxLength={500} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 resize-none"></textarea>
                <p className="text-right text-sm text-gray-500 mt-1">0/500 ký tự</p>
            </div>

            {/* Button */}
            <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full bg-teal-600 border-none font-semibold rounded-lg px-8 py-3 h-auto text-lg shadow-md hover:bg-teal-700 transition duration-300"
            >
                Đặt lịch hẹn
            </Button>
        </form>
    );

    // Form cho Liên hệ tư vấn (Giả định đơn giản hơn)
    const ContactForm = () => (
        <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Họ và tên */}
                <div>
                    <input type="text" placeholder="Nhập họ và tên" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
                </div>
                {/* Số điện thoại */}
                <div>
                    <input type="tel" placeholder="Nhập số điện thoại" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
                </div>
            </div>

            {/* Email */}
            <div>
                <input type="email" placeholder="Nhập địa chỉ email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500" required />
            </div>

            {/* Nội dung liên hệ */}
            <div>
                <textarea placeholder="Nội dung liên hệ" rows={6} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 resize-none" required></textarea>
            </div>

            {/* Button */}
            <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="w-full bg-teal-600 border-none font-semibold rounded-lg px-8 py-3 h-auto text-lg shadow-md hover:bg-teal-700 transition duration-300"
            >
                Gửi yêu cầu
            </Button>
        </form>
    );

    return (
        <div className="md:w-7/12 bg-white p-6 md:p-10 rounded-xl shadow-xl">
            {/* Tab navigation */}
            <div className="flex space-x-2 border-b border-gray-200 mb-6">
                <button
                    onClick={() => setActiveFormTab('appointment')}
                    className={`
                        py-2 px-6 font-semibold transition-all duration-300 rounded-t-lg
                        ${activeFormTab === 'appointment'
                            ? 'text-teal-600 border-b-4 border-teal-600'
                            : 'text-gray-500 hover:text-teal-600'
                        }
                    `}
                >
                    Đặt lịch hẹn
                </button>
                <button
                    onClick={() => setActiveFormTab('contact')}
                    className={`
                        py-2 px-6 font-semibold transition-all duration-300 rounded-t-lg
                        ${activeFormTab === 'contact'
                            ? 'text-teal-600 border-b-4 border-teal-600'
                            : 'text-gray-500 hover:text-teal-600'
                        }
                    `}
                >
                    Liên hệ tư vấn
                </button>
            </div>

            {/* Tab Content */}
            <div>
                {activeFormTab === 'appointment' && <AppointmentForm />}
                {activeFormTab === 'contact' && <ContactForm />}
            </div>
        </div>
    );
};


/**
 * MAIN PAGE COMPONENT
 */
const ContactPage = () => {
    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Header />

            {/* Banner Section - Liên hệ với chúng tôi */}
            <div className="relative w-full h-[35vh] md:h-[45vh] overflow-hidden">
                <img
                    src="upload/contact.jpg"
                    alt="Serenity Spa Contact Banner"
                    className="w-full h-full object-cover brightness-75"
                    onError={(e: any) => { e.target.onerror = null; e.target.src = "https://placehold.co/1920x600/D0D8D5/54A99B?text=Spa+Reception+Desk"; }}
                />

                {/* Lớp phủ văn bản */}
                <div className="absolute inset-0 flex items-center justify-center bg-opacity-30">
                    <div className="text-center text-white p-4">
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight drop-shadow-lg">
                            Liên hệ với chúng tôi
                        </h1>
                        <p className="mt-2 md:mt-4 text-lg md:text-xl font-medium drop-shadow-lg">
                            Khám phá bộ sưu tập mới và liên hệ ngay để được tư vấn phong cách thời trang phù hợp với bạn.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Content: Info + Form */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-24 z-10 relative">
                <div className="bg-white p-6 md:p-12 rounded-xl shadow-2xl border-t-8 border-teal-600 flex flex-col md:flex-row gap-12">

                    {/* Cột trái: Thông tin liên hệ và Bản đồ */}
                    <ContactInfoSection />

                    {/* Cột phải: Form Đặt lịch/Tư vấn */}
                    <ContactFormSection />
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ContactPage;
