import React, { useState } from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
import * as Icons from "@ant-design/icons";


import history from '../../utils/history';

import * as Style from './styles';

const SIDEBAR_MENU = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: 'https://img.icons8.com/ios/25/000000/home--v1.png',
    subMenu: []
  },
  {
    title: 'Product Manage',
    path: '/admin/products',
    icon: 'https://img.icons8.com/dotty/25/000000/product.png',
    subMenu: []
  },
  {
    title: 'Category Manage',
    path: '/admin/categories',
    icon: 'https://img.icons8.com/ios/25/000000/categorize.png',
    subMenu: []
  },
  {
    title: 'Account Manage',
    path: '',
    icon: 'https://img.icons8.com/ios/25/000000/user.png',
    subMenu: [
      {
        title: 'User',
        path: '/admin/account/users',
        // icon: 'https://img.icons8.com/ios/25/000000/categorize.png',
      },
      {
        title: 'Admin',
        path: '/admin/account/admins',
        // icon: 'https://img.icons8.com/ios/25/000000/categorize.png',
      }
    ]
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
      <Sider
        style={{ margin: '16px 0' }}
        width={270}
        theme="light"
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
      >
        <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
          {renderSidebarMenu()}
        </Menu>
      </Sider>

    </>
  );
}

export default Sidebar;
