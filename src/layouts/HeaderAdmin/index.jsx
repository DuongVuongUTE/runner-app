import { Row, Col, Dropdown, Menu, Space, Badge } from 'antd';
import { useState, useEffect } from "react";
import history from '../../utils/history';

import * as Icon from "@ant-design/icons";
import * as Style from './styles'

import {
  logoutAction,
  getOrderWaitingAction
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

function HeaderAdmin() {

  const { userInfo } = useSelector((state) => state.userReducer);
  const { orderWaitingList } = useSelector((state) => state.orderReducerAdmin);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOrderWaitingAction());
  }, []);

  function handleLogout() {
    localStorage.removeItem("userInfo");
    dispatch(logoutAction());
    history.push("/login");
  }
  const menuProfile = (
    <Menu>
      <Menu.Item key="0" onClick={() =>history.push('/admin/profile/user-info')}>
        <Space size={5} align="center">
          <Icon.FireOutlined /> <span>Xem thông tin</span>
        </Space>
      </Menu.Item>
      <Menu.Item key="1" onClick={() => handleLogout()}>
        <Space size={5} align="center">
          <Icon.LogoutOutlined /> <span>Đăng xuất</span>
        </Space>
      </Menu.Item>

    </Menu>
  );

  function rendernotification() {
    return orderWaitingList.data.map((item, index) => {
      return (
        <Style.CustomMenuItem key={index} onClick={() =>history.push('/admin/orders')}>
          <Space size={5} align="center">
            <Icon.NotificationFilled className="icon" />
            <span>{item.name} đã đặt {item.products?.length} Sản phẩm</span>
          </Space>
        </Style.CustomMenuItem>
      )
    })
  }

  return (
    <>
      <Style.HeaderContainer>
        <Row>
          <Col span={7}>
            <Style.HeaderLogo onClick={() => history.push("/admin")}>
              Runner
            </Style.HeaderLogo>
          </Col>
          <Col span={17}>
            <Style.CustomSpace size={[20, 16]}>
              <Style.SpaceIcons size={[20, 16]}>
                <Dropdown
                  placement="bottomCenter"
                  overlay={<Style.CustomMenu>{rendernotification()}</Style.CustomMenu>}
                  trigger={['click']}>
                  <Badge
                    style={{ cursor: "point" }}
                    count={orderWaitingList.data?.length}
                    size="small"
                  >
                    <Icon.BellOutlined className="icon" />
                  </Badge>
                </Dropdown>
              </Style.SpaceIcons>
              <Dropdown overlay={menuProfile} trigger={['click']}>
                <Style.profile >
                  <div>
                    <img src={userInfo.data?.avatar} alt="" />
                  </div>
                  <span>{userInfo.data?.name}</span>
                </Style.profile>
              </Dropdown>
            </Style.CustomSpace>
          </Col>
        </Row>
      </Style.HeaderContainer>
    </>
  )
}
export default HeaderAdmin