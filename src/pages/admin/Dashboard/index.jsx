import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Spin, List, Row, Table } from 'antd';
import moment from "moment";
import * as Icon from "@ant-design/icons";
import * as Style from './styles'
import history from '../../../utils/history';

import {
  getTotalSoldOrderWeek,
  getTotalSoldOrderMonth,
  getProductListActionAdmin,
  getCategoryListAction
} from "../../../redux/actions";



function AdminDashboardPage(props) {

  const { totalProcuctOrder } = useSelector((state) => state.orderReducerAdmin);
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { productList } = useSelector((state) => state.productReducerAdmin);
  const dispatch = useDispatch();
  console.log("🚀 ~ file: index.jsx ~ line 19 ~ AdminDashboardPage ~ totalSoldOrderWeek", totalProcuctOrder)
  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getTotalSoldOrderMonth());
    dispatch(getTotalSoldOrderWeek());
    dispatch(getProductListActionAdmin({
      page: 1
    }));
  }, []);

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
    }
  ];

  const tableData = productList.data.map((productItem, productIndex) => {
    return {
      key: productIndex,
      ...productItem,
    };
  });

  return (
    <div>
      <Style.ContentHeader>
        <Style.Title >Dashboard</Style.Title>
        <Style.CustomSpaceBox size={[30, 30]}>
          <Style.ShowTotalItem className="week" >
            <h3>Tổng sản phẩm bán được trong Tuần</h3>
            {totalProcuctOrder.load
              ? <Spin />
              : <span>{totalProcuctOrder?.totalWeek}</span>
            }
          </Style.ShowTotalItem>
          <Style.ShowTotalItem className="month" >
            <h3>Tổng sản phẩm bán được trong Tháng</h3>
            {totalProcuctOrder.load
              ? <Spin />
              : <span>{totalProcuctOrder?.totalMonth}</span>
            }
          </Style.ShowTotalItem>
        </Style.CustomSpaceBox>
      </Style.ContentHeader>
      <p> 10 sản phẩm mới nhất </p>
      <Style.CustomTable
        scroll={{ y: 390, x: 1000 }}
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

  );
}
export default AdminDashboardPage;
