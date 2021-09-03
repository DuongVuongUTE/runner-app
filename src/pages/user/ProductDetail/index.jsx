import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Image,
  Row,
  Tabs,
  Radio,
  Comment,
  Tooltip,
  List,
  Avatar,
  Input,
  Form,
  Rate,
  Space,
  InputNumber,
  Descriptions,
  Tag,
  Card,
  PageHeader,
} from "antd";
import moment from "moment";
import * as Icons from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Loading from "../../../components/Loading";

import { useDispatch, useSelector } from "react-redux";
import {
  addToCartAction,
  getProductDetailAction,
  getProductListAction,
} from "../../../redux/actions";
import history from "../../../utils/history";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import * as Style from "./styles";
import { Container } from "../../../styles/styles";
import CardProduct from "../../../components/Card";

const { TabPane } = Tabs;
const { TextArea } = Input;
const DataList = [
  {
    icon: <Icons.FireTwoTone twoToneColor="#eb2f96" />,
    text: "Miễn phí vận chuyển trong 5km",
  },
  {
    icon: <Icons.RocketTwoTone twoToneColor="#eb2f96" />,
    text: "Trả hàng dễ dàng trong vòng 2 giờ",
  },
  {
    icon: <Icons.TagTwoTone twoToneColor="#eb2f96" />,
    text: "Đặt hàng vào trước buổi trưa để giao trong ngày",
  },
];
function ProductDetailPage() {
  let { productID } = useParams();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { productDetail } = useSelector((state) => state.productReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const { cartList } = useSelector((state) => state.cartReducer);
  const [productCount, setProductCount] = useState(1);
  const [optionSelected, setOptionSelected] = useState({});
  const [viewMore, setViewMore] = useState(false);
  const [swiper, setSwiper] = useState(null);

  const slideTo = (index) => {
    if (swiper) swiper.slideTo(index);
  };
  const dispatch = useDispatch();

  function getIdParams(params) {
    const arr = params.split("-");
    return arr[arr.length - 1];
  }
  function getNameParams(params) {
    const arr = params.split("-");
    return decodeURIComponent(arr[0]);
  }

  useEffect(() => {
    productID = getIdParams(productID);
    dispatch(
      getProductDetailAction({
        id: productID,
      })
    );
    dispatch(getProductListAction({ page: 1 }));
  }, [productID]);
  useEffect(() => {
    if (productDetail.data.id) {
      setOptionSelected(productDetail.data.productOptions[0] || {});
    }
  }, [productDetail.data]);
  function renderProductOptions() {
    return productDetail.data.productOptions?.map((item, index) => {
      return <Radio.Button value={item}>{item.size}</Radio.Button>;
    });
  }

  function handleAddToCart() {
    const cartData = [...cartList.data];
    const cartIndex = cartData.findIndex(
      (item) => item.productId === productID
    );
    if (cartIndex !== -1) {
      cartData.splice(cartIndex, 1, {
        ...cartData[cartIndex],
        count: cartData[cartIndex].count + productCount,
      });
      dispatch(
        addToCartAction({
          id: userInfo.data.id,
          data: { cart: cartData },
        })
      );
    } else {
      const newCartData = [
        ...cartData,
        {
          id: uuidv4(),
          productId: productID,
          name: productDetail.data.name,
          price: productDetail.data.price,
          count: productCount,
        },
      ];
      dispatch(
        addToCartAction({
          id: userInfo.data.id,
          data: { cart: newCartData },
        })
      );
    }
  }

  const data = [
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: "Han Solo",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: (
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip
          title={moment().subtract(1, "days").format("YYYY-MM-DD HH:mm:ss")}
        >
          <span>{moment().subtract(1, "days").fromNow()}</span>
        </Tooltip>
      ),
    },
    {
      actions: [<span key="comment-list-reply-to-0">Reply to</span>],
      author: "Han Solo",
      avatar:
        "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
      content: (
        <p>
          We supply a series of design principles, practical patterns and high
          quality design resources (Sketch and Axure), to help people create
          their product prototypes beautifully and efficiently.
        </p>
      ),
      datetime: (
        <Tooltip
          title={moment().subtract(2, "days").format("YYYY-MM-DD HH:mm:ss")}
        >
          <span>{moment().subtract(2, "days").fromNow()}</span>
        </Tooltip>
      ),
    },
  ];
  const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={onChange} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
  return (
    <Container>
      {productDetail.load ? (
        <Loading load={productDetail.load} />
      ) : (
        <Style.Section>
          <PageHeader
            className="site-page-header"
            onBack={() => history.goBack()}
            title="Chi tiết sản phẩm"
            subTitle={getNameParams(productID)}
          />
          <Style.ProductDetail>
            <Row gutter={[30, 30]}>
              <Col xl={{ span: 12 }} lg={{ span: 12 }} sm={{ span: 24 }}>
                <Image.PreviewGroup>
                  <Swiper onSwiper={setSwiper}>
                    {productDetail.data?.images?.map((image) => {
                      return (
                        <SwiperSlide className="slide-item">
                          <Image
                            className="slide-image"
                            src={image}
                            placeholder={<div className="bg-animate" />}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </Image.PreviewGroup>
                <Swiper
                  style={{ marginTop: 10 }}
                  spaceBetween={10}
                  slidesPerView={4}
                  className="mySwiper"
                >
                  {productDetail.data?.images?.map((image, index) => {
                    return (
                      <SwiperSlide key={index - image}>
                        <Image
                          onClick={() => slideTo(index)}
                          preview={false}
                          src={image}
                          placeholder={<div className="bg-animate" />}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </Col>
              <Col xl={{ span: 12 }} lg={{ span: 12 }} sm={{ span: 24 }}>
                <div className="product-info">
                  <h3>{` ${productDetail.data.name}`}</h3>
                  <div className="product-rate">
                    <Rate
                      className="rate"
                      disabled
                      allowHalf
                      defaultValue={4.5}
                    />
                    <span className="number-rate"> 0 Khách hàng đánh giá</span>
                  </div>
                  <div className="product-price">
                    <strong>
                      {optionSelected.price?.toLocaleString() ||
                        productDetail.data.price?.toLocaleString() ||
                        0}
                      ₫
                    </strong>
                  </div>
                  <div className="product-info-list">
                    <div className="product-brand-item">
                      <span className="product-info-tag">Thương hiệu:</span>
                      <span className="product-info-text">{` ${productDetail.data.category?.name}`}</span>
                    </div>
                    <div className="product-type-item">
                      <span className="product-info-tag">Loại giày:</span>
                      <span className="product-info-text">{` ${productDetail.data.type?.name}`}</span>
                    </div>
                  </div>
                  <div className="product-department">
                    <span className="product-info-tag">Sản phẩm dành cho:</span>
                    <span className="product-info-text">{` ${productDetail.data.department?.name}`}</span>
                  </div>
                  <div className="product-color">
                    <span className="product-info-tag">Màu sắc:</span>
                    <Style.Color color={productDetail.data.color} />
                  </div>
                  {productDetail.data.productOptions?.length > 0 && (
                    <div className="product-option">
                      <strong className="tag">Size</strong>
                      <Radio.Group
                        onChange={(e) => setOptionSelected(e.target.value)}
                        value={optionSelected}
                      >
                        {renderProductOptions()}
                      </Radio.Group>
                    </div>
                  )}
                  <div className="product-action">
                    <Space>
                      <InputNumber
                        min={1}
                        onChange={(value) => setProductCount(value)}
                        value={productCount}
                      />

                      <Button
                        type="primary"
                        icon={<Icons.ShoppingCartOutlined />}
                        onClick={() => handleAddToCart()}
                      >
                        Thêm vào giỏ
                      </Button>
                    </Space>
                    <Button
                      type="primary"
                      danger
                      icon={<Icons.HeartOutlined />}
                    >
                      Thêm yêu thích
                    </Button>
                  </div>

                  <List
                    bordered
                    header={<strong>Chính sách</strong>}
                    dataSource={DataList}
                    renderItem={(item) => (
                      <List.Item>
                        <Space>
                          {item.icon}
                          {item.text}
                        </Space>
                      </List.Item>
                    )}
                  />
                </div>
              </Col>
            </Row>
            <Row style={{ padding: "50px 0" }} gutter={[16, 24]}>
              <Col lg={{ span: 15, order: 1 }} xs={{ order: 2 }}>
                <Tabs defaultActiveKey="1">
                  <TabPane
                    tab={
                      <span>
                        <Icons.FileSearchOutlined />
                        Giới thiệu
                      </span>
                    }
                    key="1"
                  >
                    <div
                      className={viewMore ? "list-info active" : "list-info"}
                    >
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 15,
                        }}
                      >
                        {productDetail.data?.images?.map((image, index) => {
                          return (
                            <Image
                              onClick={() => slideTo(index)}
                              preview={false}
                              src={image}
                              placeholder={<div className="bg-animate" />}
                            />
                          );
                        })}
                      </div>
                      <Button
                        style={{
                          position: "absolute",
                          bottom: 0,
                          left: "50%",
                          zIndex: 2,
                          transform: "translateX(-50%)",
                        }}
                        onClick={() => setViewMore(!viewMore)}
                      >
                        {viewMore ? "View Less" : "View More"}
                      </Button>
                    </div>
                  </TabPane>
                  <TabPane
                    tab={
                      <span>
                        <Icons.LikeOutlined />
                        Đánh giá sản phẩm
                      </span>
                    }
                    key="2"
                  >
                    <Comment
                      avatar={
                        <Avatar
                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                          alt="Han Solo"
                        />
                      }
                      content={
                        <Editor
                        // onChange={this.handleChange}
                        // onSubmit={this.handleSubmit}
                        // submitting={submitting}
                        // value={value}
                        />
                      }
                    />
                    <List
                      className="comment-list"
                      header={`${data.length} replies`}
                      itemLayout="horizontal"
                      dataSource={data}
                      renderItem={(item) => (
                        <li>
                          <Comment
                            actions={item.actions}
                            author={item.author}
                            avatar={item.avatar}
                            content={item.content}
                            datetime={item.datetime}
                          />
                        </li>
                      )}
                    />
                  </TabPane>
                </Tabs>
              </Col>
              <Col
                lg={{ span: 9, order: 2 }}
                xs={{ order: 1 }}
                style={{ width: "100%" }}
              >
                <Descriptions
                  title="Thông tin sản phẩm"
                  layout="horizontal"
                  bordered
                >
                  <Descriptions.Item label="Sản phẩm" span={3}>
                    {productDetail.data?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Thương hiệu" span={3}>
                    {productDetail.data.category?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Loại giày" span={3}>
                    {productDetail.data.type?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Giày" span={3}>
                    {productDetail.data.department?.name}
                  </Descriptions.Item>
                  <Descriptions.Item label="Màu sắc" span={3}>
                    <Style.Color color={productDetail.data.color} />
                  </Descriptions.Item>
                  <Descriptions.Item label="Giá" span={3}>
                    {productDetail.data.price?.toLocaleString()} VNĐ
                  </Descriptions.Item>
                  <Descriptions.Item label="Mô tả" span={3}>
                    {productDetail.data.description}
                  </Descriptions.Item>
                </Descriptions>
              </Col>
            </Row>

            <Row gutter={[15, 20]}>
              <Col span={24}>
                <div className="product-related">
                  <div>Giày runner</div>
                  <h2>Sản phẩm tương tự</h2>
                </div>
              </Col>
              {productList.data.map((productItem, productIndex) => {
                return (
                  <Col
                    xl={{ span: 6 }}
                    lg={{ span: 8 }}
                    sm={{ span: 12 }}
                    xs={{ span: 12 }}
                    key={productIndex}
                    className="col-custom"
                  >
                    <CardProduct
                      path={`/product/${productItem.name}-${productItem.id}`}
                      product={productItem}
                    ></CardProduct>
                  </Col>
                );
              })}
            </Row>
          </Style.ProductDetail>
        </Style.Section>
      )}
    </Container>
  );
}

export default ProductDetailPage;
