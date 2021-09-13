import React, { useEffect, useState } from "react";
import { Container } from "../../../styles/styles";
import { Collapse, Checkbox, Input, Select, Slider } from "antd";
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
import Hero from "../../../components/Hero";
import { TITLE } from "../../../constants/title";
import { SIZE_LIST } from "../../../constants/size";
import { COLOR_MENU } from "../../../constants/color";
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

function ProductPage() {
  document.title = TITLE.PRODUCT_LIST;
  const { productList } = useSelector((state) => state.productReducer);
  const { categoryList } = useSelector((state) => state.categoryReducer);
  const { typeList } = useSelector((state) => state.typeReducer);
  const { departmentList } = useSelector((state) => state.departmentReducer);
  const [categoriesSelected, setCategoriesSelect] = useState([]);
  const [sortValue, setSortValue] = useState("");
  const [typesSelected, setTypesSelect] = useState([]);
  const [departmentsSelected, setDepartmentsSelect] = useState([]);
  const [sizeSelected, setSizeSelect] = useState([]);
  const [colorSelected, setColorSelect] = useState([]);
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
        colorSelected,
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
        colorSelected,
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
        colorSelected,
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
        colorSelected,
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
        colorSelected,
      })
    );
  }

  function handleFilterSize(value) {
    setSizeSelect(value);
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected,
        typesSelected,
        priceRange,
        searchKey,
        departmentsSelected,
        colorSelected,
      })
    );
  }

  function handleFilterColor(value) {
    setColorSelect(value);
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected,
        typesSelected,
        priceRange,
        searchKey,
        colorSelected: value,
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

  function renderSizeCheckbox() {
    const sizeCheckbox = SIZE_LIST.map((sizeItem) => ({
      label: sizeItem.size,
      value: sizeItem.id,
    }));
    return (
      <Checkbox.Group
        options={sizeCheckbox}
        onChange={(value) => handleFilterSize(value)}
        value={sizeSelected}
      />
    );
  }

  function renderColorCheckbox() {
    const colorCheckbox = COLOR_MENU.map((colorItem) => ({
      label: (
        <Style.Color
          className="color"
          color={
            colorItem.code !== "multiColor"
              ? `#${colorItem.code}`
              : colorItem.code
          }
        ></Style.Color>
      ),
      value: colorItem.code,
    }));
    return (
      <Checkbox.Group
        options={colorCheckbox}
        onChange={(value) => handleFilterColor(value)}
        value={colorSelected}
      />
    );
  }

  function handleChange(value) {
    setSortValue(value);
    dispatch(
      getProductListAction({
        page: 1,
        categoriesSelected,
        typesSelected,
        priceRange,
        searchKey,
        colorSelected,
        departmentsSelected,
        sortValue: value,
      })
    );
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
          <Hero
            title={
              history.location.pathname === "/product"
                ? "Tất cả sản phẩm"
                : history.location.pathname === "/product/men"
                ? "Giày nam"
                : history.location.pathname === "/product/woman"
                ? "Giày nữ"
                : history.location.pathname === "/product/kids"
                ? "Giày trẻ em"
                : null
            }
          />
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
                    colorSelected={colorSelected}
                    setColorSelect={setColorSelect}
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
                      <div className="checkbox-normal">
                        {renderSizeCheckbox()}
                      </div>
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
                      <div className="checkbox-normal color-list">
                        {renderColorCheckbox()}
                      </div>
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
                      <Select.Option value="price-desc">
                        Giá cao đến thấp
                      </Select.Option>
                      <Select.Option value="price-asc">
                        Giá thấp đến cao
                      </Select.Option>
                      <Select.Option value="id-desc">Mới nhất</Select.Option>
                      <Select.Option value="id-asc">Cũ nhất</Select.Option>
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
