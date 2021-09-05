import React, { useEffect, useState } from "react";
import { PageHeader } from "antd";
import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";

import { useDispatch, useSelector } from "react-redux";

import {
  getProductDetailAction,
  getProductListAction,
} from "../../../redux/actions";
import history from "../../../utils/history";

import ProductInfo from "./components/ProductInfo";
import ProductRelated from "./components/ProductRelated";

import { Container } from "../../../styles/styles";

import * as Style from "./styles";

function ProductDetailPage() {
  let { productID } = useParams();

  const { userInfo } = useSelector((state) => state.userReducer);
  const { productDetail } = useSelector((state) => state.productReducer);
  const { productList } = useSelector((state) => state.productReducer);
  const [optionSelected, setOptionSelected] = useState({});

  const dispatch = useDispatch();

  function getIdParams(params) {
    const arr = params.split("-");
    return arr[arr.length - 1];
  }
  function getNameParams(params) {
    const arr = params.split("-");
    return decodeURIComponent(arr[0]);
  }

  useEffect(() => {
    productID = getIdParams(productID);
    dispatch(
      getProductDetailAction({
        id: productID,
      })
    );
  }, [productID]);

  useEffect(() => {
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected: [productDetail.data.categoryId],
      })
    );
    if (productDetail.data.id) {
      setOptionSelected(productDetail.data.productOptions[0] || {});
    }
  }, [productDetail.data]);

  return (
    <Container>
      {productDetail.load ? (
        <Loading load={productDetail.load} />
      ) : (
        <Style.Section>
          <PageHeader
            className="site-page-header"
            onBack={() => history.goBack()}
            title="Chi tiết sản phẩm"
            subTitle={getNameParams(productID)}
          />
          <Style.ProductDetail>
            <ProductInfo
              userInfo={userInfo}
              productDetail={productDetail}
              setOptionSelected={setOptionSelected}
              optionSelected={optionSelected}
              productID={getIdParams(productID)}
            />

            <ProductRelated productList={productList} />
          </Style.ProductDetail>
        </Style.Section>
      )}
    </Container>
  );
}

export default ProductDetailPage;
