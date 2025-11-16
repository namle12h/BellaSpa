import { useState } from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { UserOutlined, DollarOutlined, ScheduleOutlined, SmileOutlined } from '@ant-design/icons'; // Sử dụng Ant Design Icons cho khối chính
import { CustomerOverviewCard, RecentCustomersCard, ServiceStatsCard } from './CustomerOverviewCard';
import { useCategoryStats } from '../../../shared/services/statsApi';


// ===================================================
// I. CẤU TRÚC DỮ LIỆU ĐA LOẠI
// ===================================================

const convertApiToDataset = (apiData: any) => {
    const mapPeriod = (p: any) => ({
        period: "",
        currentValue: p.current.toLocaleString("vi-VN"),
        prevValue: p.previous.toLocaleString("vi-VN"),
        changePercent: p.changePercent,
        isUp: p.up,
        changeAmount: Math.abs(p.current - p.previous)
    });

    return {
        revenue: {
            title: "Doanh thu",
            icon: <DollarOutlined className="w-4 h-4" />,
            iconColor: "bg-teal-500",
            unit: "₫",
            trendCards: [
                { ...mapPeriod(apiData.revenue.today), period: "Hôm nay" },
                { ...mapPeriod(apiData.revenue.week), period: "Tuần này" },
                { ...mapPeriod(apiData.revenue.month), period: "Tháng này" },
                { ...mapPeriod(apiData.revenue.quarter), period: "Quý này" }
            ],
            detailComparison: [
                { ...mapPeriod(apiData.revenue.today), period: "Hôm nay" },
                { ...mapPeriod(apiData.revenue.week), period: "Tuần này" },
                { ...mapPeriod(apiData.revenue.month), period: "Tháng này" },
                { ...mapPeriod(apiData.revenue.quarter), period: "Quý này" }
            ]
        },

        customer: {
            title: "Khách hàng",
            icon: <UserOutlined className="w-4 h-4" />,
            iconColor: "bg-green-500",
            unit: "",
            trendCards: [
                { ...mapPeriod(apiData.customer.today), period: "Hôm nay" },
                { ...mapPeriod(apiData.customer.week), period: "Tuần này" },
                { ...mapPeriod(apiData.customer.month), period: "Tháng này" },
                { ...mapPeriod(apiData.customer.quarter), period: "Quý này" }
            ],
            detailComparison: [
                { ...mapPeriod(apiData.customer.today), period: "Hôm nay" },
                { ...mapPeriod(apiData.customer.week), period: "Tuần này" },
                { ...mapPeriod(apiData.customer.month), period: "Tháng này" },
                { ...mapPeriod(apiData.customer.quarter), period: "Quý này" }
            ]
        },

        appointment: {
            title: "Lịch hẹn",
            icon: <ScheduleOutlined className="w-4 h-4" />,
            iconColor: "bg-blue-500",
            unit: "",
            trendCards: [
                { ...mapPeriod(apiData.appointment.today), period: "Hôm nay" },
                { ...mapPeriod(apiData.appointment.week), period: "Tuần này" },
                { ...mapPeriod(apiData.appointment.month), period: "Tháng này" },
                { ...mapPeriod(apiData.appointment.quarter), period: "Quý này" }
            ],
            detailComparison: [
                { ...mapPeriod(apiData.appointment.today), period: "Hôm nay" },
                { ...mapPeriod(apiData.appointment.week), period: "Tuần này" },
                { ...mapPeriod(apiData.appointment.month), period: "Tháng này" },
                { ...mapPeriod(apiData.appointment.quarter), period: "Quý này" }
            ]
        },

        product: {
            title: "Sản phẩm",
            icon: <SmileOutlined className="w-4 h-4" />,
            iconColor: "bg-purple-500",
            unit: "₫",
            trendCards: [
                { ...mapPeriod(apiData.product.today), period: "Hôm nay" },
                { ...mapPeriod(apiData.product.week), period: "Tuần này" },
                { ...mapPeriod(apiData.product.month), period: "Tháng này" },
                { ...mapPeriod(apiData.product.quarter), period: "Quý này" }
            ],
            detailComparison: [
                { ...mapPeriod(apiData.product.today), period: "Hôm nay" },
                { ...mapPeriod(apiData.product.week), period: "Tuần này" },
                { ...mapPeriod(apiData.product.month), period: "Tháng này" },
                { ...mapPeriod(apiData.product.quarter), period: "Quý này" }
            ]
        }
    };
};


interface TrendCardItem {
    period: string;
    currentValue: string;
    prevValue: string;
    changePercent: number; // 7.5, 14.2, v.v.
    isUp: boolean;
    changeAmount: number; // Chỉ dùng cho khối chi tiết
}




// ===================================================
// COMPONENT PHỤ: THẺ XU HƯỚNG
// ===================================================

const TrendCard = ({ item }: { item: TrendCardItem }) => {



    const changeColor = item.isUp ? 'text-green-600' : 'text-red-500';
    const arrowIcon = item.isUp ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />;

    return (
        <div className="bg-white p-4 sm:p-5 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-2">
                <p className="text-xs sm:text-sm font-semibold text-gray-800">{item.period}</p>
                <span className={`flex items-center text-[11px] sm:text-xs font-semibold ${changeColor}`}>
                    {arrowIcon}
                    <span className="ml-1">{item.changePercent}%</span>
                </span>
            </div>
            <h4 className="text-lg sm:text-2xl font-bold text-gray-900 mb-1">
                {item.currentValue}
            </h4>
            <p className="text-[11px] sm:text-xs text-gray-500">
                Trước: {item.prevValue}
            </p>
        </div>
    );
};


const RevenueComparisonBlock = ({ dataCategory, setDataCategory, categoryOptions, analysisDatasets }: any) => {

    const data = analysisDatasets[dataCategory];

    if (!data) return null;

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center text-left space-x-3">
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${data.iconColor}`}>
                        {data.icon}
                    </span>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800">{data.title}</h3>
                        <p className="text-sm text-gray-500">Phân tích xu hướng và so sánh</p>
                    </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <select
                        className="border rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 bg-white shadow-sm"
                        value={dataCategory}
                        onChange={(e) => setDataCategory(e.target.value as 'revenue' | 'customer' | 'appointment' | 'product')}
                    >
                        {categoryOptions.map((option: any) => (
                            <option key={option.key} value={option.key}>{option.label}</option>
                        ))}
                    </select>


                </div>


            </div>

            {/* Hàng Thẻ Xu hướng (Hôm nay, Tuần, Tháng, Quý) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 text-left">
                {data.trendCards.map((item: TrendCardItem, index: number) => (
                    <TrendCard key={index} item={item} />
                ))}

            </div>

            {/* Khối Chi tiết So sánh */}
            <div className="mt-8 border-t text-left pt-4">
                <h4 className="text-lg font-semibold  text-gray-800 mb-4">Chi Tiết So Sánh</h4>

                {data.detailComparison.map((item: TrendCardItem, index: number) => {
                    const changeColor = item.isUp ? 'text-green-600 bg-green-50' : 'text-red-500 bg-red-50';

                    return (
                        <div key={index} className="flex justify-between items-center py-3 border-b last:border-b-0 border-gray-100">

                            <div className="flex-1">
                                <p className="font-medium text-gray-900">{item.period}</p>
                                <p className="text-sm text-gray-500">{item.currentValue} vs {item.prevValue}</p>
                            </div>

                            <div className="text-right">
                                {/* Hiển thị Số lượng thay đổi (dùng changeAmount) */}
                                <p className={`font-semibold ${item.isUp ? 'text-green-600' : 'text-red-500'}`}>
                                    {item.isUp ? '+' : '-'}
                                    {item.changeAmount}
                                    {data.unit}
                                </p>
                                {/* Hiển thị Phần trăm thay đổi */}
                                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${changeColor}`}>
                                    {item.isUp ? '+' : ''}
                                    {item.changePercent}%
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Nhận xét tự động */}
            <div className="mt-6 p-4 text-left bg-blue-50/50 rounded-lg border border-blue-100">
                <h5 className="font-semibold text-blue-700 mb-2">Nhận Xét Tự Động</h5>
                <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                    <li>{data.title} tăng trưởng ổn định qua các kỳ.</li>
                    <li>Tăng trưởng mạnh nhất ở quý này ({data.trendCards[3].isUp ? '+' : '-'}{data.trendCards[3].changePercent}% ).</li>
                    <li>Xu hướng tích cực, dự kiến tiếp tục tăng.</li>
                </ul>
            </div>
        </div>
    );
};



export default function RevenueAnalysis() {
    // State để chọn loại dữ liệu, mặc định là 'customer' theo hình ảnh mới
    const [dataCategory, setDataCategory] = useState<'revenue' | 'customer' | 'appointment' | 'product'>('customer');

    const { data, isLoading } = useCategoryStats();
    if (isLoading) return <div>Loading...</div>;
    const analysisDatasets = convertApiToDataset(data);

    // Tùy chọn Dropdown
    const categoryOptions = [
        { key: 'customer', label: 'Khách hàng' },
        { key: 'revenue', label: 'Doanh thu' },
        { key: 'appointment', label: 'Lịch hẹn' },
        { key: 'product', label: 'Sản Phẩm' },
    ];

    return (
        <div >
            <RevenueComparisonBlock
                dataCategory={dataCategory}
                setDataCategory={setDataCategory}
                categoryOptions={categoryOptions}
                analysisDatasets={analysisDatasets}
            />
            <div className="grid mt-7 lg:grid-cols-3 gap-6 ">
                <div className="lg:col-span-2 space-y-6 h-full">
                    <CustomerOverviewCard />
                    <RecentCustomersCard />
                </div>

                <div className="lg:col-span-1 h-full">
                    <ServiceStatsCard />
                </div>
            </div>

        </div>

    );
}