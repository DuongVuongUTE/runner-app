import React, { useState } from "react";
import { Badge, Button, Popover, Tooltip, Radio, Space, Rate } from "antd";
import * as Icons from "@ant-design/icons";
import * as Style from "./styles";
import history from "../../utils/history";

function CardProduct({ product, path }) {
  const [ratio, setRatio] = useState(1);
  return (
    <Badge.Ribbon style={{ zIndex: 5 }} text="New" color="red">
      <Style.CardProduct onClick={() => history.push(path)}>
        <Style.ProductImage onClick={() => history.push(path)}>
          <img
            src={product.images[0]}
            className="visible content"
            alt={product.name}
          />
          <img
            src={product.images[1]}
            className="hidden content"
            alt={product.name}
          />
        </Style.ProductImage>
        <Style.ProductContent>
          <h3 onClick={() => history.push(path)}>{product.name}</h3>
          <strong>
            {(product.price * ratio).toLocaleString() || product.price}₫
          </strong>
          <Space align="center" className="card-info">
            <span className="brand">{product.category?.name}</span>
            <Rate className="star" allowHalf disabled defaultValue={4.5} />
          </Space>
        </Style.ProductContent>
      </Style.CardProduct>
    </Badge.Ribbon>
  );
}

export default CardProduct;
