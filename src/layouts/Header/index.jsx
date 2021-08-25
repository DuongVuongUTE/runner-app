import { useState, useEffect } from "react";

import { getProductListAction } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

import * as Icons from "@ant-design/icons";
import {
  Menu,
  Dropdown,
  Button,
  Popover,
  Empty,
  Input,
  Tag,
  Space,
  Drawer,
} from "antd";
import history from "../../utils/history";

import TopBar from "../../components/Topbar";

import hotline from "../../assets/images/hotline.jpg";

import * as Style from "./styles";

function Header() {
  const { productList } = useSelector((state) => state.productReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductListAction({ page: 1 }));
  }, []);

  const [searchValue, setSearchValue] = useState("");
  const [sticky, setSticky] = useState(false);
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 70) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  });

  const menu = (
    <Menu>
      <Menu.Item>
        <Space size={5} align="center">
          <Icons.FireOutlined /> <span>Xem thông tin</span>
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space size={5} align="center">
          <Icons.HeartOutlined /> <span>Sản phẩm yêu thích</span>
        </Space>
      </Menu.Item>
      <Menu.Item>
        <Space size={5} align="center">
          <Icons.LogoutOutlined /> <span>Đăng xuất</span>
        </Space>
      </Menu.Item>
    </Menu>
  );
  const CartContent = (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 60,
      }}
      description={<span>Giỏ hàng trống</span>}
    >
      <Button onClick={() => history.push("/product")} type="primary">
        Mua ngay
      </Button>
    </Empty>
  );
  const onChangeSearch = (e) => {
    const { value } = e.target;
    setSearchValue(value);
    dispatch(
      getProductListAction({
        searchKey: value,
      })
    );
  };
  const searchContent = (
    <>
      <Input
        placeholder="Tìm kiếm..."
        prefix={<Icons.SearchOutlined />}
        value={searchValue}
        onChange={(e) => onChangeSearch(e)}
      />
      <div style={{ maxWidth: 300 }}>
        {searchValue && (
          <>
            <span style={{ paddingTop: 5, display: "inline-block" }}>
              <Tag
                icon={<Icons.SearchOutlined />}
                color="#55acee"
                closable
                visible={Boolean(searchValue)}
                onClose={() => {
                  setSearchValue("");
                  dispatch(
                    getProductListAction({
                      page: 1,
                      searchKey: undefined,
                    })
                  );
                }}
              >
                {searchValue}
              </Tag>
            </span>
            <div style={{ maxHeight: 250, overflowY: "auto" }}>
              {productList.data.length > 0 ? (
                productList.data.map((item) => (
                  <div key={item.id}>
                    <h4>{item.name}</h4>
                    <p>{item.price}</p>
                  </div>
                ))
              ) : (
                <div>
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{
                      height: 60,
                    }}
                    description={<span>Không tìm thấy!</span>}
                  />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
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
      path: "/men",
    },
    {
      title: "Nữ",
      path: "/women",
    },
    {
      title: "Trẻ em",
      path: "/kids",
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
      <TopBar
        text="Miễn phí vận chuyển với đơn hàng nội thành > 300k - Đổi trả trong 30 ngày -
      Đảm bảo chất lượng"
      />
      <Style.Header className={sticky ? "sticky" : null}>
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
              <div
                style={{
                  background: `url(${hotline}) no-repeat center`,
                  backgroundSize: "cover",
                  paddingTop: "100%",
                }}
              ></div>
            </ul>
          </Drawer>
          <Style.HeaderLogo onClick={() => history.push("/")}>
            Runner
          </Style.HeaderLogo>
          <Style.HeaderList>{renderListNav()}</Style.HeaderList>
          <div className="menu-container">
            <Style.HeaderAction>
              <Popover
                placement="bottomRight"
                content={searchContent}
                title="Tìm kiếm"
                trigger="hover"
                onVisibleChange={() => {
                  setSearchValue("");
                  dispatch(
                    getProductListAction({
                      page: 1,
                      searchKey: undefined,
                    })
                  );
                }}
              >
                <Style.HeaderButton>
                  <Icons.SearchOutlined />
                </Style.HeaderButton>
              </Popover>
              <Popover
                placement="bottomRight"
                content={CartContent}
                title="Giỏ hàng"
                trigger="hover"
              >
                <Style.HeaderButton>
                  <Icons.ShoppingCartOutlined />
                </Style.HeaderButton>
              </Popover>

              <Dropdown overlay={menu} placement="bottomRight" arrow>
                <Style.HeaderButton>
                  <Icons.UserOutlined />
                </Style.HeaderButton>
              </Dropdown>
            </Style.HeaderAction>
          </div>
        </Style.HeaderContainer>
      </Style.Header>
    </>
  );
}

export default Header;
