import { useEffect, useState } from 'react';
import {
  Modal,
  Form,
  Input,
  Image,
  Button,
  Radio,
  Col,
  Row,
  Select,
  Upload,
  Space
} from "antd";
import * as Icon from "@ant-design/icons";
import * as Style from './styles'
import { convertFileToBase64 } from '../../../../utils/common'
function ModifyAccountModal({
  isShowModifyModal,
  setIsShowModifyModal,
  handleSubmitForm,
  modifyUserData,
  userList,
  uploadImages,
  setUploadImage
}) {
  const [modifyAccountForm] = Form.useForm();
  console.log("🚀 ~ file: ModifyAccountModal.jsx ~ line 25 ~ uploadImages", modifyUserData)
  const [uploadError, setUploadError] = useState('');
  const { Option } = Select;

  useEffect(() => {
    if (isShowModifyModal) {
      modifyAccountForm.resetFields();
      setUploadImage(modifyUserData?.avatar);
    }
  }, [isShowModifyModal], [modifyUserData]);
  async function handleUploadImage(value) {
    if (!["image/png", "image/jpeg"].includes(value.file.type)) {
      return setUploadError('File không đúng!');
    }
    if (value.file.size > 1024000) {
      return setUploadError('File quá nặng!');
    }
    setUploadError('');
    const imageBase64 = await convertFileToBase64(value.file);
    await setUploadImage(imageBase64);
  }
  return (
    <Modal
      title="Sửa thông tin"
      visible={!!isShowModifyModal}
      // onOk={() => modifyAccountForm.submit()}
      onCancel={() => setIsShowModifyModal('')}
      footer={[
        <Button key="back" onClick={() => setIsShowModifyModal('')}>
          Hủy
        </Button>,
        <Button key="back" type="primary" onClick={() => modifyAccountForm.submit()}>
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={modifyAccountForm}
        name="modify-Account"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={modifyUserData}
        onFinish={(values) => handleSubmitForm(values)}

      >
        <Form.Item
          label="Tên: "
          name="name"
          rules={[{ required: true, message: "Bạn chưa nhập tên!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Giới tính: "
          name="gender"
          rules={[{ required: true, message: "Bạn chưa chọn giới tính!" }]}
        >
          <Radio.Group>
            <Radio value="female">Nữ</Radio>
            <Radio value="male">Nam</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="hinh ảnh:"
        >
          <Upload name="logo"
            showUploadList={false}
            beforeUpload={() => false}
            onChange={(value) => handleUploadImage(value)}
            listType="picture-card">
            <Style.ShowUploadImage uploadImages={uploadImages} >
              <Icon.PlusOutlined />
            </Style.ShowUploadImage>
          </Upload>
          <div style={{ height: 24, color: '#ff4d4f' }}>
            {uploadError}
          </div>
        </Form.Item>
        <Form.Item
          label="Trạng thái: "
          name="status"
          rules={[{ required: true, message: "Bạn chưa chọn trạng thái!" }]}
        >
          <Select>
            <Option value="active">Kích hoạt</Option>
            <Option value="block">Khóa</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ModifyAccountModal;