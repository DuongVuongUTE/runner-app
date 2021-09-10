import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Result, Space, Card } from "antd";
import * as Icons from "@ant-design/icons";
import { deleteWishlistItemAction } from "../../../../../redux/actions";
import * as Style from "./style";
import history from "../../../../../utils/history";
const { Meta } = Card;
function Wishlist() {
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
          sm={12}
          md={8}
          lg={8}
          xl={6}
          key={`${wishItem.name}-${wishIndex}`}
        >
          <Card
            cover={<img alt="example" src={wishItem.image} />}
            onClick={() =>
              history.push(`/product/${wishItem.name}-${wishItem.productId}`)
            }
          >
            <Meta
              title={wishItem.name}
              description={
                <Space wrap>
                  <span>Thương hiệu: {wishItem.category}</span>
                  <span>Loại giày: {wishItem.department}</span>
                  <span>Giá: {wishItem.price}</span>
                </Space>
              }
            />
          </Card>
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
          <h2 style={{ textAlign: "center", marginBottom: 30 }}>
            Danh sách yêu thích
          </h2>
          <Row gutter={[16, 16]}>{renderCartList()}</Row>
        </Style.CartPage>
      )}
    </>
  );
}

export default Wishlist;
