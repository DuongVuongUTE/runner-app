import { useEffect, useState } from "react";
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
  Tag,
  Steps,
  Table,
  Image,
  Select,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../../../components/Loading";

import {
  editProductAction,
  getProductListAction,
  orderProductAction,
} from "../../../redux/actions";
import * as Style from "./style";
import Hero from "../../../components/Hero";
import { COLOR_MENU } from "../../../constants/color";
import axios from "axios";

const { Step } = Steps;

const steps = [
  {
    title: "Đăng nhập",
  },
  {
    title: "Xác minh",
  },
  {
    title: "Hoàn thành",
  },
];

function CheckoutPage() {
  const [checkoutForm] = Form.useForm();

  const { cartList } = useSelector((state) => state.cartReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [location, setLocation] = useState({
    cities: [],
    districts: [],
    wards: [],
  });

  const [locationSelect, setLocationSelect] = useState({
    city: "",
    district: "",
    ward: "",
  });

  const dispatch = useDispatch();

  let totalPrice = 0;

  useEffect(() => {
    dispatch(getProductListAction({ loadHome: true }));
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      setLoading(true);
      const wards = await axios.get(
        "https://location-api-vn.herokuapp.com/wards"
      );
      const districts = await axios.get(
        "https://location-api-vn.herokuapp.com/districts"
      );
      const cities = await axios.get(
        "https://location-api-vn.herokuapp.com/cities"
      );
      setLocation({
        wards: wards.data,
        districts: districts.data,
        cities: cities.data,
      });
      setLoading(false);
    };
    getLocation();
  }, []);

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.resetFields();
    }
  }, [userInfo.data.id]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const columns = [
    {
      title: "Ảnh sản phẩm",
      dataIndex: "image",
      key: "image",
      render: (value) => (
        <Image
          preview={false}
          src={value}
          width={70}
          height={70}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    { title: "Tên sản phẩm", dataIndex: "name", key: "name" },
    { title: "Size", dataIndex: "size", key: "size" },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (value) => value?.toLocaleString() + "₫",
    },
    { title: "Số lượng", dataIndex: "count", key: "count" },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (value) => value?.toLocaleString() + "₫",
    },
  ];

  const data = cartList.data.map((cartItem, cartIndex) => {
    totalPrice = totalPrice + cartItem.price * cartItem.count;
    return {
      key: cartIndex,
      ...cartItem,
      size: cartItem.option.size ? cartItem.option.size : "mặc định",
      totalPrice: cartItem.price * cartItem.count,
      description: (
        <div>
          <Space size={15} wrap align="center">
            <span>
              Hãng giày: <strong>{cartItem.category}</strong>
            </span>
            <span>
              Loại giày: <strong>{cartItem.type}</strong>
            </span>
            <span>
              Sản phẩm: <strong>{cartItem.department}</strong>
            </span>
            <span>
              Màu:{" "}
              <Tag
                color={
                  cartItem.color === "multiColor"
                    ? "#ff514e"
                    : cartItem.color === "ffffff"
                    ? "purple"
                    : `#${cartItem.color}`
                }
              >
                {COLOR_MENU.find((color) => color.code === cartItem.color).name}
              </Tag>
            </span>
          </Space>
        </div>
      ),
    };
  });

  const handleChageCity = (value) => {
    setLocationSelect({
      ...locationSelect,
      city: value,
    });
  };
  const handleChageDistrict = (value) => {
    setLocationSelect({
      ...locationSelect,
      district: value,
    });
  };
  const handleChageWard = (value) => {
    setLocationSelect({
      ...locationSelect,
      ward: value,
    });
  };

  function handleOrder(values) {
    cartList.data?.forEach((cartItem) => {
      let indexProductNew = productList.data?.findIndex(
        (productnew) => productnew.id === cartItem.productId
      );
      if (indexProductNew != -1) {
        let productItemNew = productList?.data[indexProductNew];
        dispatch(
          editProductAction({
            id: productItemNew.id,
            data: {
              quantity: cartItem.quantity - cartItem.count,
              sold: productItemNew.sold + cartItem.count,
            },
          })
        );
      }
    });

    dispatch(
      orderProductAction({
        id: userInfo.data.id,
        data: {
          userId: userInfo.data.id,
          name: values.name,
          email: values.email,
          phoneNumber: values.phoneNumber,
          address:
            values.address +
            " - " +
            location.wards.find((ward) => ward.code === values.ward).name +
            " - " +
            location.districts.find(
              (district) => district.code === values.district
            ).name +
            " - " +
            location.cities.find((city) => city.code === values.city).name,
          products: cartList.data,
          totalPrice,
          checkoutInfo: values.checkoutInfo,
          status: "waiting",
        },
      })
    );
    // next();
    notification.success({
      message: "Đặt hàng thành công",
      description: "Cảm ơn quý khách đã mua hàng.",
    });
  }

  return (
    <>
      {loading ? (
        <Loading load={loading} />
      ) : (
        <Style.OrderPage>
          <Hero title="Thanh toán" />
          <Style.OrderContainer>
            <Style.Title>
              <Steps responsive current={current}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </Style.Title>
            <Style.Content>
              <div>
                <h2 style={{ textAlign: "center", margin: "15px 0 30px" }}>
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
                    {/* {renderCartItems()} */}
                    <Table
                      columns={columns}
                      pagination={false}
                      expandable={{
                        expandedRowRender: (record) => (
                          <p style={{ margin: 0 }}>{record.description}</p>
                        ),
                        rowExpandable: (record) =>
                          record.name !== "Not Expandable",
                      }}
                      scroll={{ x: "max-content" }}
                      dataSource={data}
                    />
                  </Card>
                  <Card
                    title="Thông tin cá nhân"
                    size="small"
                    style={{ margin: "16px 0" }}
                  >
                    <Row gutter={16}>
                      <Col xs={24} md={12} lg={8}>
                        <Form.Item
                          label="Tên khách hàng"
                          name="name"
                          rules={[
                            { required: true, message: "Vui lòng nhập tên!" },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12} lg={8}>
                        <Form.Item
                          label="Email"
                          name="email"
                          rules={[
                            { required: true, message: "Vui lòng nhập email!" },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12} lg={8}>
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
                      <Col xs={24} md={12} lg={8}>
                        <Form.Item
                          label="Tỉnh-Thành phố"
                          name="city"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn tỉnh thành phố!",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Chọn tỉnh thành phố"
                            onChange={handleChageCity}
                            allowClear
                          >
                            {location.cities.map((city, cityIndex) => {
                              return (
                                <Select.Option
                                  key={cityIndex}
                                  value={city.code}
                                >
                                  {city.name}
                                </Select.Option>
                              );
                            })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12} lg={8}>
                        <Form.Item
                          label="Quận-Huyện"
                          name="district"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn quận huyện!",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Chọn quận huyện"
                            onChange={handleChageDistrict}
                            allowClear
                          >
                            {location.districts
                              .filter(
                                (district, districtIndex) =>
                                  district.parentcode === locationSelect.city
                              )
                              .map((districtItem, districtIndex) => {
                                return (
                                  <Select.Option
                                    key={districtIndex}
                                    value={districtItem.code}
                                  >
                                    {districtItem.name}
                                  </Select.Option>
                                );
                              })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={12} lg={8}>
                        <Form.Item
                          label="Phường-Xã"
                          name="ward"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng chọn phường xã!",
                            },
                          ]}
                        >
                          <Select
                            placeholder="Chọn phường xã"
                            onChange={handleChageWard}
                            allowClear
                          >
                            {location.wards
                              .filter(
                                (ward, wardIndex) =>
                                  ward.parentcode === locationSelect.district
                              )
                              .map((wardItem, wardIndex) => {
                                return (
                                  <Select.Option
                                    key={wardIndex}
                                    value={wardItem.code}
                                  >
                                    {wardItem.name}
                                  </Select.Option>
                                );
                              })}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={24}>
                        <Form.Item
                          label="Địa chỉ cụ thể"
                          name="address"
                          rules={[
                            {
                              required: true,
                              message: "Vui lòng nhập địa chỉ cụ thể!",
                            },
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
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ marginTop: 16 }}
                  >
                    Thanh Toán
                  </Button>
                </Form>
              </div>
            </Style.Content>
          </Style.OrderContainer>
        </Style.OrderPage>
      )}
    </>
  );
}

export default CheckoutPage;
