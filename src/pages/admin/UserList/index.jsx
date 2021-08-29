import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Table, Space, Popconfirm } from "antd";
import moment from "moment";

// import ModifyProductModal from "./components/ModifyProductModal";

import {
  getUserListAction,
} from "../../../redux/actions";

function UserListPage(props) {
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
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Create At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Update At",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Action",
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
              Edit
            </Button>
            <Popconfirm
              title="Are you sure to delete this User?"
              // onConfirm={() => dispatch(deleteUserAction({ id: record.id }))}
              onCancel={() => null}
              okText="Yes"
              cancelText="No"
            >
              <Button danger>Delete</Button>
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
        <div>User Manage</div>
        <Row justify="end" style={{ marginBottom: 16 }}>
          <Button
            type="primary"
            onClick={() => {
              // setIsShowModifyModal("create");
              setModifyUserData({ name: "", price: 0 });
            }}
          >
            Add User
          </Button>
        </Row>
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

export default UserListPage;
