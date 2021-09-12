import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { List, Row, Input, Table,Col } from "antd";
import moment from "moment";
import * as Icon from "@ant-design/icons";

import {
  getUserListAction,
} from "../../../redux/actions";

import * as Style from './styles'

function CustomerListPage(props) {

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
  function totalPriceProduct(value) {
    return value.reduce((total, orderItem) => {
      return orderItem.totalPrice ? total + orderItem.totalPrice : total
    }, 0)
  }
  function totalCountProduct(orders) {
    let countProduct = 0;
    orders.forEach((item) => {
      countProduct = countProduct + item.products.reduce((total, itemPr) => {
        return total + itemPr.count
      }, 0)
    })
    return countProduct
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
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (value) => value == "female" ? "Nữ" : "Nam"
    },
    {
      title: "Đã mua",
      dataIndex: "orders",
      key: "orders",
      render: (value) => totalCountProduct(value)
    },
    {
      title: "Tổng tiền",
      dataIndex: "orders",
      key: "orders",
      render: (value) => `${(totalPriceProduct(value)).toLocaleString()}VNĐ`
    },

  ];
  const tableColumnChild = [
    {
      title: "Đơn hàng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
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
      render: (value) =>(
        <p style={{color: value==="waiting"? "#52c41a" : "yellow"}}>
          {value}
        </p>
      )
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
                <Style.CustomTableChild
                  pagination={false}
                  columns={tableColumnChild}
                  dataSource={record.orders.map((orderItem, orderIndex) => {
                    return {
                      key: orderIndex,
                      ...orderItem
                    }
                  })}
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
                  
                >

                </Style.CustomTableChild>

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
