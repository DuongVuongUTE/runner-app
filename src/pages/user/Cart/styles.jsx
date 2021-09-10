import styled from "styled-components";

export const Breadcrumb = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  color: white;
`;
export const Hero = styled.div`
  position: relative;
  padding-top: 150px;
  background-image: linear-gradient(to right, #cb5eee, #4be1ec);
`;

export const HeroTitle = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #fff;
  margin-bottom: 30px;
`;

export const CartPage = styled.div`
  /* padding: 30px 0; */
  min-height: 100vh;
  background-color: #f3f3f3;
  .cart {
    padding: 15px 0;
  }
  .cart-right {
    position: sticky;
    top: 15px;
    display: flex;
    flex-direction: column;
    gap: 15px;
    .list-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .ant-list {
      background-color: #fff;
    }
    @media screen and (max-width: 450px) {
      .ant-list-bordered .ant-list-header {
        padding-right: 15px;
        padding-left: 15px;
      }
      .ant-list-bordered .ant-list-item {
        padding-right: 15px;
        padding-left: 15px;
      }
    }
  }
`;

export const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const CartItem = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  transition: all 0.2s linear;
  background-color: #fff;
  border: 1px solid #dee2e6;
  padding: 10px;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  @media screen and (max-width: 767px) {
    &:hover {
      box-shadow: unset;
    }
  }
  .cart-image {
    position: relative;
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    @media screen and (max-width: 767px) {
      & {
        width: 125px;
        height: 125px;
      }
    }
    @media screen and (max-width: 450px) {
      & {
        width: 100px;
        height: 100px;
      }
    }
    @media screen and (max-width: 350px) {
      & {
        width: 75px;
        height: 75px;
      }
    }
  }
  .cart-content {
    flex-grow: 1;
    padding-left: 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media screen and (max-width: 550px) {
      padding-left: 10px;
    }
    .cart-content-box {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: baseline;
      font-size: 16px;
      font-weight: 700;
      @media screen and (max-width: 767px) {
        font-size: 14px;
      }
      @media screen and (max-width: 450px) {
        flex-direction: column;
        gap: 5px;
      }
      h3 {
        font-family: "Poppins", sans-serif;
        text-transform: uppercase;
        margin-bottom: 0;
        cursor: pointer;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
        @media screen and (max-width: 520px) {
          font-size: 14px;
        }
      }
      span {
        white-space: nowrap;
      }
    }
    .cart-info-list {
      display: flex;
      flex: 1;
      flex-direction: column;
      gap: 10px;
      @media screen and (max-width: 374px) {
        display: none;
      }

      .cart-info-item {
        font-size: 14px;
        .cart-info-text {
          font-weight: 600;
        }
      }
    }
  }

  .cart-btn {
    position: absolute;
    bottom: 10px;
    right: 10px;
  }

  @media screen and (max-width: 400px) {
    .quantity {
      .ant-btn-icon-only {
        width: 24px;
        height: 24px;
        padding: 0px 0;
        font-size: 14px;
        border-radius: 2px;
      }
      .ant-input {
        padding: unset;
        height: 100%;
      }
    }
  }
`;
