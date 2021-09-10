import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Button, Input, Space } from "antd";
import moment from "moment";
import * as Icon from "@ant-design/icons";
import ModifyAccountModal from "./components/ModifyAccountModal";

import {
  getUserListAction,
  editUserListAction
} from "../../../redux/actions";

import * as Style from './styles'

function AccountListPage(props) {

  const [uploadImages, setUploadImage] = useState();
  const [isShowModifyModal, setIsShowModifyModal] = useState(false);
  const [modifyUserData, setModifyUserData] = useState({});
  const { userList } = useSelector((state) => state.userReducer);
  const [searchKey, setSearchKey] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListAction());
  }, []);

  function handleSubmitForm(values) {

    dispatch(editUserListAction({
      id: modifyUserData.id,
      data: {
        ...values,
        avatar: uploadImages
      },
    }));

    setIsShowModifyModal('');
  }

  const tableColumn = [
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
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.createdAt - b.createdAt,
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Ngày sửa",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => a.updatedAt - b.updatedAt,
      render: (value) => value && moment(value).format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: 'Kích hoạt',
          value: 'active'
        },
        {
          text: 'Khóa',
          value: 'block'
        }
      ],
      onFilter: (value, record) => {
        return record.status == value
      },
      render: (value) => value == "block"
        ? (<span style={{ color: 'red', whiteSpace: "500" }}>Khóa</span>)
        : (<span style={{ color: '#52c41a', whiteSpace: "500" }}>Kích hoạt</span>)
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
                setIsShowModifyModal("edit");
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
  function handleSearchAccount(value) {
    setSearchKey(value);
    dispatch(getUserListAction({
      searchKey: value
    }));
  }

  return (
    <div>
      <div style={{ padding: 16 }}>
        <Style.Title style={{ marginBottom: 26 }} >Quản Lý tài khoản</Style.Title>
        <Style.Search>
          <Input
            style={{ width: "50%" }} placeholder="Tìm kiếm..."
            suffix={<Icon.SearchOutlined />}
            onChange={(e) => handleSearchAccount(e.target.value)}
          />
        </Style.Search>
        <Style.CustomTable
          columns={tableColumn}
          dataSource={tableData}
          loading={userList.load}
        />
      </div>
      <ModifyAccountModal
        isShowModifyModal={isShowModifyModal}
        setIsShowModifyModal={setIsShowModifyModal}
        handleSubmitForm={handleSubmitForm}
        modifyUserData={modifyUserData}
        userList={userList}
        uploadImages={uploadImages}
        setUploadImage={setUploadImage}
      />
    </div>
  );
}

export default AccountListPage;
