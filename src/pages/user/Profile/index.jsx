import React, { useEffect, useRef, useState } from "react";

import { Image, Row, Col, Menu, Avatar, Button, message, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../../styles/styles";
import * as Icons from "@ant-design/icons";

import * as Style from "./styles";
import {
  editUserProfileAction,
  getUserInfoAction,
  logoutAction,
} from "../../../redux/actions";
import history from "../../../utils/history";
import { Route, Switch, useParams } from "react-router";
import UserInfo from "./Page/UserInfo";
import Wishlist from "./Page/WishList";
import HistoryOrder from "./Page/HistoryOrder";
import ChageInfo from "./Page/ChageInfo";
import Loading from "../../../components/Loading";
import { ImageUpload } from "../../../utils/ImageUpload";

function ProfilePage() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const { responseAction } = useSelector((state) => state.userReducer);
  const { page } = useParams();
  const dispatch = useDispatch();

  const [avatar, setAvatar] = useState("");
  const [visible, setVisible] = useState(false);

  const inputFile = useRef(null);

  useEffect(() => {
    if (responseAction.edit_user.load) {
      dispatch(getUserInfoAction());
    }
  }, [responseAction.edit_user]);

  const chageAvatar = (e) => {
    const file = e.target.files[0];
    if (!file) {
      return message.error("Ảnh không tồn  tại");
    }
    if (file.size > 1024 * 1024) {
      return message.error("Ảnh không không được nặng quá 1mb");
    }
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      return message.error("Ảnh không đúng định dạng");
    }
    setAvatar(file);
  };

  const updateAvatar = async () => {
    let media;
    if (avatar) media = await ImageUpload([avatar]);
    if (media) {
      dispatch(
        editUserProfileAction({
          id: userInfo.data.id,
          data: {
            avatar: media[0].url,
          },
        })
      );
      setAvatar("");
      setVisible(false);
    }
  };
  return (
    <Style.ProfilePage>
      <Container>
        <Row gutter={[15, 15]}>
          <Col xs={{ span: 24 }} lg={{ span: 6 }}>
            <Style.ProfileMenu>
              <div className="profile-top">
                <div className="profile-avatar">
                  <Avatar
                    className="profile-image"
                    src={
                      <Image
                        preview={false}
                        src={
                          avatar
                            ? URL.createObjectURL(avatar)
                            : userInfo.data.avatar
                        }
                      />
                    }
                  ></Avatar>
                  <span className="avatar-upload">
                    <Button
                      className="btn-upload"
                      shape="circle"
                      onClick={() => {
                        inputFile.current.click();
                        setVisible(true);
                      }}
                      icon={<Icons.EditOutlined />}
                    ></Button>
                    <input
                      ref={inputFile}
                      type="file"
                      hidden
                      id="avatar"
                      name="avatar"
                      accept="image/*"
                      onChange={(e) => chageAvatar(e)}
                    />
                  </span>
                </div>
                <Space
                  align="center"
                  className={visible ? "btn-avatar active" : "btn-avatar"}
                >
                  <Button
                    onClick={() => {
                      updateAvatar();
                    }}
                    loading={responseAction.edit_user.load}
                    icon={<Icons.CheckOutlined />}
                  >
                    Ok
                  </Button>
                  <Button
                    onClick={() => {
                      setAvatar("");
                      setVisible(false);
                    }}
                    icon={<Icons.CloseOutlined />}
                  >
                    Huỷ
                  </Button>
                </Space>
                <h3>{userInfo.data?.name}</h3>
              </div>
              <Menu defaultSelectedKeys={[page]} mode="inline">
                <Menu.Item
                  key="user-info"
                  icon={<Icons.UserOutlined />}
                  onClick={() => history.push("/profile/user-info")}
                >
                  Thông tin tài khoản
                </Menu.Item>
                <Menu.Item
                  key="history-order"
                  icon={<Icons.FieldTimeOutlined />}
                  onClick={() => history.push("/profile/history-order")}
                >
                  Lịch sử giao dịch
                </Menu.Item>
                <Menu.Item
                  key="wish-list"
                  icon={<Icons.HeartOutlined />}
                  onClick={() => history.push("/profile/wish-list")}
                >
                  Sản phẩm yêu thích
                </Menu.Item>
                <Menu.Item
                  key="change-info"
                  icon={<Icons.EditOutlined />}
                  onClick={() => history.push("/profile/change-info")}
                >
                  Thay đổi thông tin tài khoản
                </Menu.Item>
                <Menu.Item
                  key="5"
                  icon={<Icons.LogoutOutlined />}
                  onClick={() => {
                    dispatch(logoutAction());
                    history.push("/");
                  }}
                >
                  Đăng xuất
                </Menu.Item>
              </Menu>
            </Style.ProfileMenu>
          </Col>
          <Col xs={{ span: 24 }} lg={{ span: 18 }}>
            <Style.ProfilePanel>
              <Switch>
                <Route exact path="/profile/user-info" component={UserInfo} />
                <Route exact path="/profile/wish-list" component={Wishlist} />
                <Route
                  exact
                  path="/profile/history-order"
                  component={HistoryOrder}
                />
                <Route
                  exact
                  path="/profile/change-info"
                  component={ChageInfo}
                />
              </Switch>
            </Style.ProfilePanel>
          </Col>
        </Row>
      </Container>
    </Style.ProfilePage>
  );
}

export default ProfilePage;
