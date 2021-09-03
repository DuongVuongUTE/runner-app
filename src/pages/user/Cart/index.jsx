import { useEffect } from "react";
import {
  Card,
  Row,
  Col,
  Input,
  Button,
  List,
  notification,
  Space,
  InputNumber,
  Result,
} from "antd";
import * as Icons from "@ant-design/icons";
import { PlusOutlined, MinusOutlined, CloseOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";

import history from "../../../utils/history";

import {
  minusItemCountAction,
  plusItemCountAction,
  deleteCartItemAction,
} from "../../../redux/actions";

import * as Style from "./styles";
import { Container } from "../../../styles/styles";

function CartPage() {
  const { cartList } = useSelector((state) => state.cartReducer);
  const { userInfo } = useSelector((state) => state.userReducer);
  let totalPrice = 0;
  const dispatch = useDispatch();

  function handlePlusCount(index) {
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count: newCartData[index].count + 1,
    });
    dispatch(
      plusItemCountAction({
        userId: userInfo.data.id,
        data: { carts: newCartData },
      })
    );
  }

  function handleMinusCount(index) {
    if (cartList.data[index].count === 1) return null;
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1, {
      ...newCartData[index],
      count: newCartData[index].count - 1,
    });
    dispatch(
      minusItemCountAction({
        userId: userInfo.data.id,
        data: { carts: newCartData },
      })
    );
  }

  function handleDeleteItem(index) {
    const newCartData = [...cartList.data];
    newCartData.splice(index, 1);
    dispatch(
      deleteCartItemAction({
        userId: userInfo.data.id,
        data: { carts: newCartData },
      })
    );
  }

  function handleCheckout() {
    if (!userInfo.data.id) {
      notification.warn({
        message: "Bạn chưa đăng nhập",
      });
    } else {
      history.push("/checkout");
    }
  }

  function renderCartList(params) {
    return cartList?.data?.map((cartItem, cartIndex) => {
      totalPrice = cartItem.option.id
        ? totalPrice + (cartItem.price + cartItem.option.price) * cartItem.count
        : totalPrice + cartItem.price * cartItem.count;
      return (
        <Style.CartItem>
          <div className="cart-image">
            <img src={cartItem.image} alt="" />
          </div>
          <div className="cart-content">
            <div className="cart-content-box">
              <h3>{cartItem.name}</h3>
              <span>
                {(
                  cartItem.price +
                  (cartItem.option.id ? cartItem.option.price : 0)
                ).toLocaleString() + "₫"}
              </span>
            </div>
            <div className="cart-info-list">
              <Space size={30} wrap>
                {cartItem.option.id && (
                  <div className="cart-info-item">
                    <span className="cart-info-tag">Size: </span>
                    <span className="cart-info-text">
                      {cartItem.option.size}
                    </span>
                  </div>
                )}
                <div className="cart-info-item">
                  <span className="cart-info-tag">Thương hiệu: </span>
                  <span className="cart-info-text">{cartItem.category}</span>
                </div>
              </Space>
              <Space size={30} wrap>
                <div className="cart-info-item">
                  <span className="cart-info-tag">Loại giày: </span>
                  <span className="cart-info-text">{cartItem.type}</span>
                </div>
                <div className="cart-info-item">
                  <span className="cart-info-text">{cartItem.department}</span>
                </div>
              </Space>
              <Space className="cart-info-item">
                <span>Color: </span>
                <Style.Color color={cartItem.color} />
              </Space>
            </div>
            <Input.Group compact>
              <Button
                icon={<MinusOutlined />}
                onClick={() => handleMinusCount(cartIndex)}
              />
              <Input
                value={cartItem.count}
                readOnly
                style={{ width: 40, textAlign: "center" }}
              />
              <Button
                icon={<PlusOutlined />}
                onClick={() => handlePlusCount(cartIndex)}
              />
            </Input.Group>
          </div>
          <div className="cart-action">
            <div className="cart-btn">
              <Button
                onClick={() => handleDeleteItem(cartIndex)}
                icon={<Icons.DeleteOutlined />}
                type="primary"
                danger
              />
              <Button icon={<Icons.HeartOutlined />} type="primary" danger />
            </div>
          </div>
        </Style.CartItem>
      );
    });
  }

  return (
    <>
      {cartList.data.length === 0 ? (
        <Result
          status="404"
          title="Giỏ hàng trống"
          subTitle="Tiến hành mua hàng!"
          extra={
            <Button onClick={() => history.push("/product")} type="primary">
              Go Shop
            </Button>
          }
        />
      ) : (
        <Style.CartPage>
          <Container>
            <Row gutter={[16, 16]}>
              <Col span={16}>
                <Style.CartList>{renderCartList()}</Style.CartList>
              </Col>
              <Col span={8}>
                <div className="cart-right">
                  <List
                    bordered
                    header={
                      <strong style={{ fontSize: 16 }}>
                        Thống kê giỏ hàng
                      </strong>
                    }
                  >
                    <List.Item>
                      <div className="list-item">
                        <span>
                          {cartList.data.length > 0
                            ? cartList.data.length + " sản phẩm"
                            : 0 + " sản phẩm"}
                        </span>
                        <span>{totalPrice.toLocaleString() + "₫"}</span>
                      </div>
                    </List.Item>
                    <List.Item>
                      <div className="list-item">
                        <span>Phí vận chuyển</span>
                        <span>Miễn phí</span>
                      </div>
                    </List.Item>
                    <List.Item>
                      <div className="list-item">
                        <strong>Tổng tiền</strong>
                        <strong>{totalPrice.toLocaleString() + "₫"}</strong>
                      </div>
                    </List.Item>
                  </List>
                  <Button
                    onClick={() => handleCheckout()}
                    type="primary"
                    block
                    size="large"
                  >
                    Thanh Toán
                  </Button>
                </div>
              </Col>
            </Row>
          </Container>
        </Style.CartPage>
      )}
    </>
  );
}

export default CartPage;
