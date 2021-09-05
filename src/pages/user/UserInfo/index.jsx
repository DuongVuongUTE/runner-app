import { Button, Divider, Image, List, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Container } from "../../../styles/styles";
import history from "../../../utils/history";
// import * as Style from "./styles";

function UserInfo() {
  const { userInfo } = useSelector((state) => state.userReducer);

  const data = [
    `Tên: ${userInfo.data?.name}`,
    `Email: ${userInfo.data?.email}`,
    `Giới tính: ${userInfo.data?.gender === "female" ? "Nữ" : "Nam"}`,
    `Lịch sử mua: Đang làm!`,
    <>
      <span>Sản phẩm yêu thích:</span>
      <Button onClick={() => history.push("/wishlist")}>Xem</Button>
    </>,
  ];

  return (
    <>
      <Divider orientation="left">Thông tin cá nhân</Divider>
      <Container>
        <Space>
          <Image
            width={100}
            height={100}
            style={{ objectFit: "cover" }}
            src={userInfo.data.avatar}
          />
          <Button>Thay đổi avatar</Button>
        </Space>
        <List
          size="small"
          bordered
          dataSource={data}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </Container>
    </>
  );
}

export default UserInfo;
