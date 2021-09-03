import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Table, Space, Popconfirm, List, Input } from "antd";
import * as Icon from "@ant-design/icons";
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
  const [searchKey, setSearchKey] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListActionAdmin());
  }, []);

  function handleSearchProduct(value) {
    console.log("🚀 ~ file: index.jsx ~ line 31 ~ handleSearchProduct ~ value", value)
    setSearchKey(value);
    dispatch(getProductListActionAdmin({
      searchKey:value
    }));
  }

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
        <Style.Search>
          <Input 
            style={{width:"50%"}} placeholder="Tìm kiếm..." 
            suffix={<Icon.SearchOutlined />} 
            onChange={(e)=>handleSearchProduct(e.target.value)}
            />
        </Style.Search>
        <Table
          pagination={{ pageSize: 7 }}
          columns={tableColumn}
          dataSource={tableData}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <List
                  size="small"
                  dataSource={record.productOptions}
                  renderItem={(item) => (
                    <List.Item>
                      <Row justify="space-between" style={{ width: '100%',padding:"0 60px" }}>
                        <div>Size: {item.size}</div>
                        <div>{(record.price + item.price).toLocaleString()}VNĐ</div>
                      </Row>
                    </List.Item>
                  )}
                />
              )
            },
            rowExpandable: (record) => record.productOptions.length > 0
          }}
          loading={productList.load}
        />
      </div>
    </div>
  );
}

export default ProductListPage;
