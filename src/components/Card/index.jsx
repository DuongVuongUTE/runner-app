import React, { useState } from "react";
import { Badge, Button, Popover, Tooltip, Radio, Space } from "antd";
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
        </Style.ProductContent>
        {/* <div className="product-more">
          <div className="size">
            <strong>Size</strong>
            <Radio.Group
              onChange={(e) => {
                const getSize = product.size.find(
                  (item) => item.num === e.target.value
                );

                setRatio(getSize.ratio);
              }}
              size="small"
              buttonStyle="solid"
            >
              {product.size.map((item, index) => {
                return (
                  <Radio.Button key={`${item.id}-${index}`} value={item.num}>
                    {item.num}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </div>
          <div className="product-button">
            <Button
              type="primary"
              shape="circle"
              icon={<Icons.ShoppingCartOutlined />}
            ></Button>

            <Tooltip title="Thêm yêu thích" placement="rightTop">
              <Button
                type="primary"
                shape="circle"
                icon={<Icons.HeartOutlined />}
              />
            </Tooltip>
          </div>
        </div> */}
      </Style.CardProduct>
    </Badge.Ribbon>
  );
}

export default CardProduct;
