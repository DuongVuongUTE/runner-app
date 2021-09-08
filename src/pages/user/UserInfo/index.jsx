import { Button, Typography, Image, List, Space } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import { Container } from "../../../styles/styles";

// import * as Style from "./styles";
const { Title } = Typography;

function UserInfo() {
  const { userInfo } = useSelector((state) => state.userReducer);

  const data = [
    <>
      <Space>
        <Image
          width={100}
          height={100}
          style={{ objectFit: "cover" }}
          src={userInfo.data.avatar}
        />
        <Button>Thay đổi avatar</Button>
      </Space>
    </>,
    `Tên: ${userInfo.data?.name}`,
    `Email: ${userInfo.data?.email}`,
    `Giới tính: ${userInfo.data?.gender === "female" ? "Nữ" : "Nam"}`,
    <>
      <span>Thay đổi mật khẩu:</span>
      <Button>Thay đổi</Button>
    </>,
  ];

  return (
    <>
      <Container>
        <Title level={3} style={{ textAlign: "center", padding: "30px 0" }}>
          Thông tin cá nhân
        </Title>
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
