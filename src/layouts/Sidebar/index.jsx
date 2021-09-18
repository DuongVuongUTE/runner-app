import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb } from "antd";

import history from "../../utils/history";

import * as Icon from "@ant-design/icons";
import * as Style from "./styles";

const SIDEBAR_MENU = [
  {
    title: "Dashboard",
    path: "/admin",
    icon: <Icon.HomeOutlined />,
    subMenu: [],
  },
  {
    title: "Quản Lý Sản Phẩm",
    path: "/admin/products",
    icon: <Icon.MedicineBoxOutlined />,
    subMenu: [],
  },
  {
    title: "Quán Lý Loại Giày",
    path: "/admin/categories",
    icon: <Icon.QrcodeOutlined />,
    subMenu: [],
  },
  {
    title: "Quản Lý Khách Hàng",
    path: "/admin/customers",
    icon: <Icon.SolutionOutlined />,
    subMenu: [],
  },
  {
    title: "Quản Lý Đặt Hàng",
    path: "/admin/orders",
    icon: <Icon.ShoppingOutlined />,
    subMenu: [],
  },
  {
    title: "Quản Lý tài khoản",
    path: "/admin/accounts",
    icon: <Icon.UserOutlined />,
    subMenu: [],
  },
  {
    title: "Quản Lý bài viết",
    path: "/admin/blog",
    icon: <Icon.EditOutlined />,
    subMenu: [],
  },
];

function Sidebar({ location }) {
  const [collapsed, setCollapsed] = useState(false);
  const [selectSiderItem, setSelectSiderItem] = useState(0);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const { SubMenu } = Menu;

  useEffect(() => {
    const siderbarIndex = SIDEBAR_MENU.findIndex((item, index) => {
      return item.path === location.pathname;
    });
    setSelectSiderItem(siderbarIndex);
  }, [location]);

  function renderSidebarMenu() {
    return SIDEBAR_MENU.map((sidebarItem, sidebarIndex) => {
      return (
        <>
          {sidebarItem.subMenu.length === 0 ? (
            <Menu.Item
              icon={sidebarItem.icon}
              key={sidebarIndex}
              active={location.pathname === sidebarItem.path}
              onClick={() => history.push(sidebarItem.path)}
            >
              {sidebarItem.title}
            </Menu.Item>
          ) : (
            <SubMenu
              title={sidebarItem.title}
              icon={<img src={sidebarItem.icon} />}
              key={`sidebar-${sidebarIndex}`}
              active={location.pathname === sidebarItem.path}
            >
              {renderSubMenu(sidebarItem.subMenu)}
            </SubMenu>
          )}
        </>
      );
    });
  }
  function renderSubMenu(subMenu) {
    return subMenu.map((subMenuItem, subMenuIndex) => {
      return (
        <Menu.Item
          key={`subMenu-${subMenuIndex}`}
          active={location.pathname === subMenuItem.path}
          onClick={() => history.push(subMenuItem.path)}
        >
          {subMenuItem.title}
        </Menu.Item>
      );
    });
  }
  return (
    <>
      <Style.CustomSider
        width={270}
        theme="light"
        collapsible
        collapsed={collapsed}
        // trigger={null}
        onCollapse={onCollapse}
      >
        <Style.CustomMenu selectedKeys={[`${selectSiderItem}`]} mode="inline">
          {renderSidebarMenu()}
        </Style.CustomMenu>
      </Style.CustomSider>
    </>
  );
}

export default Sidebar;
