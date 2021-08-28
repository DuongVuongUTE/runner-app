import React from "react";

import CardProduct from "../../../../../components/Card";

import * as Style from "./style";

function ProductNew({ productList }) {
  function renderProductNew() {
    return productList.data.map((product, index) => {
      return (
        <Style.ProductItem key={`${product.name}-${index}`}>
          <CardProduct path={`/product/${product.id}`} product={product} />
        </Style.ProductItem>
      );
    });
  }
  return <Style.ProductList>{renderProductNew()}</Style.ProductList>;
}

export default ProductNew;
