// import { useState, useEffect } from "react";
// import { Button, InputNumber } from "antd";
// import { useSelector, useDispatch } from "react-redux";
// import { v4 as uuidv4 } from "uuid";

// import history from "../../../utils/history";

// import {
//   getProductDetailAction,
//   addToCartAction,
// } from "../../../redux/actions";

// function ProductDetailPage({ match }) {
//   const [productCount, setProductCount] = useState(1);

//   const productId = parseInt(match.params.id);

//   const { userInfo } = useSelector((state) => state.userReducer);
//   const { productDetail } = useSelector((state) => state.productReducer);
//   const { cartList } = useSelector((state) => state.cartReducer);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getProductDetailAction({ id: productId }));
//   }, []);

//   function handleAddToCart() {
//     const cartData = [...cartList.data];
//     const cartIndex = cartData.findIndex(
//       (item) => item.productId === productId
//     );
//     if (cartIndex !== -1) {
//       cartData.splice(cartIndex, 1, {
//         ...cartData[cartIndex],
//         count: cartData[cartIndex].count + productCount,
//       });
//       dispatch(
//         addToCartAction({
//           id: userInfo.data.id,
//           data: { cart: cartData },
//         })
//       );
//     } else {
//       const newCartData = [
//         ...cartData,
//         {
//           id: uuidv4(),
//           productId: productId,
//           name: productDetail.data.name,
//           price: productDetail.data.price,
//           count: productCount,
//         },
//       ];
//       dispatch(
//         addToCartAction({
//           id: userInfo.data.id,
//           data: { cart: newCartData },
//         })
//       );
//     }
//   }

//   return (
//     <>
//       <Button onClick={() => history.goBack()}>Quay lại</Button>
//       <div>Tên sản phẩm: {productDetail.data.name}</div>
//       <div>Hãng: {productDetail.data.category?.name}</div>
//       <div>
//         Giá:{" "}
//         {productDetail.data.price >= 0 &&
//           productDetail.data.price.toLocaleString()}
//       </div>
//       <InputNumber
//         min={1}
//         onChange={(value) => setProductCount(value)}
//         value={productCount}
//       />
//       <div>
//         <Button type="primary" onClick={() => handleAddToCart()}>
//           Thêm vào giỏ
//         </Button>
//       </div>
//     </>
//   );
// }

// export default ProductDetailPage;

/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Image, Row, Tabs } from "antd";
import * as Icons from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { getProductDetailAction } from "../../../redux/actions";
import history from "../../../utils/history";

import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import * as Style from "./styles";
import { Container } from "../../../styles/styles";

const { TabPane } = Tabs;

function ProductDetailPage() {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { productDetail } = useSelector((state) => state.productReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProductDetailAction({
        id: id,
      })
    );
  }, []);
  const [swiper, setSwiper] = useState(null);

  const slideTo = (index) => {
    if (swiper) swiper.slideTo(index);
  };
  console.log(swiper);
  return (
    <Container>
      {productDetail.load ? (
        <Loading load={productDetail.load} />
      ) : (
        <Style.Section>
          <Button onClick={() => history.goBack()}>Quay lại</Button>
          <Style.ProductDetail>
            <Row gutter={[16, 16]}>
              <Col xl={{ span: 8 }} lg={{ span: 12 }} sm={{ span: 24 }}>
                <Image.PreviewGroup>
                  <Swiper onSwiper={setSwiper}>
                    {productDetail.data?.images?.map((image) => {
                      return (
                        <SwiperSlide>
                          <Image
                            src={image}
                            placeholder={<div className="bg-animate" />}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </Image.PreviewGroup>
                <Swiper
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
              <Col xl={{ span: 16 }} lg={{ span: 12 }} sm={{ span: 24 }}>
                <h3>Tên sản phẩm: {` ${productDetail.data.name}`}</h3>
                <p>Mô tả: {` ${productDetail.data.description}`}</p>
                <p>
                  Color:
                  <Style.Color color={productDetail.data.color} />
                </p>
                <p>
                  Giá:{" "}
                  {productDetail.data.price >= 0 &&
                    productDetail.data.price.toLocaleString()}
                </p>
                <Button onClick={() => history.push("/cart")} type="primary">
                  Add to cart
                </Button>
              </Col>
            </Row>
            <div style={{ marginTop: 30 }}>
              <Tabs defaultActiveKey="2">
                <TabPane
                  tab={
                    <span>
                      <Icons.FileSearchOutlined />
                      Thông tin sản phẩm
                    </span>
                  }
                  key="1"
                >
                  Tab 1
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
                  Tab 2
                </TabPane>
              </Tabs>
            </div>
          </Style.ProductDetail>
        </Style.Section>
      )}
    </Container>
  );
}

export default ProductDetailPage;
