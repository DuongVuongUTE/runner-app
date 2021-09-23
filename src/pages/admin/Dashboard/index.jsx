import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Spin } from "antd";
import {
  ComposedChart,
  Bar,
  Tooltip,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  AreaChart,
  ResponsiveContainer,
} from "recharts";
import moment from "moment";
import * as Icons from "@ant-design/icons";
import * as Style from "./styles";
import history from "../../../utils/history";

import {
  getTotalSoldOrderWeek,
  getTotalSoldOrderMonth,
  getOrderListAction,
} from "../../../redux/actions";
const STATUS = {
  waiting: "Đang chờ",
  shipping: "Đang chuyển hàng",
  delivery: "Đã giao",
  confirm: "xác nhận",
};

function AdminDashboardPage(props) {
  const cunrentMonth = moment().format("MM");
  const countDayOfMonth = moment().daysInMonth();
  const dataMonth = [];
  const dataWeek = [];
  const firstDayOfWeek = parseInt(moment().startOf("isoweek").format("D"));
  const { orderList } = useSelector((state) => state.orderReducerAdmin);
  const { totalProductOrder } = useSelector((state) => state.orderReducerAdmin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotalSoldOrderMonth());
    dispatch(getTotalSoldOrderWeek());
    dispatch(
      getOrderListAction({
        page: 1,
      })
    );
  }, []);

  for (let i = 1; i <= countDayOfMonth; i++) {
    let count = 0;
    totalProductOrder.dataMonth.forEach((item) => {
      if (parseInt(moment(item.createdAt).format("D")) == i) {
        count = count + 1;
      }
    });
    dataMonth.push({
      name: i,
      sl: count,
      pv: i,
    });
  }
  for (let i = 0; i <= 6; i++) {
    let count = 0;
    totalProductOrder.dataWeek.forEach((item) => {
      if (parseInt(moment(item.createdAt).format("D")) == firstDayOfWeek + i) {
        count = count + 1;
      }
    });
    dataWeek.push({
      name:i==6 ? `CN` :  `T${i+2}`,
      sl: count,
      pv: i,
    });
  }
  
  const tableColumn = [
    {
      title: "Người Đặt",
      dataIndex: "user",
      width: 150,
      key: "user",
      sorter: (a, b) => a.user.name?.length - b.user.name?.length,
      render: (value) => value?.name,
    },
    {
      title: "Người Nhận",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
    },
    {
      title: "SĐT",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      width: 150,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 300,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 150,
      sorter: (a, b) => a.totalPrice - b.totalPrice,
      render: (value) => `${value.toLocaleString()}VNĐ`,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 150,
      filters: [
        {
          value: "waiting",
          text: STATUS.waiting,
        },
        {
          value: "shipping",
          text: STATUS.shipping,
        },
        {
          value: "delivery",
          text: STATUS.delivery,
        },
        {
          value: "confirm",
          text: STATUS.confirm,
        },
      ],
      onFilter: (value, record) => {
        return record.status == value;
      },
      render: (value) => (
        <p
          style={{
            color:
              value === "waiting"
                ? "#52c41a"
                : value === "delivery"
                ? "#d4380d"
                : value === "confirm"
                ? "#13c2c2"
                : "#fadb14",
          }}
        >
          {STATUS[value]}
        </p>
      ),
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
        <Style.Title>Dashboard</Style.Title>
      </Style.ContentHeader>
      <Style.ChartContainer>
        <Row gutter={[15, 15]}>
          <Col xl={{ span: 12 }} xs={{ span: 24 }}>
            <Style.ShowTotalItem className="week">
              <h3>Thống kê đơn hàng bán được trong Tuần</h3>
              {totalProductOrder.load ? (
                <Spin />
              ) : (
                <ResponsiveContainer height={200}>
                  <ComposedChart
                    style={{ background: "white" }}
                    data={dataWeek}
                  >
                    <XAxis dataKey="name" />
                    <Tooltip />
                    <CartesianGrid stroke="#f5f5f5" />
                    <Bar dataKey="sl" barSize={20} fill="#413ea0" />
                  </ComposedChart>
                </ResponsiveContainer>
              )}
            </Style.ShowTotalItem>
          </Col>
          <Col xl={{ span: 12 }} xs={{ span: 24 }}>
            <Style.ShowTotalItem className="month">
              <h3>Thống kê đơn hàng bán được trong Tháng {cunrentMonth}</h3>
              {totalProductOrder.load ? (
                <Spin />
              ) : (
                <ResponsiveContainer height={200}>
                  <AreaChart style={{ background: "white" }} data={dataMonth}>
                    <defs>
                      <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="name" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="sl"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorUv)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </Style.ShowTotalItem>
          </Col>
        </Row>
      </Style.ChartContainer>
      <p style={{margin:20}}> 10 đơn hàng mới nhất </p>
      <Style.CustomTable
        size="small"
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
