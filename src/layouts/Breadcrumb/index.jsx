import { Breadcrumb } from 'antd';
import * as Icon from "@ant-design/icons";
import history from '../../utils/history';

const BREADCRUMB_MENU = [
  {
    title: 'Dashboard',
    path: '/admin',
    icon: <Icon.HomeOutlined />,
    subMenu: []
  },
  {
    title: 'Quản Lý Sản Phẩm',
    path: '/admin/products',
  },
  {
    pathParent: '/admin/products',
    title: 'Sửa Sản Phẩm',
    path: "/admin/products/edit/:id",
  },
  {
    pathParent: '/admin/products',
    title: 'Thêm Sản Phẩm',
    path: "/admin/products/create"
  },
  {
    title: 'Quán Lý Loại Giày',
    path: '/admin/categories'
  },
  {
    title: 'Quản Lý Khách Hàng',
    path: '/admin/customers'
  },
  {
    title: 'Quản Lý Đặt Hàng',
    path: '/admin/orders',
  },
  {
    title: 'Quản Lý tài khoản',
    path: '/admin/accounts',
  },
  {
    title: 'Thông tin cá nhân',
    path: '/admin/profile/:page',
  },
]

function BreadcrumbLayout({ match }) {
  console.log("🚀 ~ file: index.jsx ~ line 44 ~ BreadcrumbLayout ~ location", match.path)

  
  function renderBreadcrumb(pathName) {

    return BREADCRUMB_MENU.map((menuItem, menuIndex) => {
      if (menuItem.path === pathName) {
        return (
          <>
            {menuItem.pathParent
              ? renderBreadcrumb(menuItem.pathParent) : null
            }
            <Breadcrumb.Item style={{cursor: "pointer"}} onClick = {()=>history.push(menuItem.path)}>
              {menuItem.title}
            </Breadcrumb.Item>
          </>
        )
      }
    })
  }
  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item style={{cursor: "pointer"}} onClick = {()=>history.push("/admin")}>
        <Icon.HomeOutlined />Trang chủ
      </Breadcrumb.Item>
      {renderBreadcrumb(match.path)}
    </Breadcrumb>
  )
}
export default BreadcrumbLayout