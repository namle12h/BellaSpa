import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";
import Sidebar from "../components/SideBar";
import { Select } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { Option } = Select;
  const profileMenu = [
    { label: "Thông tin cá nhân", path: "/profile/info" },
    { label: "Đổi mật khẩu", path: "/profile/password" },
    { label: "Lịch sử đơn hàng", path: "/profile/orders" },
    { label: "Lịch sử sản phẩm", path: "/profile/products" },
    { label: "Địa chỉ giao hàng", path: "/profile/address" },
    { label: "Cài đặt thông báo", path: "/profile/notifications" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex flex-1 justify-center py-20 px-3">
        <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-sm w-full md:w-[90%] max-w-6xl overflow-hidden">

          {/* Sidebar chỉ hiện trên desktop */}
          <aside className="hidden md:block w-72 bg-white p-10 ">
            <Sidebar />
          </aside>

          {/* MOBILE DROPDOWN */}
          <div className="md:hidden px-4 pt-6">
            <Select
              value={
                profileMenu.find((m) => location.pathname.startsWith(m.path))?.path ||
                "/profile/info"
              }
              onChange={(value) => navigate(value)}
              className="w-full"
              size="large"
              dropdownStyle={{
                borderRadius: "12px",
                padding: "8px",
              }}
            >
              {profileMenu.map((item) => (
                <Option key={item.path} value={item.path}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>

          <section className="flex-1 p-6 md:p-10">
            <Outlet />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
