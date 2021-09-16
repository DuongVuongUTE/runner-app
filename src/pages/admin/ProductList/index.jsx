import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Space, Popconfirm, List, Input } from "antd";
import * as Icon from "@ant-design/icons";
import history from "../../../utils/history";
import UpdateQuantityModel from "./components/UpdateQuantityModel";
import moment from "moment";

import {
  setProductSelectActionAdmin,
  getCategoryListAction,
  getProductListActionAdmin,
  deleteProductActionAdmin,
  editProductActionAdmin
} from "../../../redux/actions";

import * as Style from './styles'

function ProductListPage(props) {

  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { productList } = useSelector((state) => state.productReducerAdmin);
  const [searchKey, setSearchKey] = useState('');

  const [isShowUpdateModal, setIsShowUpdateModal] = useState('');
  const [quantityData, setQuantityData] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListActionAdmin());
  }, []);

  function handleSearchProduct(value) {
    console.log("🚀 ~ file: index.jsx ~ line 31 ~ handleSearchProduct ~ value", value)
    setSearchKey(value);
    dispatch(getProductListActionAdmin({
      searchKey: value
    }));
  }
  const categoryFillter = categoryList.data.map((item, index) => {
    return {
      text: item.name,
      value: item.id,
    }
  })

  const tableColumn = [
    {
      dataIndex: "images",
      key: "images",
      render: (value) => (<Style.ShowImage src={value[0]}></Style.ShowImage>)
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: "Loại",
      dataIndex: "categoryId",
      key: "categoryId",
      filters: [
        ...categoryFillter
      ],
      onFilter: (value, record) => {
        return record.categoryId == value
      },
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
      sorter: (a, b) => a.price - b.price,
      render: (value) => value.toLocaleString(),
    },
    {
      title: "Màu",
      dataIndex: "color",
      key: "color",
      render: (value) => (<Style.ShowColor color={value}></Style.ShowColor>),
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (value) => value ? value : 0
    },
    {
      title: "Số lượng đã bán",
      dataIndex: "sold",
      key: "sold",
      render: (value) => value ? value : 0
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
              icon={<Icon.EditOutlined />}
              type="primary"
              ghost
              onClick={() => {
                setIsShowUpdateModal(true);
                setQuantityData(record);
              }}
            >
              Cập nhật SL
            </Button>
            <Button
              icon={<Icon.FormOutlined />}
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
              <Button icon={<Icon.DeleteOutlined />} danger>Xóa</Button>
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

  function handleSubmitForm(values) {
    const { quantityAdd, quantity } = values
    const quantityNew =
      quantity
        ? parseInt(parseInt(quantityAdd) + parseInt(quantity))
        : parseInt(quantityAdd)
    dispatch(editProductActionAdmin({
      id: quantityData.id,
      data: {
        quantity: quantityNew
      },
    }))
    setIsShowUpdateModal('');
  }

  return (
    <div>
      <div style={{ padding: 10 }}>
        <Style.CustomSpaceBox>
          <Style.Title>Quản lý sản phẩm</Style.Title>
          <Style.CustomSpace>
            <Style.Search>
              <Input
                style={{}} placeholder="Tìm kiếm..."
                suffix={<Icon.SearchOutlined />}
                onChange={(e) => handleSearchProduct(e.target.value)}
              />
            </Style.Search>
            <Style.CustomButton
              type="primary"
              onClick={() => history.push('/admin/products/create')}
            >
              Thêm mới
            </Style.CustomButton>
          </Style.CustomSpace>
        </Style.CustomSpaceBox>
        <Style.CustomTable
          scroll={{ y: 370, x:2000 }}
          columns={tableColumn}
          dataSource={tableData}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <List
                  size="small"
                  dataSource={record.productOptions}
                  renderItem={(item) => (
                    <Style.ListItem>
                      <Row justify="space-between" style={{ width: '100%', padding: "0 60px" }}>
                        <div>Size: {item.size}</div>
                        <div>{(record.price + item.price).toLocaleString()}VNĐ</div>
                      </Row>
                    </Style.ListItem>
                  )}
                />
              )
            },
            rowExpandable: (record) => record.productOptions?.length > 0
          }}
          loading={productList.load}
        />
      </div>
      <UpdateQuantityModel
        isShowUpdateModal={isShowUpdateModal}
        setIsShowUpdateModal={setIsShowUpdateModal}
        handleSubmitForm={handleSubmitForm}
        quantityData={quantityData}
      />
    </div>
  );
}

export default ProductListPage;
