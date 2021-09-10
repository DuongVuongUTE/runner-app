import React, { useEffect } from "react";
import { Form, Input, Select, Button, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserProfileAction,
  getUserInfoAction,
} from "../../../../../redux/actions";

const { Title } = Typography;

function ChageInfo() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const { responseAction } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  useEffect(() => {
    if (responseAction.edit_user.load) {
      dispatch(getUserInfoAction());
    }
  }, [responseAction.edit_user]);

  useEffect(() => {
    form.resetFields();
  }, [userInfo.data]);

  const handleChangeInfo = (values) => {
    dispatch(
      editUserProfileAction({
        id: userInfo.data.id,
        data: {
          name: values.name,
          gender: values.gender,
          email: values.email,
          password: values.password,
        },
      })
    );
  };

  return (
    <div>
      <Title
        level={3}
        style={{ textAlign: "center", padding: "0 0 15px", margin: 0 }}
      >
        Thay đổi thông tin cá nhân
      </Title>
      <div>
        <Form
          form={form}
          name="change-info"
          layout="vertical"
          initialValues={
            userInfo.data
              ? {
                  name: userInfo.data.name,
                  email: userInfo.data.email,
                  gender: userInfo.data.gender,
                }
              : {}
          }
          onFinish={(values) => handleChangeInfo(values)}
        >
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Bạn chưa nhập email ahihi!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Giới tính"
            name="gender"
            rules={[{ required: true, message: "Bạn chưa nhập giới tính!" }]}
          >
            <Select>
              <Select.Option value="male">Nam</Select.Option>
              <Select.Option value="female">Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="password"
            rules={[
              { required: true, message: "Bạn chưa nhập mật khẩu!" },
              { min: 6, max: 16, message: "Mật khẩu phải từ 6-16 kí tự" },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Xác nhận mật khẩu mới"
            name="prePassword"
            rules={[
              { required: true, message: "Bạn chưa xác nhận mật khẩu!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Mật khẩu xác nhận không đúng!");
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={responseAction.edit_user.load}
          >
            Thay đổi
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default ChageInfo;
