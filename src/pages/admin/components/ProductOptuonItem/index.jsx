import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Table, Space, Popconfirm } from "antd";

import history from "../../../utils/history";

import moment from "moment";

import {
  setProductSelectActionAdmin,
  getCategoryListAction,
  getProductListActionAdmin,
  deleteProductActionAdmin
} from "../../../redux/actions";

import * as Style from './styles'

function ProductListPage(props) {

  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { productList } = useSelector((state) => state.productReducerAdmin);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListActionAdmin());
  }, []);
  const tableColumn = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loại",
      dataIndex: "categoryId",
      key: "categoryId",
      render: (value) => {
        const categoryData = categoryList.data.find(
          (item) => item.id === value
        );
        if (categoryData) return categoryData.name;
      },
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value) => value.toLocaleString(),
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ngày sửa",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },

    {
      
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              ghost
              onClick={() => {
                { dispatch(setProductSelectActionAdmin(record)); }
                history.push(`/admin/products/edit/${record.id}`)
              }
              }
            >
              Sửa
            </Button>
            <Popconfirm
              title="Are you sure to delete this product?"
              onConfirm={() => dispatch(deleteProductActionAdmin({ id: record.id }))}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Xóa</Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const tableData = productList.data.map((productItem, productIndex) => {
    return {
      key: productIndex,
      ...productItem,
    };
  });

  return (
    <div>
      <div style={{ padding: 16 }}>
        <Style.Title>Quản lý sản phẩm</Style.Title>
        <Row justify="end" style={{ marginBottom: 16 }}>
          <Style.CustomButton
            type="primary"
            onClick={() => history.push('/admin/products/create')}
          >
            Thêm mới
          </Style.CustomButton>
        </Row>
        <Table
          pagination={{ pageSize: 7 }}
        columns={tableColumn}
        dataSource={tableData}
        loading={productList.load}
        />
      </div>
    </div>
  );
}

export default ProductListPage;
