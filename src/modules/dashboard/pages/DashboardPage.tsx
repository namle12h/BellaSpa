import React, { useState } from 'react';
import { ArrowDownToLine, ChevronDown, Filter } from "lucide-react";
import StatsChart from "../components/StatsChart";
import ServiceStats from "../components/ServiceStats";
import CustomerAnalysis from "../components/CustomerAnalysis";
import AppointmentStats from "../components/AppointmentStats";
import AdvancedFilters from "../components/AdvancedFilters"; // Giả định đã có
import { CheckCircleOutlined, DollarOutlined, ScheduleOutlined, UserAddOutlined } from '@ant-design/icons';
import PerformanceStatsCard from '../components/PerformanceStatsCard';
import RevenueAndServiceTrends from '../components/RevenueAndServiceTrends';
import PerformanceKPIs from '../components/PerformanceKPIs';
import RevenueAnalysis from '../components/RevenueAnalysis';
import { useOverviewStats } from '../../../shared/services/statsApi';
import dayjs, { Dayjs } from 'dayjs';

const tabs = [
  { id: 'overview', label: 'Tổng Quan' },
  { id: 'performance', label: 'Hiệu Suất' },
  { id: 'analysis', label: 'Phân Tích' },
];



// Tab Navigation Component
function TabNavigation({ children, activeTab, setActiveTab, startDate,
  endDate }: {
    children: React.ReactNode, activeTab: string, setActiveTab: (tab: string) => void, startDate: Dayjs,  // Thêm startDate vào kiểu props
    endDate: Dayjs
  }) {
    return (
    <div className="w-full">
      {/* NAVIGATION */}
      <div className="flex flex-wrap items-center border-b border-gray-200 mb-4 bg-white rounded-t-xl shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              px-4 py-3 text-sm font-medium transition-colors relative
              ${activeTab === tab.id ? "text-pink-600" : "text-gray-500 hover:text-gray-700"}
            `}
          >
            {tab.label}

            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-pink-600"></span>
            )}
          </button>
        ))}
      </div>

      {/* CONTENT */}
      <div className="p-0">
        {activeTab === "overview" && <div className="space-y-6">{children}</div>}
        {activeTab === "performance" && (
          <div className="space-y-6">
            <PerformanceStatsCard startDate={startDate} endDate={endDate} />
            <PerformanceKPIs />
            <RevenueAndServiceTrends mode="month" year={2025} />
          </div>
        )}
        {activeTab === "analysis" && (
          <div className="space-y-6">
            <RevenueAnalysis />
          </div>
        )}
      </div>
    </div>
  );
}



export default function DashboardPage() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 👈 State Tab mới

  // const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  // const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [startDate, setStartDate] = useState<Dayjs>(dayjs()); // Khởi tạo bằng dayjs
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [period] = useState("last_30_days");
  // const { data, isLoading } = useOverviewStats(startDate, endDate, period);
  //  const { data, isLoading } = useOverviewStats(startDate.format('YYYY-MM-DD'), endDate.format('YYYY-MM-DD'), period);
  const { data, isLoading } = useOverviewStats(
    startDate.format('YYYY-MM-DD'), // Định dạng ngày là YYYY-MM-DD
    endDate.format('YYYY-MM-DD'),   // Định dạng ngày là YYYY-MM-DD
    period
  );


  console.log("startDate:", startDate);
  console.log("endDate:", startDate);
  if (isLoading) return <div>Loading...</div>;

  const toggleFilters = () => {
    setIsFiltersVisible(!isFiltersVisible);
  };

  const handleDateChange = (newStartDate: Dayjs | null, newEndDate: Dayjs | null) => {
    // Nếu newStartDate là null, gán ngày hiện tại, nếu không thì giữ nguyên newStartDate
    setStartDate(newStartDate ?? dayjs());

    // Nếu newEndDate là null, gán ngày hiện tại, nếu không thì giữ nguyên newEndDate
    setEndDate(newEndDate ?? dayjs());
  };

  console.log(data);
  // Dữ liệu stats ĐÃ SỬA ĐỔI để khớp với thiết kế (màu sắc Icon và màu percent)
  const stats = [
    {
      title: "Doanh Thu Hôm Nay",
      value: data?.revenue ? `${data.revenue.toLocaleString()}₫` : "0₫",  // Dùng data từ API cho Doanh Thu
      iconBg: "bg-green-500",
      percent: data?.revenueComparisonPercent
        ? `${data.revenueComparisonPercent}% so với hôm qua`
        : "0% so với hôm qua", // Tính phần trăm so với hôm qua
      icon: <DollarOutlined />,
      percentColor: data?.revenueComparisonPercent > 0 ? "text-green-600" : "text-red-600", // Xử lý màu phần trăm
      iconColor: "bg-green-500",
    },
    {
      title: "Lịch Hẹn Hôm Nay",
      value: data?.appointments ? data.appointments : 0, // Số cuộc hẹn
      iconBg: "bg-blue-500",
      percent: data?.appointmentsComparisonPercent
        ? `${data.appointmentsComparisonPercent}% so với hôm qua`
        : "0% so với hôm qua",
      icon: <ScheduleOutlined />,
      percentColor: data?.appointmentsComparisonPercent > 0 ? "text-green-600" : "text-red-600",
      iconColor: "bg-blue-500",
    },
    {
      title: "Khách Hàng Mới",
      value: data?.newCustomers ? data.newCustomers : 0, // Số khách hàng mới
      iconBg: "bg-purple-500",
      percent: data?.newCustomersComparisonPercent
        ? `${data.newCustomersComparisonPercent}% so với hôm qua`
        : "0% so với hôm qua",
      icon: <UserAddOutlined />,
      percentColor: data?.newCustomersComparisonPercent > 0 ? "text-green-600" : "text-red-600",
      iconColor: "bg-purple-500",
    },
    {
      title: "Tỷ Lệ Hoàn Thành",
      value: data?.completionRate ? `${data.completionRate}%` : "0%", // Tỷ lệ hoàn thành
      iconBg: "bg-teal-500",
      percent: data?.completionRateComparisonPercent
        ? `${data.completionRateComparisonPercent}% so với hôm qua`
        : "0% so với hôm qua",
      icon: <CheckCircleOutlined />,
      percentColor: data?.completionRateComparisonPercent > 0 ? "text-green-600" : "text-red-600",
      iconColor: "bg-teal-500",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-pink-50 p-3 sm:p-6">
      {/* HEADER */}
      <div className="bg-white p-4 rounded-xl shadow-lg mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Thống Kê Spa</h2>
          <p className="text-gray-500">Tổng quan hiệu suất và doanh thu</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <select className="p-2 border border-gray-300 rounded-lg text-sm pr-8 appearance-none bg-white shadow-sm">
              <option>30 ngày qua</option>
              <option>7 ngày qua</option>
              <option>Hôm nay</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <button
            onClick={toggleFilters}
            className={`flex items-center px-4 py-2 text-sm font-semibold rounded-lg shadow-sm border transition-colors
              ${isFiltersVisible ? "bg-pink-600 text-white" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            <Filter className="w-4 h-4 mr-2" />
            Bộ lọc
          </button>

          <button className="bg-pink-600 text-white px-4 py-2 rounded-lg shadow hover:bg-pink-700 flex items-center gap-2">
            <ArrowDownToLine className="w-4 h-4" />
            Xuất báo cáo
          </button>
        </div>
      </div>

      {/* FILTER */}
      {isFiltersVisible && (
        <div className="mb-6">
          <AdvancedFilters startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />
        </div>
      )}

      {/* CONTENT WITH TABS */}
      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} startDate={startDate} endDate={endDate}>
        {/* OVERVIEW CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((item, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow border border-gray-100 flex justify-between">
              <div>
                <p className="text-sm text-gray-500">{item.title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-2">{item.value}</h3>
                <p className={`text-xs font-semibold mt-1 ${item.percentColor}`}>{item.percent}</p>
              </div>

              <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white text-xl ${item.iconColor}`}>
                {item.icon}
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="mt-6 space-y-6">
          {/* Biểu đồ lớn + Pie */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <StatsChart mode="month" year={2025} />
            </div>
            <div className="lg:col-span-1">
              <ServiceStats startDate={startDate} endDate={endDate} />
            </div>
          </div>

          {/* Analysis Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CustomerAnalysis startDate={startDate} endDate={endDate} />
            <AppointmentStats startDate={startDate} endDate={endDate} />
          </div>
        </div>
      </TabNavigation>
    </div>
  );
}