import React, { useEffect, useState } from "react";
import { Container } from "../../../styles/styles";
import BreadcrumbUI from "../../../components/Breadcrumb";
import {
  Collapse,
  Checkbox,
  Input,
  Select,
  Space,
  Row,
  Button,
  Tag,
  Slider,
} from "antd";
import * as Icons from "@ant-design/icons";

import { useSelector, useDispatch } from "react-redux";
import {
  getCategoryListAction,
  getDepartmentListAction,
  getProductListAction,
  getTypeListAction,
} from "../../../redux/actions";

import * as Style from "./styles";
import { PRODUCT_LIMIT } from "../../../constants/product";
import Product from "./components/Product";
import history from "../../../utils/history";
import Loading from "../../../components/Loading";
import TagList from "./components/TagList";
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

function ProductPage() {
  const { productList } = useSelector((state) => state.productReducer);
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { typeList } = useSelector((state) => state.typeReducer);
  const { departmentList } = useSelector((state) => state.departmentReducer);
  const [categoriesSelected, setCategoriesSelect] = useState([]);
  const [typesSelected, setTypesSelect] = useState([]);
  const [departmentsSelected, setDepartmentsSelect] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [priceRange, setPriceRange] = useState([0, 15000000]);

  const dispatch = useDispatch();
  const marks = {
    0: "0₫",
    7500000: "7.5tr",
    15000000: "15tr",
  };
  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getProductListAction({ page: 1 }));
    dispatch(getTypeListAction());
    dispatch(getDepartmentListAction());
  }, []);

  useEffect(() => {
    setCategoriesSelect([]);
    setTypesSelect([]);
    setDepartmentsSelect([]);
    setSearchKey("");
    setPriceRange([0, 15000000]);
    if (history.location.pathname === "/product/men") {
      setDepartmentsSelect([1]);
      dispatch(getProductListAction({ page: 1, departmentsSelected: [1] }));
    }
    if (history.location.pathname === "/product/woman") {
      setDepartmentsSelect([2]);
      dispatch(getProductListAction({ page: 1, departmentsSelected: [2] }));
    }
    if (history.location.pathname === "/product/kids") {
      setDepartmentsSelect([3]);
      dispatch(getProductListAction({ page: 1, departmentsSelected: [3] }));
    }
    if (history.location.pathname === "/product") {
      setDepartmentsSelect([]);
      dispatch(getProductListAction({ page: 1 }));
    }
  }, [history.location.pathname]);

  function handleFilterCategory(value) {
    setCategoriesSelect(value);
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected: value,
        typesSelected,
        searchKey,
        priceRange,
        departmentsSelected,
        // priceRange,
        // searchKey,
      })
    );
  }

  function handleFilterType(value) {
    setTypesSelect(value);
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected,
        typesSelected: value,
        searchKey,
        priceRange,
        departmentsSelected,
        // priceRange,
        // searchKey,
      })
    );
  }

  function handleFilterDepartment(value) {
    setDepartmentsSelect(value);
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected,
        typesSelected,
        searchKey,
        departmentsSelected: value,
        priceRange,
        // searchKey,
      })
    );
  }
  function handleRangePrice(value) {
    setPriceRange(value);
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected,
        priceRange,
        typesSelected,
        departmentsSelected,
        searchKey,
      })
    );
  }

  function handleSearchProduct(value) {
    setSearchKey(value);
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected,
        typesSelected,
        priceRange,
        searchKey: value,
        departmentsSelected,
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

  function renderDepartmentCheckbox() {
    const departmentsCheckbox = departmentList.data.map((departmentItem) => ({
      label: departmentItem.name,
      value: departmentItem.id,
    }));
    return (
      <Checkbox.Group
        options={departmentsCheckbox}
        onChange={(value) => handleFilterDepartment(value)}
        value={departmentsSelected}
      />
    );
  }

  return (
    <>
      {typeList.load || departmentList.load || categoryList.load ? (
        <Loading
          load={typeList.load || departmentList.load || categoryList.load}
        />
      ) : (
        <>
          <Style.Hero src="">
            <Style.Breadcrumb>
              <BreadcrumbUI />
            </Style.Breadcrumb>

            <Style.HeroTitle>
              {history.location.pathname === "/product"
                ? "Tất cả sản phẩm"
                : history.location.pathname === "/product/men"
                ? "Giày nam"
                : history.location.pathname === "/product/woman"
                ? "Giày nữ"
                : history.location.pathname === "/product/kids"
                ? "Giày trẻ em"
                : null}
            </Style.HeroTitle>
          </Style.Hero>
          <Container>
            <Style.ProductLayout>
              <Style.ProductFilter>
                <div className="sticky">
                  <h3>
                    <Icons.FilterOutlined /> Lọc theo
                  </h3>
                  <TagList
                    typeList={typeList}
                    categoryList={categoryList}
                    departmentList={departmentList}
                    categoriesSelected={categoriesSelected}
                    typesSelected={typesSelected}
                    departmentsSelected={departmentsSelected}
                    priceRange={priceRange}
                    searchKey={searchKey}
                    setTypesSelect={setTypesSelect}
                    setCategoriesSelect={setCategoriesSelect}
                    setDepartmentsSelect={setDepartmentsSelect}
                    setSearchKey={setSearchKey}
                    setPriceRange={setPriceRange}
                  />
                  <Collapse
                    onChange={callback}
                    ghost
                    expandIconPosition="right"
                  >
                    <Panel
                      header={
                        <>
                          <div class="title-collapse">
                            <span>Thương hiệu</span>
                          </div>
                        </>
                      }
                      key="1"
                    >
                      <div>{renderCategoryCheckbox()}</div>
                    </Panel>
                    <Panel
                      header={
                        <>
                          <div class="title-collapse">
                            <span>Loại sản phẩm</span>
                          </div>
                        </>
                      }
                      key="2"
                    >
                      <div>{renderTypeCheckbox()}</div>
                    </Panel>
                    {history.location.pathname === "/product" ? (
                      <Panel
                        header={
                          <>
                            <div class="title-collapse">
                              <span>Giới tính</span>
                            </div>
                          </>
                        }
                        key="3"
                      >
                        <div>{renderDepartmentCheckbox()}</div>
                      </Panel>
                    ) : null}

                    <Panel
                      header={
                        <>
                          <div class="title-collapse">
                            <span>Size</span>
                          </div>
                        </>
                      }
                      key="4"
                    >
                      <div>Size</div>
                    </Panel>
                    <Panel
                      header={
                        <>
                          <div class="title-collapse">
                            <span>Color</span>
                          </div>
                        </>
                      }
                      key="5"
                    >
                      <div>Color</div>
                    </Panel>
                    <Panel
                      header={
                        <>
                          <div class="title-collapse">
                            <span>Khoảng giá</span>
                          </div>
                        </>
                      }
                      key="6"
                    >
                      <div>
                        <Slider
                          marks={marks}
                          min={0}
                          max={15000000}
                          step={100000}
                          range
                          tipFormatter={(value) => value.toLocaleString()}
                          onChange={(value) => handleRangePrice(value)}
                          value={priceRange}
                        />
                      </div>
                    </Panel>
                    <Panel
                      header={
                        <>
                          <div class="title-collapse">
                            <span>Đánh giá</span>
                          </div>
                        </>
                      }
                      key="7"
                    >
                      <div>Đánh giá</div>
                    </Panel>
                  </Collapse>
                </div>
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
                <div style={{ position: "relative" }}>
                  {productList.load ? (
                    <Loading load={productList.load} />
                  ) : (
                    <Product
                      productList={productList}
                      searchKey={searchKey}
                      categoriesSelected={categoriesSelected}
                      typesSelected={typesSelected}
                      priceRange={priceRange}
                      departmentsSelected={departmentsSelected}
                      PRODUCT_LIMIT={PRODUCT_LIMIT}
                    />
                  )}
                </div>
              </Style.ProductContent>
            </Style.ProductLayout>
          </Container>
        </>
      )}
    </>
  );
}

export default ProductPage;
