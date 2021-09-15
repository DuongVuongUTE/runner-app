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
      <Menu.Item key="0">
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
            <Style.CustomSpace>
              <Style.SpaceIcons size={[20, 16]}>
                <Icon.BellOutlined className="icon" />
                <Badge
                  style={{ cursor: "point" }}
                  count={orderWaitingList.data?.length}
                  size="small"
                  onClick={()=>history.push('/admin/orders')}
                >
                  <Icon.FlagOutlined className="icon" />
                </Badge>
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