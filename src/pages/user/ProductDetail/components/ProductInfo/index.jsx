import React, { useState } from "react";
import * as Style from "./style";
import {
  Button,
  Col,
  Image,
  Row,
  Tabs,
  Tooltip,
  Radio,
  Comment,
  List,
  Avatar,
  Rate,
  Space,
  InputNumber,
  Descriptions,
  notification,
  Form,
  Input,
} from "antd";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlistAction,
  addToCartAction,
} from "../../../../../redux/actions";

import * as Icons from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import history from "../../../../../utils/history";

const { TabPane } = Tabs;
const { TextArea } = Input;

function ProductInfo({
  userInfo,
  productDetail,
  setOptionSelected,
  optionSelected,
  productID,
}) {
  const { wishList } = useSelector((state) => state.wishlistReducer);
  const { cartList } = useSelector((state) => state.cartReducer);

  const [swiper, setSwiper] = useState(null);
  const [productCount, setProductCount] = useState(1);
  const [viewMore, setViewMore] = useState(false);

  const dispatch = useDispatch();

  const slideTo = (index) => {
    if (swiper) swiper.slideTo(index);
  };

  function handleAddToWishlist() {
    if (!userInfo.data.name) {
      const key = `open${Date.now()}`;
      return notification.warning({
        message: "Chưa đăng nhập",
        description: "Bạn cần đăng nhập để thêm yêu thích",
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push("/login");
            }}
          >
            Đăng nhập
          </Button>
        ),
      });
    }
    const existProductIndex = wishList.data?.findIndex(
      (item) => item.productId === productID
    );
    if (existProductIndex !== -1) {
      // Xoá yêu thích
      // const newWishlistData = [...wishList.data];
      // newWishlistData.splice(existProductIndex, 1);
      // dispatch(
      //   deleteWishlistItemAction({
      //     userId: userInfo.data.id,
      //     data: { wishlist: newWishlistData },
      //   })
      // );
      notification.success({
        message: "Sản phẩm đã được thêm!",
      });
    } else {
      dispatch(
        addToWishlistAction({
          userId: userInfo.data.id,
          data: [
            ...wishList.data,
            {
              productId: productID,
              name: productDetail.data.name,
              price: productDetail.data.price,
              color: productDetail.data.color,
              image: productDetail.data.images[0],
              category: productDetail.data.category.name,
              type: productDetail.data.type.name,
              department: productDetail.data.department.description,
            },
          ],
        })
      );
    }
  }

  /// Dùng với kiểu cần đăng nhập để bỏ vào giỏ hàng
  function handleAddToCart() {
    if (!userInfo.data.name) {
      const key = `open${Date.now()}`;
      return notification.warning({
        message: "Chưa đăng nhập",
        description: "Bạn cần đăng nhập để thêm vào giỏ hàng",
        key,
        btn: (
          <Button
            type="primary"
            onClick={() => {
              notification.close(key);
              history.push("/login");
            }}
          >
            Đăng nhập
          </Button>
        ),
      });
    }
    if (optionSelected.id) {
      const existOptionIndex = cartList.data?.findIndex(
        (item) => item.option.id === optionSelected.id
      );
      if (existOptionIndex !== -1) {
        const newCartList = [...cartList.data];
        newCartList?.splice(existOptionIndex, 1, {
          productId: productID,
          count: cartList.data[existOptionIndex].count + productCount,
          name: productDetail.data.name,
          price: productDetail.data.price,
          color: productDetail.data.color,
          image: productDetail.data.images[0],
          category: productDetail.data.category.name,
          type: productDetail.data.type.name,
          department: productDetail.data.department.description,
          option: {
            id: optionSelected.id,
            size: optionSelected.size,
            price: optionSelected.price,
          },
        });
        dispatch(
          addToCartAction({
            userId: userInfo.data.id,
            carts: newCartList,
          })
        );
      } else {
        dispatch(
          addToCartAction({
            userId: userInfo.data.id,
            carts: [
              ...cartList.data,
              {
                productId: productID,
                count: productCount,
                name: productDetail.data.name,
                price: productDetail.data.price,
                color: productDetail.data.color,
                image: productDetail.data.images[0],
                category: productDetail.data.category.name,
                type: productDetail.data.type.name,
                department: productDetail.data.department.description,
                option: {
                  id: optionSelected.id,
                  size: optionSelected.size,
                  price: optionSelected.price,
                },
              },
            ],
          })
        );
      }
    } else {
      const existProductIndex = cartList.data?.findIndex(
        (item) => item.productId === productID
      );
      if (existProductIndex !== -1) {
        const newCart = [...cartList.data];
        newCart?.splice(existProductIndex, 1, {
          productId: productID,
          count: cartList.data[existProductIndex].count + productCount,
          name: productDetail.data.name,
          price: productDetail.data.price,
          color: productDetail.data.color,
          image: productDetail.data.images[0],
          category: productDetail.data.category.name,
          type: productDetail.data.type.name,
          department: productDetail.data.department.description,
          option: {},
        });
        dispatch(
          addToCartAction({
            userId: userInfo.data.id,
            carts: newCart,
          })
        );
      } else {
        dispatch(
          addToCartAction({
            userId: userInfo.data.id,
            carts: [
              ...cartList.data,
              {
                productId: productID,
                count: productCount,
                name: productDetail.data.name,
                price: productDetail.data.price,
                color: productDetail.data.color,
                image: productDetail.data.images[0],
                category: productDetail.data.category.name,
                type: productDetail.data.type.name,
                department: productDetail.data.department.description,
                option: {},
              },
            ],
          })
        );
      }
    }
  }

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

  function renderProductOptions() {
    return productDetail.data.productOptions?.map((optionItem, optionIndex) => {
      return (
        <Radio.Button key={`${optionItem}-${optionIndex}`} value={optionItem}>
          {optionItem.size}
        </Radio.Button>
      );
    });
  }
  return (
    <>
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
              <Rate className="rate" disabled allowHalf defaultValue={4.5} />
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
                onClick={() => handleAddToWishlist()}
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
              <div className={viewMore ? "list-info active" : "list-info"}>
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
          <Descriptions title="Thông tin sản phẩm" layout="horizontal" bordered>
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
    </>
  );
}

export default ProductInfo;
