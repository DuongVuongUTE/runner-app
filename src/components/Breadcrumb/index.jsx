import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import * as Style from "./style";
import history from "../../utils/history";

function BreadcrumbUI() {
  const breadcrumbNameMap = {
    "/product": "Tất cả sản phẩm",
    "/product/men": "Giày nam",
    "/product/woman": "Giày nữ",
    "/product/kids": "Giày trẻ em",
    "/blog": "Bài viết",
  };
  const { location } = history;
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>{breadcrumbNameMap[url]}</Link>
      </Breadcrumb.Item>
    );
  });
  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Trang chủ</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems);
  return (
    <Style.Breadcrumb>
      <Breadcrumb separator="-">{breadcrumbItems}</Breadcrumb>
    </Style.Breadcrumb>
  );
}

export default BreadcrumbUI;
