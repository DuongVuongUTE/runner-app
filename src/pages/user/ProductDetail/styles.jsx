import { Space } from "antd";
import styled from "styled-components";

export const Section = styled.div`
  padding: 30px 0;
`;
export const ProductDetail = styled.div`
  padding: 15px 0;
  .slide-item {
    .ant-image {
      position: relative;
      padding-top: 70%;
      width: 100%;
      .slide-image {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: block;
        object-position: center;
        object-fit: cover;
      }
    }
  }
`;
export const Color = styled.div`
  margin-top: 10px;
  height: 20px;
  box-shadow: 0 0 0 3px white,
    0 0 0 4px
      ${(props) =>
        props.color
          ? props.color === "multiColor"
            ? "#002878"
            : props.color
          : "white"},
    0 0 0 4px black;
  width: 20px;
  ${(props) =>
    props.color
      ? props.color === "multiColor"
        ? "background-image: radial-gradient(circle, #59ae12, #a5a100, #d88f1f, #f77e54, #ff7887, #fb81b6, #e493df, #bfa8fd, #8bc3ff, #4cdaff, #29edff, #5ffbf1);"
        : props.color
      : "white"};
  background-color: ${(props) => (props.color ? props.color : "white")}; ;
`;
export const ListProductDetail = styled(Space)`
  width: 100%;
  img {
    display: block;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #1dbfaf;
    cursor: pointer;
  }
`;
