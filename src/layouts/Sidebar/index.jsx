import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import * as Icons from "@ant-design/icons";


import history from '../../utils/history';

import * as Style from './styles';

const SIDEBAR_MENU = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: 'https://img.icons8.com/fluency/25/000000/home.png',
    subMenu: []
  },
  {
    title: 'Quản Lý Sản Phẩm',
    path: '/admin/products',
    icon: 'https://img.icons8.com/color/25/000000/product--v3.png',
    subMenu: []
  },
  {
    title: 'Quán Lý Loại',
    path: '/admin/categories',
    icon: 'https://img.icons8.com/fluency/25/000000/categorize.png',
    subMenu: []
  },
  {
    title: 'Quản Lý Khách Hàng',
    path: '/admin/customers',
    icon: 'https://img.icons8.com/fluency/25/000000/group.png',
    subMenu: []
  },
  {
    title: 'Quản Lý tài khoản',
    path: '/admin/accounts',
    icon: 'https://img.icons8.com/fluency/25/000000/guest-male.png',
    subMenu: []
  },
  
]

function Sidebar({ location, isShowSidebar }) {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  const { Header, Content, Footer, Sider } = Layout;
  const { SubMenu } = Menu;
  function renderSidebarMenu() {
    return SIDEBAR_MENU.map((sidebarItem, sidebarIndex) => {
      return (
        <>
          {sidebarItem.subMenu.length === 0
            ? (
              <Menu.Item icon={<img src={sidebarItem.icon} />}
                key={`sidebar-${sidebarIndex}`}
                active={location.pathname === sidebarItem.path}
                onClick={() => history.push(sidebarItem.path)}
              >

                {sidebarItem.title}
              </Menu.Item>
            )
            : (
              <SubMenu
                title={sidebarItem.title}
                icon={<img src={sidebarItem.icon} />}
                key={`sidebar-${sidebarIndex}`}
                active={location.pathname === sidebarItem.path}
              >

                {renderSubMenu(sidebarItem.subMenu)}
              </SubMenu>
            )
          }

        </>
      )
    })
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
      )
    })
  }
  return (
    <>
      <Style.CustomSider
        style={{ margin: '16px 0' }}
        width={270}
        theme="dark"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <Style.CustomMenu  defaultSelectedKeys={['1']} mode="inline">
          {renderSidebarMenu()}
        </Style.CustomMenu>
      </Style.CustomSider>

    </>
  );
}

export default Sidebar;
