import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row, Tabs } from "antd";
import * as Icons from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";

import Loading from "../../../components/Loading";

import { useDispatch, useSelector } from "react-redux";
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
