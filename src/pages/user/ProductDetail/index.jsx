import React, { useEffect, useState } from "react";
import { Button, Col, Image, Row, Tabs, Radio } from "antd";
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
  const [optionSelected, setOptionSelected] = useState({});
  const [swiper, setSwiper] = useState(null);

  const slideTo = (index) => {
    if (swiper) swiper.slideTo(index);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getProductDetailAction({
        id: id,
      })
    );
  }, []);
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
  return (
    <Container>
      {productDetail.load ? (
        <Loading load={productDetail.load} />
      ) : (
        <Style.Section>
          <Button onClick={() => history.goBack()}>Quay lại</Button>
          <Style.ProductDetail>
            <Row gutter={[16, 16]}>
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
                <h3>Tên sản phẩm: {` ${productDetail.data.name}`}</h3>
                <p>Mô tả: {` ${productDetail.data.description}`}</p>
                <p>
                  Color:
                  <Style.Color color={productDetail.data.color} />
                </p>
                <p>
                  <Radio.Group
                    onChange={(e) => setOptionSelected(e.target.value)}
                    value={optionSelected}
                  >
                    {renderProductOptions()}
                  </Radio.Group>
                </p>
                <p>
                  Giá:{" "}
                  {optionSelected.price?.toLocaleString() ||
                    productDetail.data.price?.toLocaleString() ||
                    0}
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
