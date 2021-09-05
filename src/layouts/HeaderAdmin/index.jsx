import { Row, Col, Dropdown, Menu, Space } from 'antd';
import history from '../../utils/history';

import { getProductListAction, logoutAction } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";

import * as Icon from "@ant-design/icons";
import * as Style from './styles'
function HeaderAdmin() {

  const dispatch = useDispatch();
  
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
              <Dropdown overlay={menuProfile} trigger={['click']}>
                <Style.profile >
                  <div>
                    <img src="https://scontent-sin6-4.xx.fbcdn.net/v/t1.6435-9/155014343_2906400379640295_7178204713421894265_n.jpg?_nc_cat=100&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=7IjPkoordQIAX_MNJQd&_nc_ht=scontent-sin6-4.xx&oh=6f053d59e3b1831ccccbe01e1cc9e7a4&oe=6156A99C" alt="" />
                  </div>
                  <span>Admin</span>
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