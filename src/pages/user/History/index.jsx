import React from "react";
import { Space, Table, Image, Typography } from "antd";
import { useSelector } from "react-redux";
import { Container } from "../../../styles/styles";
import { Redirect } from "react-router";

const { Title } = Typography;

function HistoryPage() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const { orderList } = useSelector((state) => state.orderReducer);

  const columns = [
    { title: "Id", dataIndex: "id", key: "id" },
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "SĐT", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Tổng tiền", dataIndex: "totalPrice", key: "totalPrice" },
    { title: "Thanh toán", dataIndex: "checkoutInfo", key: "checkoutInfo" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
  ];

  const data = orderList.data.map((orderItem, orderIndex) => {
    return {
      key: orderIndex,
      ...orderItem,
      description: orderItem.products.map((product, productIndex) => (
        <div key={productIndex}>
          <Space size={15}>
            <Image
              width={50}
              height={50}
              style={{ objectFit: "cover" }}
              preview={false}
              src={product.image}
            />
            <span>Tên sản phẩm: {product.name}</span>
            <span>Số lượng: {product.count}</span>
          </Space>
        </div>
      )),
    };
  });
  if (!userInfo.data.name) {
    return <Redirect to="/login" />;
  }
  return (
    <>
      <Container>
        <Title level={3} style={{ textAlign: "center", padding: "30px 0" }}>
          Lịch sử mua hàng
        </Title>
        <Table
          columns={columns}
          pagination={false}
          expandable={{
            expandedRowRender: (record) => (
              <p style={{ margin: 0 }}>{record.description}</p>
            ),
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={data}
        />
      </Container>
    </>
  );
}

export default HistoryPage;
