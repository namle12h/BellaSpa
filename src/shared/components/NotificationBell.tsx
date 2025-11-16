import { useEffect, useRef, useState } from "react";
import { Badge } from "antd";
import { BellOutlined } from "@ant-design/icons";
import { getNotifications } from "../services/notificationApi";
import NotificationPanel from "./NotificationPanel";
import { useAuthStore } from "../stores/authStore";
import Portal from "./Portal";

export default function NotificationBell() {
  const { user } = useAuthStore();

  const [notifications, setNotifications] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [open, setOpen] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);

  const notificationSound = useRef(new Audio("/sounds/news-ting-6832.mp3"));
  const prevLatestId = useRef<number | null>(null);
  const firstLoad = useRef(true);
  const bellRef = useRef<HTMLSpanElement | null>(null);
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0 });


  const PANEL_WIDTH = 380; // khớp với w-[380px] trong Panel



  const updatePanelPosition = () => {
    if (!bellRef.current) return;

    const rect = bellRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Nếu màn nhỏ, panel co lại
    const panelWidth = Math.min(PANEL_WIDTH, viewportWidth - 16);

    // Căn bên phải icon nhưng không tràn màn hình
    let left = rect.right - panelWidth;
    if (left < 8) left = 8;
    if (left + panelWidth > viewportWidth - 8) {
      left = viewportWidth - panelWidth - 8;
    }

    setPanelPos({
      top: rect.bottom + 8,
      left,
    });
  };

  const togglePanel = () => {
    setOpen((prev) => {
      const next = !prev;

      if (next) {
        updatePanelPosition();
      }

      return next;
    });
  };


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
        latestId !== prevLatestId.current &&
        document.visibilityState === "visible"
      ) {
        notificationSound.current.play().catch(() => { });
      }

      prevLatestId.current = latestId;
    } catch { }
  };

  useEffect(() => {
    if (!user?.id) return;
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 5000);
    return () => clearInterval(interval);
  }, [user?.id]);

  // 👉 Auto close khi click bên ngoài
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);
  useEffect(() => {
    if (!open) return;

    const handleResize = () => {
      updatePanelPosition();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [open]);

  return (
    <>
      {/* Icon chuông */}
      <Badge count={unreadCount} size="small">
        <span ref={bellRef}>
          <BellOutlined
            className="text-xl cursor-pointer text-gray-700 hover:text-pink-600"
            onClick={togglePanel}
          />
        </span>
      </Badge>


      {open && (
        <Portal>
          <div
            ref={panelRef}
            className="fixed z-[9999]"
            style={{
              top: panelPos.top,
              left: panelPos.left,
              position: "fixed",
            }}
          >
            <NotificationPanel
              notifications={notifications}
              setNotifications={setNotifications}
              fetchNotifications={fetchNotifications}
              setUnreadCount={setUnreadCount}
            />
          </div>
        </Portal>
      )}

    </>
  );
}
