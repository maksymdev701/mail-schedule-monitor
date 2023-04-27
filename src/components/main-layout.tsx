import React from "react";
import {
  TeamOutlined,
  UploadOutlined,
  HistoryOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  OrderedListOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { NavLink, Outlet, useLocation } from "react-router-dom";

const { Header, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Threads", "1", <TeamOutlined />, [
    getItem(
      <NavLink to="/threads">List</NavLink>,
      "1-1",
      <UnorderedListOutlined />
    ),
    getItem(
      <NavLink to="/threads/add">Add</NavLink>,
      "1-2",
      <UsergroupAddOutlined />
    ),
  ]),
  getItem("Prompts", "2", <UploadOutlined />, [
    getItem(
      <NavLink to="/prompts">List</NavLink>,
      "2-1",
      <OrderedListOutlined />
    ),
    getItem(
      <NavLink to="/prompts/add">Add</NavLink>,
      "2-2",
      <FileAddOutlined />
    ),
  ]),
  getItem(<NavLink to="/history">History</NavLink>, "3", <HistoryOutlined />),
];

const MainLayout = () => {
  const location = useLocation();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  let defaultSelectedKeys = "1-1",
    defaultOpenKeys = "1";

  console.log(location);
  switch (location.pathname) {
    case "/threads/add":
      defaultSelectedKeys = "1-2";
      break;
    case "/prompts":
      defaultOpenKeys = "2";
      defaultSelectedKeys = "2-1";
      break;
    case "/prompts/add":
      defaultOpenKeys = "2";
      defaultSelectedKeys = "2-2";
      break;
  }

  return (
    <Layout hasSider>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
        }}
      >
        <div className="menu-app__div">Daystream</div>
        <Menu
          theme="dark"
          mode="inline"
          items={items}
          defaultSelectedKeys={[defaultSelectedKeys]}
          defaultOpenKeys={[defaultOpenKeys]}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            textAlign: "center",
          }}
        >
          <h2>Email Bot Monitor</h2>
        </Header>
        <Outlet />
      </Layout>
    </Layout>
  );
};

export default MainLayout;
