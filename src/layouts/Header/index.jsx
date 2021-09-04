import { useState, useEffect } from "react";

import { getProductListAction, logoutAction } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

import * as Icons from "@ant-design/icons";
import {
  Menu,
  Dropdown,
  Button,
  Empty,
  Input,
  Tag,
  Space,
  Drawer,
  Badge,
} from "antd";
import history from "../../utils/history";

import TopBar from "../../components/Topbar";

import hotline from "../../assets/images/hotline.jpg";

import * as Style from "./styles";
import Avatar from "antd/lib/avatar/avatar";

function Header({ type }) {
  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const [sticky, setSticky] = useState(true);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  let prevScrollpos = window.pageYOffset;
  window.addEventListener("scroll", function () {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos || prevScrollpos === 0) {
      setSticky(true);
    } else {
      setSticky(false);
    }
    prevScrollpos = currentScrollPos;
  });

  function handleLogout() {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
    if (type === "admin") {
      history.push("/login");
    }
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Space size={5} align="center">
          <Icons.FireOutlined /> <span>Xem thông tin</span>
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space
          size={5}
          align="center"
          onClick={() => history.push("/wishlist")}
        >
          <Icons.HeartOutlined /> <span>Sản phẩm yêu thích</span>
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space size={5} align="center" onClick={() => handleLogout()}>
          <Icons.LogoutOutlined /> <span>Đăng xuất</span>
        </Space>
      </Menu.Item>
    </Menu>
  );

  const ListNav = [
    {
      title: "Trang chủ",
      path: "/",
    },
    {
      title: "Sản phẩm",
      path: "/product",
    },
    {
      title: "Nam",
      path: "/product/men",
    },
    {
      title: "Nữ",
      path: "/product/woman",
    },
    {
      title: "Trẻ em",
      path: "/product/kids",
    },
    // {
    //   title: "Giới thiệu",
    //   path: "/about",
    // },
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: "Liên hệ",
      path: "/contact",
    },
  ];
  function renderListNav() {
    return ListNav.map((nav, index) => (
      <Style.HeaderItem key={`${nav.title}-${index}`}>
        <Style.HeaderLink onClick={() => history.push(nav.path)}>
          {nav.title}
        </Style.HeaderLink>
      </Style.HeaderItem>
    ));
  }

  return (
    <>
      {/* {!(type === "admin") && (
        <TopBar
          text="Miễn phí vận chuyển với đơn hàng nội thành > 300k - Đổi trả trong 30 ngày -
      Đảm bảo chất lượng"
        />
      )} */}

      <Style.Header className={sticky ? null : "sticky"}>
        <Style.HeaderContainer>
          <div className="menu-container menu-hide-desktop">
            <Button
              className="btn-menu-mobile"
              type="text"
              icon={<Icons.MenuOutlined />}
              onClick={showDrawer}
            />
          </div>
          <Drawer
            title="Runner Inn"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <div className="user-mobile">
              {userInfo.data.name ? (
                <>
                  <Dropdown
                    overlay={menu}
                    placement="bottomRight"
                    arrow
                    trigger={["click"]}
                  >
                    <Space align="center" className="avatar-mobile">
                      <Avatar src={userInfo.data?.avatar} />
                      <strong>{userInfo.data?.name}</strong>
                    </Space>
                  </Dropdown>
                </>
              ) : (
                <Button
                  type="primary"
                  danger
                  block
                  className="btn-login"
                  onClick={() => history.push("/login")}
                >
                  Đăng nhập
                </Button>
              )}
            </div>
            <ul>
              {ListNav.map((nav, index) => {
                return (
                  <li key={`${nav.title}-${index}`}>
                    <span
                      onClick={() => {
                        onClose();
                        history.push(nav.path);
                      }}
                    >
                      {nav.title}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div
              style={{
                background: `url(${hotline}) no-repeat center`,
                backgroundSize: "cover",
                paddingTop: "100%",
              }}
            ></div>
          </Drawer>
          <Style.HeaderLogo onClick={() => history.push("/")}>
            Runner
          </Style.HeaderLogo>
          {!(type === "admin") && (
            <Style.HeaderList>{renderListNav()}</Style.HeaderList>
          )}
          <div className="menu-container">
            <Style.HeaderAction>
              {!(type === "admin") && (
                <Badge count={cartList.data?.length}>
                  <Button
                    type="primary"
                    shape="circle"
                    onClick={() => history.push("/cart")}
                    icon={<Icons.ShoppingCartOutlined />}
                  ></Button>
                </Badge>
              )}
              <div className="user-action">
                {userInfo.data.name ? (
                  <>
                    <Dropdown
                      overlay={menu}
                      placement="bottomRight"
                      arrow
                      trigger={["click"]}
                    >
                      <Space align="center" style={{ cursor: "pointer" }}>
                        <Avatar src={userInfo.data?.avatar} />
                        <strong>{userInfo.data?.name}</strong>
                      </Space>
                    </Dropdown>
                  </>
                ) : (
                  <Button type="primary" onClick={() => history.push("/login")}>
                    Đăng nhập
                  </Button>
                )}
              </div>
            </Style.HeaderAction>
          </div>
        </Style.HeaderContainer>
      </Style.Header>
      <Style.SpacingTop />
    </>
  );
}

export default Header;
