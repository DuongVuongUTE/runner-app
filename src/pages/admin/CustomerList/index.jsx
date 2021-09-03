import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table, Space, Popconfirm } from "antd";
import moment from "moment";

// import ModifyProductModal from "./components/ModifyProductModal";

import {
  getUserListAction,
} from "../../../redux/actions";

import * as Style from './styles'

function CustomerListPage(props) {
  // "", "create", "edit"
  // const [isShowModifyModal, setIsShowModifyModal] = useState("");
  const [modifyUserData, setModifyUserData] = useState({});
  const { userList } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListAction(
      {
        role:"user"
      }
    ));
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
            <Popconfirm
              title="Are you sure to delete this User?"
              // onConfirm={() => dispatch(deleteUserAction({ id: record.id }))}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
            </Popconfirm>
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
        <Style.Title>Quản lý khách hàng</Style.Title>
        
        <Table
          style={{ marginTop: 40 }}
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

export default CustomerListPage;
