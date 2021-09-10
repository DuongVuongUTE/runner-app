import React from "react";
import { useSelector } from "react-redux";
import { Typography, List, Button } from "antd";
import history from "../../../../../utils/history";

const { Title } = Typography;
function UserInfo() {
  const { userInfo } = useSelector((state) => state.userReducer);

  const data = [
    `Tên: ${userInfo.data?.name}`,
    `Email: ${userInfo.data?.email}`,
    `Giới tính: ${userInfo.data?.gender === "female" ? "Nữ" : "Nam"}`,
    <>
      <span>Thay đổi mật khẩu:</span>
      <Button onClick={() => history.push("/profile/change-info")}>
        Thay đổi
      </Button>
    </>,
  ];

  return (
    <>
      <Title
        level={3}
        style={{ textAlign: "center", padding: "0 0 15px", margin: 0 }}
      >
        Thông tin cá nhân
      </Title>
      <List
        size="small"
        bordered
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </>
  );
}

export default UserInfo;
