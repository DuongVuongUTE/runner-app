import { useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  Form,
  Radio,
  Space,
  notification,
} from "antd";
import { useSelector, useDispatch } from "react-redux";

import { orderProductAction } from "../../../redux/actions";
import { Container } from "../../../styles/styles";

function CheckoutPage() {
  const [checkoutForm] = Form.useForm();

  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);

  const dispatch = useDispatch();

  let totalPrice = 0;

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.resetFields();
    }
  }, [userInfo.data.id]);

  function handleOrder(values) {
    notification.success({
      message: "Đặt hàng thành công",
      description: "Cảm ơn quý khách đã mua hàng.",
    });
    dispatch(
      orderProductAction({
        id: userInfo.data.id,
        data: {
          userId: userInfo.data.id,
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address: values.address,
          products: cartList.data,
          totalPrice,
          checkoutInfo: values.checkoutInfo,
          status: "waiting",
        },
      })
    );
  }

  function renderCartItems() {
    return cartList.data.map((cartItem, cartIndex) => {
      totalPrice = totalPrice + cartItem.price * cartItem.count;
      return (
        <Row key={`cart-${cartItem.id}`} style={{ marginBottom: 8 }}>
          <Col xs={24} sm={24} md={24} lg={12} xl={8}>
            <div>Tên sản phẩm: {cartItem.name}</div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div>Giá: {cartItem.price.toLocaleString()}₫</div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={4}>
            <div>Số lượng: {cartItem.count}</div>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} xl={6}>
            <div>
              Tổng giá: {(cartItem.price * cartItem.count).toLocaleString()}
            </div>
          </Col>
        </Row>
      );
    });
  }

  return (
    <Container>
      <div style={{ padding: "40px 0" }}>
        <h2 style={{ textAlign: "center", marginBottom: 30 }}>
          Thủ tục thanh toán
        </h2>
        <Form
          form={checkoutForm}
          name="basic"
          layout="vertical"
          initialValues={{
            name: userInfo.data.name,
            email: userInfo.data.email,
          }}
          onFinish={(values) => handleOrder(values)}
        >
          <Card title="Thông tin đơn hàng" size="small">
            {renderCartItems()}
          </Card>
          <Card
            title="Thông tin cá nhân"
            size="small"
            style={{ margin: "16px 0" }}
          >
            <Row gutter={16}>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Tên khách hàng"
                  name="name"
                  rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "Vui lòng nhập email!" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập số điện thoại!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    { required: true, message: "Vui lòng nhập địa chỉ!" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card title="Thông tin thanh toán" size="small">
            <Form.Item
              name="checkoutInfo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn phương thức thanh toán!",
                },
              ]}
            >
              <Radio.Group>
                <Space direction="vertical">
                  <Radio value="cod">Thanh toán khi nhận hàng</Radio>
                  <Radio value="momo">Momo</Radio>
                  <Radio value="zalo">Zalo Pay</Radio>
                  <Radio value="atm">Thẻ ATM</Radio>
                  <Radio value="visa">Thẻ VISA, Master, JCB</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
          </Card>
          <Button htmlType="submit" type="primary" style={{ marginTop: 16 }}>
            Thanh Toán
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default CheckoutPage;
