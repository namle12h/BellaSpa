import {
  User,
  Lock,
  List,
  MapPin,
  Bell,
  LogOut,
  ShoppingCart,
  Calendar,
  X,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Sidebar({ isOpen, onClose }: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const [openOrders, setOpenOrders] = useState(false);

  const menu = [
    { icon: <User size={18} />, label: "Thông tin cá nhân", path: "/profile/info" },
    { icon: <Lock size={18} />, label: "Đổi mật khẩu", path: "/profile/password" },
    {
      icon: <List size={18} />,
      label: "Lịch sử đơn hàng",
      children: [
        { icon: <ShoppingCart size={16} />, label: "Đơn hàng sản phẩm", path: "/profile/products" },
        { icon: <Calendar size={16} />, label: "Đơn hàng dịch vụ", path: "/profile/orders" },
      ],
    },
    { icon: <MapPin size={18} />, label: "Địa chỉ giao hàng", path: "/profile/address" },
    { icon: <Bell size={18} />, label: "Cài đặt thông báo", path: "/profile/notifications" },
    { icon: <LogOut size={18} />, label: "Đăng xuất", path: "/logout" },
  ];

  const handleClick = (item: any) => {
    if (item.label === "Đăng xuất") {
      localStorage.clear();
      navigate("/");
      return;
    }

    if (item.children) {
      setOpenOrders(!openOrders);
      return;
    }

    navigate(item.path);
    onClose && onClose(); // auto close sidebar on mobile
  };

  return (
    <>
      {/* Overlay chỉ xuất hiện trên mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-white shadow-xl z-50
          w-64 p-4 rounded-r-2xl transform transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:rounded-r-2xl
        `}
      >
        {/* Close button (mobile only) */}
        <button
          className="md:hidden absolute top-3 right-3 p-1"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-lg font-semibold mb-4 mt-6 md:mt-0">
          Tài khoản của tôi
        </h2>

        <nav className="space-y-1">
          {menu.map((item, i) => (
            <div key={i}>
              <button
                onClick={() => handleClick(item)}
                className={`w-full flex items-center justify-between px-4 py-2 rounded-md text-left transition-all
                  ${location.pathname === item.path
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }
                `}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  {item.label}
                </div>
                {item.children && (
                  <span className="text-xs">{openOrders ? "▲" : "▼"}</span>
                )}
              </button>

              {/* SUBMENU */}
              {item.children && openOrders && (
                <div className="ml-8 mt-1 space-y-1 animate-fadeIn">
                  {item.children.map((child, j) => (
                    <button
                      key={j}
                      onClick={() => {
                        navigate(child.path);
                        onClose && onClose();
                      }}
                      className={`
                        w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-left text-sm transition-all
                        ${location.pathname === child.path
                            ? "bg-blue-100 text-blue-600 font-medium"
                            : "hover:bg-gray-50 text-gray-700"
                        }
                      `}
                    >
                      {child.icon}
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
