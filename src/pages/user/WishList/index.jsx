import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Result } from "antd";
import * as Icons from "@ant-design/icons";
import { deleteWishlistItemAction } from "../../../redux/actions";
import { Container } from "../../../styles/styles";
import * as Style from "./styles";
import history from "../../../utils/history";

function WishlistPage() {
  const { userInfo } = useSelector((state) => state.userReducer);
  const { wishList } = useSelector((state) => state.wishlistReducer);
  const dispatch = useDispatch();

  function handleDeleteWish(index) {
    const newWishlistData = [...wishList.data];
    newWishlistData.splice(index, 1);
    dispatch(
      deleteWishlistItemAction({
        userId: userInfo.data.id,
        data: { wishlist: newWishlistData },
      })
    );
  }

  function renderCartList(params) {
    return wishList?.data?.map((wishItem, wishIndex) => {
      return (
        <Col
          xs={24}
          sm={24}
          md={24}
          lg={12}
          xl={12}
          key={`${wishItem.name}-${wishIndex}`}
        >
          <Style.CartItem>
            <div className="cart-image">
              <img src={wishItem.image} alt="" />
            </div>
            <div className="cart-content">
              <div className="cart-content-box">
                <h3
                  onClick={() =>
                    history.push(
                      `/product/${wishItem.name}-${wishItem.productId}`
                    )
                  }
                >
                  {wishItem.name}
                </h3>
              </div>
              <div className="cart-info-list">
                <div className="cart-info-item">
                  <span className="cart-info-tag">Thương hiệu: </span>
                  <span className="cart-info-text">{wishItem.category}</span>
                </div>
                <div className="cart-info-item">
                  <span className="cart-info-tag">Loại giày: </span>
                  <span className="cart-info-text">{wishItem.type}</span>
                </div>
                <div className="cart-info-item">
                  <span className="cart-info-tag">Dành cho: </span>
                  <span className="cart-info-text">{wishItem.department}</span>
                </div>
              </div>
            </div>
            <div className="cart-action">
              <div className="cart-btn">
                <Button
                  onClick={() => handleDeleteWish(wishIndex)}
                  icon={<Icons.DeleteOutlined />}
                  type="primary"
                  danger
                />
              </div>
            </div>
          </Style.CartItem>
        </Col>
      );
    });
  }
  return (
    <>
      {wishList.data.length === 0 ? (
        <Result
          status="404"
          title="Danh sách yêu thích trống"
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
            <h2 style={{ textAlign: "center", marginBottom: 30 }}>
              Danh sách yêu thích
            </h2>
            <Row gutter={[16, 16]}>{renderCartList()}</Row>
          </Container>
        </Style.CartPage>
      )}
    </>
  );
}

export default WishlistPage;
