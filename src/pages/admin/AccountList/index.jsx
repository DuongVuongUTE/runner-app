import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Table, Space, Popconfirm } from "antd";
import moment from "moment";

import {
  getUserListAction,
} from "../../../redux/actions";

import * as Style from './styles'

function AccountListPage(props) {

  const [modifyUserData, setModifyUserData] = useState({});
  const { userList } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, []);

  function handleSubmitForm(values) {
  }

  const tableColumn = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (value)=> value == 0 ? "Khóa":"Kích Hoạt"
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              ghost
              onClick={() => {
                // setIsShowModifyModal("edit");
                setModifyUserData(record);
              }}
            >
              Sửa
            </Button>

          </Space>
        );
      },
    },
  ];

  const tableData = userList.data.map((userItem, userIndex) => {
    return {
      key: userIndex,
      ...userItem,
    };
  });
  console.log(
    "🚀 ~ file: index.jsx ~ line 114 ~ tableData ~ tableData",
    tableData
  );

  return (
    <div>
      <div style={{ padding: 16 }}>
        <Style.Title style={{ marginBottom: 26 }} >Quản Lý tài khoản</Style.Title>

        <Table
          columns={tableColumn}
          dataSource={tableData}
          loading={userList.load}
        />
      </div>
      {/* <ModifyUserModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyUserData={modifyUserData}
        categoryList={categoryList}
      /> */}
    </div>
  );
}

export default AccountListPage;
