import { useEffect } from 'react';
import {
  Modal,
  Form,
  Input,
  Button,
  Select
} from "antd";

function UpdateStatusModel({
  isShowUpdateModal,
  setIsShowUpdateModal,
  handleSubmitForm,
  orderData,
}) {

  const { Option } = Select;
  const [modifyCategoryForm] = Form.useForm();

  useEffect(() => {
    if (isShowUpdateModal) {
      modifyCategoryForm.resetFields();
    }
  }, [isShowUpdateModal]);

  return (
    <Modal
      title="Cập nhật trạng thái"
      visible={!!isShowUpdateModal}
      onCancel={() => setIsShowUpdateModal('')}
      footer={[
        <Button key="back" onClick={() => setIsShowUpdateModal('')}>
          Hủy
        </Button>,
        <Button key="back" type="primary" onClick={() => modifyCategoryForm.submit()}>
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={modifyCategoryForm}
        name="modify-category"
        labelCol={{ span: 5 }}
        wrapperCol={{ span: 19 }}
        initialValues={orderData}
        onFinish={(values) => handleSubmitForm(values)}

      >
        <Form.Item
          label="Trạng thái: "
          name="status"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Select style={{ width: 120 }} >
            <Option value="waiting"> waiting </Option>
            <Option value="shipping">shipping</Option>
            <Option value="delivery">delivery</Option>
          </Select>
        </Form.Item>

      </Form>
    </Modal>
  );
}

export default UpdateStatusModel;
