import '@ant-design/v5-patch-for-react-19';
import { Outlet, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import {
  AppstoreOutlined,
  BarChartOutlined,
  DesktopOutlined,
  HistoryOutlined,
  HomeOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  ScheduleOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  StarOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';

import type { MenuProps } from 'antd';
import { Flex, Layout, Menu, theme, Drawer, Button, Grid } from 'antd';

import { useAuthStore } from '../stores/authStore';
import UserInfo from '../components/UserInfo';
import Search from 'antd/es/input/Search';
import NotificationBell from '../components/NotificationBell';

const { Header, Content, Footer, Sider } = Layout;
const { useBreakpoint } = Grid;

const DefaultLayout: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const screens = useBreakpoint();
  const isMobile = !screens.md; // ✔ MÀN HÌNH DƯỚI 768PX LÀ MOBILE

  const { user, token } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user && !token) {
      navigate('/login', { replace: true });
    }
  }, [user, token, navigate]);

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('Dashboard', '', <PieChartOutlined />),
    getItem('Services', 'services', <DesktopOutlined />),
    getItem('Booking', 'booking', <ScheduleOutlined />),
    getItem('Products', 'products', <ShoppingCartOutlined />),
    getItem('Orders', 'orders', <ShoppingOutlined />),
    getItem('Rooms', 'rooms', <HomeOutlined />),
    getItem('Reviews', 'reviews', <StarOutlined />),
    getItem('Users', 'users', <UsergroupAddOutlined />, [
      getItem('Admin', 'admin'),
      getItem('Employee', 'employee'),
      getItem('Customer', 'customer'),
    ]),
    getItem('Brands', 'brands', <AppstoreOutlined />, [
      getItem('Brand 1', 'brand1'),
      getItem('Brand 2', 'brand2'),
    ]),
    getItem('Reports', 'reports', <BarChartOutlined />),
    getItem('History', 'history', <HistoryOutlined />),
  ];

  const onMenuClick = ({ key }: any) => {
    navigate(`/dashboard/${key}`);
    if (isMobile) setDrawerOpen(false);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* ---------------------------------
         MOBILE DRAWER MENU (RESPONSIVE)
      ----------------------------------- */}
      {isMobile ? (
        <Drawer
          title="Menu"
          placement="left"
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          bodyStyle={{ padding: 0 }}
        >
          <Menu
            mode="inline"
            items={items}
            onClick={onMenuClick}
            style={{ height: '100%' }}
          />
        </Drawer>
      ) : (
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className="h-10 m-4 rounded-md bg-white/20" />
          <Menu
            theme="dark"
            defaultSelectedKeys={['']}
            mode="inline"
            items={items}
            onClick={onMenuClick}
          />
        </Sider>
      )}

      {/* ---------------------------------
         MAIN LAYOUT
      ----------------------------------- */}
      <Layout>
        {/* HEADER */}
        <Header
          style={{
            padding: '0 16px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <Flex align="center" gap={16}>
            {/* BUTTON MỞ MENU TRÊN MOBILE */}
            {isMobile && (
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={() => setDrawerOpen(true)}
              />
            )}

            {/* Search co giãn theo màn hình */}
            <Search
              placeholder="Tìm dịch vụ..."
              allowClear
              style={{ maxWidth: isMobile ? 180 : 400 }}
            />
          </Flex>

          {/* Notification + UserInfo */}
          <Flex align="center" gap={16}>
            <NotificationBell />
            <UserInfo />
          </Flex>
        </Header>

        {/* CONTENT */}
        <Content style={{ margin: '24px 16px 0' }}>
          <div
            style={{
              padding: isMobile ? 12 : 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: 'calc(100vh - 160px)',
            }}
          >
            <Outlet />
          </div>
        </Content>

        {/* FOOTER */}
        <Footer style={{ textAlign: 'center' }}>
          Bella Spa ©{new Date().getFullYear()} — Dashboard System
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DefaultLayout;
