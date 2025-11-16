import { Menu, Input, Button, Dropdown, Badge } from "antd";
import { BellOutlined, SearchOutlined, ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { MdSpa } from "react-icons/md";
import UserInfo from "./UserInfo";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { useServices } from "../services/serviceApi";
import { useEffect, useRef, useState } from "react";
import NotificationPanel from "./NotificationPanel";
import { getNotifications } from "../services/notificationApi";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { data: services = [] } = useServices(1, 10);

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false); // Để mở/đóng menu trên di động
  const [openServiceMenu, setOpenServiceMenu] = useState(false);
  const notificationSound = useRef(new Audio("/sounds/news-ting-6832.mp3"));
  const prevLatestId = useRef<number | null>(null);
  const firstLoad = useRef(true);
  const { cart } = useCart();

  // 🧠 Fetch thông báo
  const fetchNotifications = async () => {
    if (!user?.id) return;
    try {
      const data = await getNotifications(user.id);
      const normalized = (data || []).map((n: any) => ({
        ...n,
        read: n.read ?? n.Read ?? n.isRead ?? false,
        updatedAt: n.updatedAt || n.createdAt || new Date().toISOString(),
      }));

      const sorted = normalized.sort(
        (a: any, b: any) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      setNotifications(sorted);
      setUnreadCount(sorted.filter((n: any) => !n.read).length);

      const latestId = sorted[0]?.id;

      if (firstLoad.current) {
        firstLoad.current = false;
        prevLatestId.current = latestId;
        return;
      }

      if (
        latestId &&
        prevLatestId.current &&
        latestId !== prevLatestId.current
      ) {
        if (document.visibilityState === "visible") {
          notificationSound.current.play().catch(() => { });
        }
      }

      prevLatestId.current = latestId;
    } catch (err) {
      console.error("Lỗi tải thông báo:", err);
    }
  };

  // 🔁 Auto refresh mỗi 5s
  useEffect(() => {
    if (!user?.id) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [user?.id]);

  const menuItems = [
    { key: "home", label: "Trang Chủ", onClick: () => navigate("/home") },
    {
      key: "services",
      label: "Dịch Vụ",
      children: services.map((s: any) => ({
        key: `service-${s.id}`,
        label: s.name,
        onClick: () => navigate(`/services/${s.id}`),
      })),
    },
    { key: "product", label: "Sản Phẩm", onClick: () => navigate(`/products`) },
    { key: "about", label: "Về Chúng Tôi" , onClick: () => navigate(`/about`)},
    { key: "contact", label: "Liên Hệ", onClick: () => navigate(`/contacts`) },
    { key: "promotion", label: "Chương Trình", onClick: () => navigate(`/promotions`) },
  ];

  return (
    <header className="fixed w-full z-30 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="flex items-center cursor-pointer">
          <MdSpa className="text-pink-500 text-2xl m-2" />
          <div className="font-bold text-pink-600 text-xl">Bella Spa</div>
        </div>

        {/* Menu for larger screens */}
        <Menu
          mode="horizontal"
          // Menu sẽ ẩn trên điện thoại (màn hình nhỏ) và chỉ hiển thị khi màn hình lớn hơn md
          className=" menu hidden md:flex flex-1 justify-center border-none text-sm sm:text-base md:text-lg py-2 px-4 sm:py-2 sm:px-6"
          items={menuItems}
        />




        {/* Mobile menu toggle button */}
        <div className="md:hidden flex items-center">
          <Button onClick={() => setMenuOpen(!menuOpen)} className="text-xl p-2">
            &#9776;
          </Button>
        </div>

        {/* Menu items for mobile */}
        {menuOpen && (
          <div className="md:hidden absolute p-2 top-16 left-0 w-full bg-white shadow-lg">
            <div
              className="py-2  cursor-pointer"
              onClick={() => {
                navigate("/home");
                setMenuOpen(false);
              }}
            >
              Trang Chủ
            </div>

            {/* Dịch Vụ */}
            <div
              className="py-2  cursor-pointer flex justify-between items-center"
              onClick={() => setOpenServiceMenu(!openServiceMenu)}
            >
              <span>Dịch Vụ</span>
              <span>{openServiceMenu ? "▲" : "▼"}</span>
            </div>

            {/* Submenu dịch vụ */}
            {openServiceMenu && (
              <div className="pl-4 bg-gray-50">
                {services.map((s: any) => (
                  <div
                    key={s.id}
                    className="py-2  cursor-pointer"
                    onClick={() => {
                      navigate(`/services/${s.id}`);
                      setMenuOpen(false);
                      setOpenServiceMenu(false);
                    }}
                  >
                    {s.name}
                  </div>
                ))}
              </div>
            )}

            {/* Các menu còn lại */}
            <div
              className="py-2  cursor-pointer"
              onClick={() => {
                navigate("/products");
                setMenuOpen(false);
              }}
            >
              Sản Phẩm
            </div>

            <div className="py-2  cursor-pointer">Đặt Lịch</div>
            <div className="py-2  cursor-pointer">Về Chúng Tôi</div>
            <div className="py-2  cursor-pointer">Liên Hệ</div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Input
            prefix={<SearchOutlined />}
            placeholder="Tìm kiếm dịch vụ..."
            className="hidden md:block w-60"
          />

          {/* Notification Dropdown */}
          <Dropdown
            overlay={
              <NotificationPanel
                notifications={notifications}
                setNotifications={setNotifications}
                fetchNotifications={fetchNotifications}
                setUnreadCount={setUnreadCount}
              />
            }
            trigger={["click"]}
            placement="bottomRight"
            overlayStyle={{ padding: 0 }}
          >
            <Badge count={unreadCount} size="small" offset={[-5, 5]}>
              <BellOutlined className="text-xl cursor-pointer !text-pink-700 hover:!text-pink-600" />
            </Badge>
          </Dropdown>

          {user && (
            <Badge
              count={cart.reduce((sum, item) => sum + item.quantity, 0)}
              size="small"
              offset={[-3, 5]}
              showZero
            >
              <ShoppingCartOutlined
                onClick={() => navigate("/cart")}
                className="!text-2xl cursor-pointer !text-orange-600 hover:!text-orange-500"
              />
            </Badge>
          )}

          {user ? (
            <UserInfo />
          ) : (
            <Button
              type="default"
              icon={<UserOutlined className="!text-white" />}
              className="!bg-pink-700"
              onClick={() => navigate("/login")}
            >
              <span className="text-white">Đăng Nhập</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
