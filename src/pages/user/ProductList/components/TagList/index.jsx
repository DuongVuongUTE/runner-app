import React from "react";
import { Space, Tag } from "antd";
import { useDispatch } from "react-redux";
import history from "../../../../../utils/history";
import { getProductListAction } from "../../../../../redux/actions";

function TagList({
  typeList,
  departmentList,
  categoryList,
  categoriesSelected,
  searchKey,
  typesSelected,
  departmentsSelected,
  priceRange,
  setCategoriesSelect,
  setSearchKey,
  setTypesSelect,
  setDepartmentsSelect,
  setPriceRange,
}) {
  const dispatch = useDispatch();

  function renderTagFilter() {
    if (
      categoriesSelected.length === 0 &&
      !searchKey &&
      typesSelected.length === 0 &&
      (departmentsSelected.length === 0 ||
        (departmentsSelected.length > 0 &&
          history.location.pathname !== "/product")) &&
      priceRange[0] === 0 &&
      priceRange[1] === 15000000
    )
      return null;
    return (
      <Space wrap style={{ padding: "5px 0 15px" }} size={[0, 8]}>
        {/* Đang filter theo: */}
        {categoriesSelected.length > 0 &&
          categoriesSelected.map((selectedItem, selectedIndex) => {
            const categorySelectedData = categoryList.data.find(
              (categoryItem) => categoryItem.id === selectedItem
            );
            return (
              <Tag
                color="geekblue"
                key={`category-${selectedIndex}`}
                closable
                onClose={(e) => {
                  e.preventDefault();
                  const newCategoriesSelect = [...categoriesSelected];
                  newCategoriesSelect.splice(selectedIndex, 1);
                  setCategoriesSelect(newCategoriesSelect);
                  dispatch(
                    getProductListAction({
                      page: 1,
                      categoriesSelected: newCategoriesSelect,
                      priceRange,
                      departmentsSelected: departmentsSelected,
                      typesSelected: typesSelected,
                      searchKey: searchKey,
                    })
                  );
                }}
              >
                {categorySelectedData.name}
              </Tag>
            );
          })}
        {typesSelected.length > 0 &&
          typesSelected.map((typeSelectedItem, typeSelectedIndex) => {
            const typeSelectedData = typeList.data.find(
              (typeItem) => typeItem.id === typeSelectedItem
            );
            return (
              <Tag
                color="geekblue"
                key={`type-${typeSelectedIndex}`}
                closable
                onClose={(e) => {
                  e.preventDefault();
                  const newTypesSelect = [...typesSelected];
                  newTypesSelect.splice(typeSelectedIndex, 1);
                  setTypesSelect(newTypesSelect);
                  dispatch(
                    getProductListAction({
                      page: 1,
                      categoriesSelected: categoriesSelected,
                      typesSelected: newTypesSelect,
                      priceRange,
                      departmentsSelected: departmentsSelected,
                      searchKey: searchKey,
                    })
                  );
                }}
              >
                {typeSelectedData.name}
              </Tag>
            );
          })}
        {departmentsSelected.length > 0 &&
          history.location.pathname === "/product" &&
          departmentsSelected.map(
            (departmentSelectedItem, departmentSelectedIndex) => {
              const departmentSelectedData = departmentList.data.find(
                (departmentItem) => departmentItem.id === departmentSelectedItem
              );
              return (
                <Tag
                  color="geekblue"
                  key={`type-${departmentSelectedIndex}`}
                  closable
                  onClose={(e) => {
                    e.preventDefault();
                    const newDepartmentSelect = [...departmentsSelected];
                    newDepartmentSelect.splice(departmentSelectedIndex, 1);
                    setDepartmentsSelect(newDepartmentSelect);
                    dispatch(
                      getProductListAction({
                        page: 1,
                        categoriesSelected: categoriesSelected,
                        typesSelected: typesSelected,
                        departmentsSelected: newDepartmentSelect,
                        priceRange,
                        searchKey: searchKey,
                      })
                    );
                  }}
                >
                  {departmentSelectedData.name}
                </Tag>
              );
            }
          )}
        {/* {searchKey && (
          <Tag
            color="geekblue"
            closable
            onClose={() => {
              setSearchKey("");
              dispatch(
                getProductListAction({
                  page: 1,
                  categoriesSelected,
                  priceRange,
                  typesSelected,
                  departmentsSelected,
                  searchKey: undefined,
                })
              );
            }}
          >
            {`Tìm theo từ khóa: ${searchKey}`}
          </Tag>
        )} */}
        {(priceRange[0] !== 0 || priceRange[1] !== 15000000) && (
          <Tag
            color="geekblue"
            closable
            onClose={() => {
              setPriceRange([0, 15000000]);
              dispatch(
                getProductListAction({
                  page: 1,
                  categoriesSelected,
                  typesSelected,
                  departmentsSelected,
                  priceRange: [0, 15000000],
                  searchKey,
                })
              );
            }}
          >
            {`Giá từ: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}`}
          </Tag>
        )}
        {(priceRange[0] !== 0 ||
          priceRange[1] !== 15000000 ||
          (departmentsSelected.length > 0 &&
            history.location.pathname === "/product") ||
          typesSelected.length > 0 ||
          categoriesSelected.length > 0) && (
          <Tag
            closable
            color="red"
            onClose={() => {
              setPriceRange([0, 15000000]);
              setCategoriesSelect([]);
              setTypesSelect([]);
              if (history.location.pathname === "/product") {
                setDepartmentsSelect([]);
              }
              dispatch(
                getProductListAction({
                  page: 1,
                  categoriesSelected: [],
                  typesSelected: [],
                  departmentsSelected:
                    history.location.pathname === "/product"
                      ? []
                      : departmentsSelected,
                  priceRange: [0, 15000000],
                  searchKey,
                })
              );
            }}
          >
            Xoá tất cả
          </Tag>
        )}
      </Space>
    );
  }
  return <>{renderTagFilter()}</>;
}

export default TagList;
