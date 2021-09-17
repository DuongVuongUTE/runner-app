import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Spin, List, Row, Table } from 'antd';
import { ComposedChart, Legend, Bar, Tooltip, Area, Line, CartesianGrid, XAxis, YAxis, AreaChart } from 'recharts';
import moment from "moment";
import * as Icon from "@ant-design/icons";
import * as Style from './styles'
import history from '../../../utils/history';

import {
  getTotalSoldOrderWeek,
  getTotalSoldOrderMonth,
  getOrderListAction,
  getCategoryListAction
} from "../../../redux/actions";
const STATUS = {
  waiting: "Đang chờ",
  shipping: "Đang chuyển hàng",
  delivery: "Đã giao",
  confirm: "xác nhận"
}

function AdminDashboardPage(props) {

  const firstOfWeek = moment().month("Feb").format("DD/MM/YYYY") ;
  console.log("🚀 ~ file: index.jsx ~ line 25 ~ AdminDashboardPage ~ firstOfWeek", firstOfWeek)

  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { orderList } = useSelector((state) => state.orderReducerAdmin);
  const { totalProductOrder } = useSelector((state) => state.orderReducerAdmin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getTotalSoldOrderMonth());
    dispatch(getTotalSoldOrderWeek());
    dispatch(getOrderListAction({
      page: 1
    }));
  }, []);

  const monday = totalProductOrder.dataWeek.filter((item) => {
    return moment(item.createdAt).format("DD/MM/YYYY") === moment().day("Monday").format("DD/MM/YYYY")
  })
  const tuesday = totalProductOrder.dataWeek.filter((item) => {
    return moment(item.createdAt).format("DD/MM/YYYY") === moment().day("Tuesday").format("DD/MM/YYYY")
  })
  const wednesday = totalProductOrder.dataWeek.filter((item) => {
    return moment(item.createdAt).format("DD/MM/YYYY") === moment().day("Wednesday").format("DD/MM/YYYY")
  })
  const thursday = totalProductOrder.dataWeek.filter((item) => {
    return moment(item.createdAt).format("DD/MM/YYYY") === moment().day("Thursday").format("DD/MM/YYYY")
  })
  const friday = totalProductOrder.dataWeek.filter((item) => {
    return moment(item.createdAt).format("DD/MM/YYYY") === moment().day("Friday").format("DD/MM/YYYY")
  })
  const saturday = totalProductOrder.dataWeek.filter((item) => {
    return moment(item.createdAt).format("DD/MM/YYYY") === moment().day("Saturday").format("DD/MM/YYYY")
  })
  const sunday = totalProductOrder.dataWeek.filter((item) => {
    return moment(item.createdAt).format("DD/MM/YYYY") === moment().day("Sunday").format("DD/MM/YYYY")
  })

  function countProductSold(data) {
    let countProduct = 0
    data.forEach((item) => {
      countProduct = countProduct + item.products.reduce((total, itemProduct) => {
        return total + itemProduct.count
      }, 0)
    })
    return countProduct
  }

  console.log(sunday)

  const data = [
    { name: 'Thứ 2', sl: countProductSold(monday), pv: 1 },
    { name: 'Thứ 3', sl: countProductSold(tuesday), pv: 2 },
    { name: 'Thứ 4', sl: countProductSold(wednesday), pv: 3 },
    { name: 'Thứ 5', sl: countProductSold(thursday), pv: 4 },
    { name: 'Thứ 6', sl: countProductSold(friday), pv: 5 },
    { name: 'Thứ 7', sl: countProductSold(saturday), pv: 6 },
    { name: 'Chủ nhật', sl: countProductSold(sunday), pv: 7 }
  ];

  const tableColumn = [
    {
      title: 'Người Đặt',
      dataIndex: 'user',
      width: 150,
      key: 'user',
      sorter: (a, b) => a.user.name?.length - b.user.name?.length,
      render: (value) => value?.name
    },
    {
      title: 'Người Nhận',
      dataIndex: 'name',
      key: 'name',
      width: 150,
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
      width: 150,
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
      width: 150,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (value) => `${(value).toLocaleString()}VNĐ`
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      filters: [
        {
          value: "waiting",
          text: STATUS.waiting
        },
        {
          value: "shipping",
          text: STATUS.shipping
        },
        {
          value: "delivery",
          text: STATUS.delivery
        },
        {
          value: "confirm",
          text: STATUS.confirm
        }
      ],
      onFilter: (value, record) => {
        return record.status == value
      },
      render: (value) => (
        <p style={{
          color: value === "waiting"
            ? "#52c41a"
            : value === "delivery"
              ? "#d4380d"
              : value === "confirm"
                ? "#13c2c2"
                : "#fadb14"
        }}>
          {STATUS[value]}
        </p>
      )
    },

  ];

  const tableData = orderList.data.map((orderItem, orderIndex) => {
    return {
      key: orderIndex,
      ...orderItem,
    };
  });

  return (
    <Style.ContentBox>
      <Style.ContentHeader>
        <Style.Title >Dashboard</Style.Title>
        <Style.CustomSpaceBox size={[30, 30]}>
          <Style.ShowTotalItem className="week" >
            <h3>Thống kê sản phẩm bán được trong Tuần</h3>
            {totalProductOrder.load
              ? <Spin />
              : <ComposedChart style={{ background: "white" }} width={350} height={180} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="name" />
                <Tooltip />
                <CartesianGrid stroke="#f5f5f5" />
                <Bar dataKey="sl" barSize={20} fill="#413ea0" />
              </ComposedChart>
            }
          </Style.ShowTotalItem>
          <Style.ShowTotalItem className="month" >
            <h3>Tổng sản phẩm bán được trong Tháng</h3>
            {totalProductOrder.load
              ? <Spin />
              : <span>{totalProductOrder?.totalMonth}</span>
            }
          </Style.ShowTotalItem>
        </Style.CustomSpaceBox>
      </Style.ContentHeader>
      <p> 10 đơn hàng mới nhất </p>
      <Style.CustomTable
        pagination={false}
        scroll={{ x: 1500 }}
        columns={tableColumn}
        dataSource={tableData}
        loading={orderList.load}

      />

    </Style.ContentBox>

  );
}
export default AdminDashboardPage;
