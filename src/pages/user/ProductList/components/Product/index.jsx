import { Button, Empty, Row, Typography } from "antd";
import React from "react";
import { useDispatch } from "react-redux";
import CardProduct from "../../../../../components/Card";
import { getProductListAction } from "../../../../../redux/actions";
import * as Style from "./style";
const { Title } = Typography;
function Product({
  productList,
  categoriesSelected,
  searchKey,
  departmentsSelected,
  typesSelected,
  priceRange,
  PRODUCT_LIMIT,
}) {
  const dispatch = useDispatch();

  function handleShowMore() {
    dispatch(
      getProductListAction({
        page: productList.page + 1,
        searchKey: searchKey,
        categoriesSelected,
        typesSelected,
        priceRange,
        departmentsSelected,
        more: true,
      })
    );
  }

  function renderProductList() {
    return productList.data.map((productItem, productIndex) => {
      return (
        <Style.ProductItem
          key={`product-item-${productItem.id}-${productIndex}`}
        >
          <CardProduct
            path={`/product/${productItem.name}-${productItem.id}`}
            product={productItem}
          ></CardProduct>
        </Style.ProductItem>
      );
    });
  }
  return (
    <Style.ProductContainer>
      {productList.data.length === 0 ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : (
        <>
          <span className="num-product">Có {productList.total} sản phẩm</span>
          <Style.ProductList>{renderProductList()}</Style.ProductList>

          {productList.data.length % PRODUCT_LIMIT === 0 && (
            <Row justify="center" style={{ marginTop: 16 }}>
              <Button onClick={() => handleShowMore()}>Show more</Button>
            </Row>
          )}
        </>
      )}
    </Style.ProductContainer>
  );
}

export default Product;
