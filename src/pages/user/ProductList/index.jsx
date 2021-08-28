import React, { useEffect, useState } from "react";
import { Container } from "../../../styles/styles";
import BreadcrumbUI from "../../../components/Breadcrumb";
import { Collapse, Checkbox, Input, Select } from "antd";
import * as Icons from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import {
  getCategoryListAction,
  getProductListAction,
  getTypeListAction,
} from "../../../redux/actions";

import * as Style from "./styles";
import CardProduct from "../../../components/Card";
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

function ProductPage() {
  const [categoriesSelected, setCategoriesSelect] = useState([]);
  const [typesSelected, setTypesSelect] = useState([]);
  const [gendersSelected, setGendersSelect] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { productList } = useSelector((state) => state.productReducer);
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { typeList } = useSelector((state) => state.typeReducer);

  const dispatch = useDispatch();

  const genderList = {
    data: [
      {
        id: 1,
        name: "Nam",
      },
      {
        id: 2,
        name: "Nữ",
      },
    ],
  };

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListAction());
    dispatch(getTypeListAction());
  }, []);

  function handleFilterCategory(value) {
    setCategoriesSelect(value);
    dispatch(
      getProductListAction({
        // page: 1,
        categoriesSelected: value,
        typesSelected,
        searchKey,
        // priceRange,
        // searchKey,
      })
    );
  }

  function handleFilterType(value) {
    setTypesSelect(value);
    dispatch(
      getProductListAction({
        // page: 1,
        categoriesSelected,
        typesSelected: value,
        searchKey,
        // priceRange,
        // searchKey,
      })
    );
  }

  function handleFilterGender(value) {
    setGendersSelect(value);
  }

  function handleSearchProduct(value) {
    setSearchKey(value);
    dispatch(
      getProductListAction({
        categoriesSelected,
        searchKey: value,
      })
    );
  }

  function renderCategoryCheckbox() {
    const categoryCheckbox = categoryList.data.map((categoryItem) => ({
      label: categoryItem.name,
      value: categoryItem.id,
    }));
    return (
      <Checkbox.Group
        options={categoryCheckbox}
        onChange={(value) => handleFilterCategory(value)}
        value={categoriesSelected}
      />
    );
  }

  function renderTypeCheckbox() {
    const typeCheckbox = typeList.data.map((typeItem) => ({
      label: typeItem.name,
      value: typeItem.id,
    }));
    return (
      <Checkbox.Group
        options={typeCheckbox}
        onChange={(value) => handleFilterType(value)}
        value={typesSelected}
      />
    );
  }

  function handleChange(value) {
    console.log(`selected ${value}`);
  }

  function renderGenderCheckbox() {
    const genderCheckbox = genderList.data.map((genderItem) => ({
      label: genderItem.name,
      value: genderItem.id,
    }));
    return (
      <Checkbox.Group
        options={genderCheckbox}
        onChange={(value) => handleFilterGender(value)}
        value={gendersSelected}
      />
    );
  }

  function renderProductList() {
    return productList.data.map((productItem, productIndex) => {
      return (
        <Style.ProductItem key={`product-item-${productItem.id}`}>
          <CardProduct
            path={`/product/${productItem.id}`}
            product={productItem}
          ></CardProduct>
        </Style.ProductItem>
      );
    });
  }
  return (
    <Container>
      <BreadcrumbUI />
      <Style.ProductTitle>Tất cả sản phẩm</Style.ProductTitle>
      <Style.ProductLayout>
        <Style.ProductFilter>
          <>
            <h3>Lọc theo</h3>
            <Collapse onChange={callback} ghost expandIconPosition="right">
              <Panel header="Thương hiệu" key="1">
                <div>{renderCategoryCheckbox()}</div>
              </Panel>
              <Panel header="Loại sản phẩm" key="2">
                <div>{renderTypeCheckbox()}</div>
              </Panel>
              <Panel header="Giới tính" key="3">
                <div>{renderGenderCheckbox()}</div>
              </Panel>
              <Panel header="Size" key="4">
                <div>{text}</div>
              </Panel>
              <Panel header="Color" key="5">
                <div>{text}</div>
              </Panel>
              <Panel header="Khoảng giá" key="6">
                <div>{text}</div>
              </Panel>
              <Panel header="Đánh giá" key="7">
                <div>{text}</div>
              </Panel>
            </Collapse>
          </>
        </Style.ProductFilter>
        <Style.ProductContent>
          <div className="search-sort">
            <Input
              placeholder="Search..."
              onChange={(e) => handleSearchProduct(e.target.value)}
              value={searchKey}
              suffix={<Icons.SearchOutlined />}
            />
            <div className="select-sort">
              <Select
                style={{ width: "100%" }}
                onChange={handleChange}
                placeholder="Sắp xếp theo..."
              >
                <Select.Option value="1">Giá cao đến thấp</Select.Option>
                <Select.Option value="2">Giá thấp đến cao</Select.Option>
                <Select.Option value="3">Mới nhất</Select.Option>
                <Select.Option value="4">Cũ nhất</Select.Option>
              </Select>
            </div>
          </div>
          <Style.ProductList>{renderProductList()}</Style.ProductList>
        </Style.ProductContent>
      </Style.ProductLayout>
    </Container>
  );
}

export default ProductPage;
