import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Row, Input, Col } from "antd";
import moment from "moment";
import * as Icon from "@ant-design/icons";
// import ModifyProductModal from "./components/ModifyProductModal";

import {
  getUserListAction,
} from "../../../redux/actions";

import * as Style from './styles'

function CustomerListPage(props) {

  const [modifyUserData, setModifyUserData] = useState({});
  const { userList } = useSelector((state) => state.userReducer);
  const [searchKey, setSearchKey] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListAction(
      {
        role: "user"
      }
    ));
  }, []);

  function handleSearchCustomer(value) {
    setSearchKey(value);
    dispatch(getUserListAction({
      searchKey: value,
      role: "user"
    }));
  }

  const tableColumn = [
    {
      dataIndex: "avatar",
      key: "avatar",
      render: (value) => (<Style.ImageItem image={value}></Style.ImageItem>)
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend'],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tổng tiền",
      dataIndex: "orders",
      key: "orders",
      render: (value) => value[0] &&` ${(value[0].totalPrice).toLocaleString()}VNĐ`
    },

  ];

  const tableData = userList.data.map((userItem, userIndex) => {
    return {
      key: userIndex,
      ...userItem,
    };
  });

  return (
    <div>
      <div style={{ padding: 16 }}>
        <Style.Title>Quản lý khách hàng</Style.Title>
        <Style.Search>
          <Input
            style={{ width: "50%" }} placeholder="Tìm kiếm..."
            suffix={<Icon.SearchOutlined />}
            onChange={(e) => handleSearchCustomer(e.target.value)}
          />
        </Style.Search>
        <Style.CustomTable
          style={{ marginTop: 10 }}
          columns={tableColumn}
          dataSource={tableData}
          loading={userList.load}
          expandable={{
            expandedRowRender: (record) => {
              return (
                <List
                  size="small"
                  dataSource={record.orders[0].products}
                  renderItem={(item) => (
                    <Style.ListItem>
                      <Row justify="space-between" style={{ width: '100%', padding: "0 60px",textAlign:"end" }}>
                        <Col span={6}>
                          {/* <img src={item.image}></img> */}
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
            rowExpandable: (record) => record.orders?.length > 0
          }}
        />
      </div>
    </div>
  );
}

export default CustomerListPage;
