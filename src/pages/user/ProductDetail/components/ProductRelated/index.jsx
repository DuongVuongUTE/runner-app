import React from "react";
import { Row, Col } from "antd";
import CardProduct from "../../../../../components/Card";

function ProductRelated({ productList }) {
  return (
    <Row gutter={[15, 20]}>
      <Col span={24}>
        <div className="product-related">
          <div>Giày runner</div>
          <h2>Sản phẩm tương tự</h2>
        </div>
      </Col>
      {productList.data.map((productItem, productIndex) => {
        return (
          <Col
            xl={{ span: 6 }}
            lg={{ span: 8 }}
            sm={{ span: 12 }}
            xs={{ span: 12 }}
            key={productIndex}
            className="col-custom"
          >
            <CardProduct
              path={`/product/${productItem.name}-${productItem.id}`}
              product={productItem}
            ></CardProduct>
          </Col>
        );
      })}
    </Row>
  );
}

export default ProductRelated;
