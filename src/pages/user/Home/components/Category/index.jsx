import React, { useEffect } from "react";

import categoryMen from "../../../../../assets/images/categorymen.jpeg";
import categoryWomen from "../../../../../assets/images/categorywoman.jpeg";
import categoryKids from "../../../../../assets/images/categorykids.jpg";

import * as Style from "./style";

function CategoryHome() {
  const categoryList = [
    {
      image: categoryMen,
      tag: "Bộ sưu tập",
      category: "Giày nam",
    },
    {
      image: categoryWomen,
      tag: "Bộ sưu tập",
      category: "Giày nữ",
    },
    {
      image: categoryKids,
      tag: "Bộ sưu tập",
      category: "Giày trẻ em",
    },
  ];

  useEffect(() => {
    //preload image
    categoryList.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  function renderCategory() {
    return categoryList.map((category, index) => {
      return (
        <Style.CategoryItem key={index}>
          <img src={category.image} alt="" />
          <div className="category-content">
            <span>{category.tag}</span>
            <h2>{category.category}</h2>
          </div>
        </Style.CategoryItem>
      );
    });
  }
  return (
    <Style.Category>
      <Style.CategoryList>{renderCategory()}</Style.CategoryList>
    </Style.Category>
  );
}

export default CategoryHome;
