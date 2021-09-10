import React from "react";
import { Space, Table, Image, Typography, Badge } from "antd";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

import * as Style from "./style";

const { Title } = Typography;

function HistoryOrder() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const { orderList } = useSelector((state) => state.orderReducer);

  const columns = [
    { title: "Tên", dataIndex: "name", key: "name" },
    { title: "Địa chỉ", dataIndex: "address", key: "address" },
    { title: "SĐT", dataIndex: "phoneNumber", key: "phoneNumber" },
    { title: "Tổng tiền", dataIndex: "totalPrice", key: "totalPrice" },
    {
      title: "Thanh toán",
      dataIndex: "checkoutInfo",
      key: "checkoutInfo",
      render: (value) => value.toUpperCase(),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value) => {
        return value === "waiting" ? (
          <Badge status="processing" text={value} />
        ) : (
          <Badge status="success" text={value} />
        );
      },
    },
  ];

  const data = orderList.data.map((orderItem, orderIndex) => {
    return {
      key: orderIndex,
      ...orderItem,
      description: orderItem.products.map((product, productIndex) => (
        <div key={productIndex}>
          <Space size={15} wrap align="center">
            <Image
              width={50}
              height={50}
              style={{ objectFit: "cover" }}
              preview={false}
              src={product.image}
            />
            <span>Tên sản phẩm: {product.name}</span>
            {product.option.size && <span>Size: {product.option.size}</span>}
            <span>Số lượng: {product.count}</span>
          </Space>
        </div>
      )),
    };
  });

  return (
    <Style.HistoryOrder>
      <Title
        level={3}
        style={{ textAlign: "center", padding: "0 0 15px", margin: 0 }}
      >
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
    </Style.HistoryOrder>
  );
}

export default HistoryOrder;
