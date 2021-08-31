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
} from "antd";
import moment from "moment";
import * as Icons from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { useParams } from "react-router-dom";

import Loading from "../../../components/Loading";

import { useDispatch, useSelector } from "react-redux";
import {
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
function ProductDetailPage() {
  const { id } = useParams();
  const { userInfo } = useSelector((state) => state.userReducer);
  const { productDetail } = useSelector((state) => state.productReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const [optionSelected, setOptionSelected] = useState({});
  const [viewMore, setViewMore] = useState(false);
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
    dispatch(getProductListAction({ page: 1 }));
  }, [id]);
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
                <p>
                  Rate: <Rate disabled allowHalf defaultValue={4.5} />
                </p>
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
            <Row style={{ margin: "30px 0 50px" }}>
              <Tabs defaultActiveKey="1">
                <TabPane
                  tab={
                    <span>
                      <Icons.FileSearchOutlined />
                      Thông tin sản phẩm
                    </span>
                  }
                  key="1"
                >
                  <div className={viewMore ? "list-info active" : "list-info"}>
                    <div className="content">
                      <h3>Tên sản phẩm: {` ${productDetail.data.name}`}</h3>
                      <p>Mô tả: {` ${productDetail.data.description}`}</p>
                      <p>
                        Color:
                        <Style.Color color={productDetail.data.color} />
                      </p>

                      <p>
                        Giá:{" "}
                        {optionSelected.price?.toLocaleString() ||
                          productDetail.data.price?.toLocaleString() ||
                          0}
                      </p>
                      <p>Thương hiệu: {productDetail.data.category?.name}</p>
                      <p>Ảnh sản phẩm</p>
                    </div>
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
                </TabPane>
              </Tabs>
            </Row>
            <h2 style={{ marginBottom: 15 }}>Sản phẩm tương tự</h2>
            <Row gutter={[16, 16]}>
              {productList.data.map((productItem, productIndex) => {
                return (
                  <Col
                    xl={{ span: 6 }}
                    lg={{ span: 8 }}
                    sm={{ span: 12 }}
                    xs={{ span: 24 }}
                    key={productIndex}
                  >
                    <CardProduct
                      path={`/product/${productItem.id}`}
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
