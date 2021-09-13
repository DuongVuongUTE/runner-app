import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Row,
  Button,
  Input,
  Space,
  List,
  Col
} from "antd";
import UpdateStatusModel from "./components/UpdateStatusModel";

import * as Icon from "@ant-design/icons";

import {
  getOrderListAction,
  editOrderListAction,
} from '../../../redux/actions';

import * as Style from './styles'

function OrderListPage() {

  const [searchKey, setSearchKey] = useState('');
  const [isShowUpdateModal, setIsShowUpdateModal] = useState('');
  const [orderData, setOrderData] = useState({});
  const { orderList } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderListAction());
  }, []);

  const tableColumn = [
    {
      title: 'Tên khách hàng',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'SĐT',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value) => `${(value).toLocaleString()}VNĐ`
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value) => (
        <p style={{
          color: value === "waiting"
            ? "#52c41a"
            : value === "delivery" ? "#d4380d" : "#fadb14"
        }}>
          {value}
        </p>
      )
    },
    {
      title: '',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <Space>
            <Button
              icon={<Icon.FormOutlined />}
              type="primary"
              ghost
              onClick={() => {
                setIsShowUpdateModal(true);
                setOrderData(record);
              }}
            >
              Cập nhật trạng thái
            </Button>
          </Space>
        )
      }
    },
  ];
  function handleSubmitForm(values) {
    dispatch(editOrderListAction({
      id: orderData.id,
      data: {
        ...values
      },
    }));
    setIsShowUpdateModal('');
  }

  const tableData = orderList.data.map((orderItem, orderIndex) => {
    return {
      key: orderIndex,
      ...orderItem,
    };
  });
  function handleSearchOrder(value) {
    setSearchKey(value);
    dispatch(getOrderListAction({
      searchKey: value,
    }));
  }
  return (
    <>
      <div>
        <div style={{ padding: 10 }}>
          {/* <Style.Title>Quản lý khách hàng</Style.Title> */}
          <Style.Search>
            <Input
              style={{ width: "50%" }} placeholder="Tìm kiếm..."
              suffix={<Icon.SearchOutlined />}
              onChange={(e) => handleSearchOrder(e.target.value)}
            />
          </Style.Search>
          <Style.CustomTable
            style={{ marginTop: 10 }}
            columns={tableColumn}
            dataSource={tableData}
            loading={orderList.load}
            expandable={{
              expandedRowRender: (record) => {
                return (
                  <List
                    size="small"
                    dataSource={record.products}
                    renderItem={(item) => (
                      <Style.ListItem>
                        <Row justify="space-between" style={{ width: '100%', padding: "0 60px", textAlign: "end" }}>
                          <Col span={6}>
                            <Style.ShowImage src={item.image}></Style.ShowImage>
                          </Col>
                          <Col span={6}>{item.name}</Col>
                          <Col span={6}>SL: {item.count}</Col>
                          <Col span={6}>Tổng tiền: {(item.price).toLocaleString()}VNĐ</Col>
                        </Row>
                      </Style.ListItem>
                    )}
                  />
                )
              },
              rowExpandable: (record) => record.products?.length > 0
            }}
          />

        </div>
        <UpdateStatusModel
          isShowUpdateModal={isShowUpdateModal}
          setIsShowUpdateModal={setIsShowUpdateModal}
          handleSubmitForm={handleSubmitForm}
          orderData={orderData}
        />
      </div>
    </>
  )
}
export default OrderListPage