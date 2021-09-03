import { Space } from "antd";
import styled from "styled-components";

export const Section = styled.div`
  padding: 30px 0;
  .list-info {
    position: relative;
    height: 380px;
    overflow: hidden;
    &::after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      height: 100px;
      width: 100%;
      background-color: rgba(255, 255, 255, 0.6);
      z-index: 1;
    }
    &.active {
      height: auto;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 0;
        width: 100%;
        background-color: rgba(255, 255, 255, 0.6);
        z-index: 1;
      }
    }
  }
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
  .product-info {
    h3 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 20px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }
    .product-rate {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 20px;
      .rate {
        font-size: 14px;
        .ant-rate-star:not(:last-child) {
          margin-right: 5px;
        }
      }
      .number-rate {
        position: relative;
        display: inline-flex;
        top: 1px;
      }
    }
    .product-price {
      font-size: 24px;
      color: #ff514e;
      margin-bottom: 20px;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-word;
    }
    .product-info-list {
      display: flex;
      gap: 30px;
      align-items: center;
      margin-bottom: 20px;
      @media screen and (max-width: 400px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
    }
    .product-info-tag {
      font-size: 14px;
    }
    .product-info-text {
      font-weight: 600;
    }
    .product-department {
      margin-bottom: 20px;
    }
    .product-color {
      display: flex;
      gap: 5px;
      align-items: center;
      margin-bottom: 20px;
    }
    .product-option {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
      strong {
        color: #ff514e;
      }
    }
    .product-action {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      padding: 15px 0;
      margin-bottom: 30px;
      border-top: 1px solid rgba(0, 0, 0, 0.08);
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
      gap: 30px 15px;
    }
  }
  .product-related {
    text-align: center;
    margin-bottom: 25px;
    div {
      font-weight: 600;
      font-size: 14px;
      color: #ff514e;
    }
    h2 {
      margin-top: 10px;
      font-weight: 700;
      color: rgba(0, 0, 0, 0.84);
    }
  }
`;
export const Color = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  border: 2px solid rgb(229, 229, 229);
  background: ${(props) =>
    props.color
      ? props.color === "multiColor"
        ? "radial-gradient(circle, #59ae12, #a5a100, #d88f1f, #f77e54, #ff7887, #fb81b6, #e493df, #bfa8fd, #8bc3ff, #4cdaff, #29edff, #5ffbf1);"
        : props.color
      : "white"};
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
