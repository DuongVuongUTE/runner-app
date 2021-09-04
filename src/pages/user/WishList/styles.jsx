import styled from "styled-components";

export const CartPage = styled.div`
  padding: 30px 0;
  .cart-right {
    display: flex;
    flex-direction: column;
    gap: 15px;
    .list-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
`;

export const CartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const CartItem = styled.div`
  display: flex;
  width: 100%;
  transition: all 0.2s linear;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  @media screen and (max-width: 767px) {
    &:hover {
      box-shadow: unset;
    }
  }
  .cart-image {
    width: 240px;
    flex-shrink: 0;
    img {
      max-width: 100%;
    }
    @media screen and (max-width: 767px) {
      & {
        width: 125px;
        flex-shrink: 0;
        img {
          max-width: 100%;
        }
      }
    }
    @media screen and (max-width: 450px) {
      & {
        width: 100px;
        flex-shrink: 0;
        img {
          max-width: 100%;
        }
      }
    }
    @media screen and (max-width: 450px) {
      & {
        width: 75px;
        flex-shrink: 0;
        img {
          max-width: 100%;
        }
      }
    }
  }
  .cart-content {
    flex-grow: 1;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    @media screen and (max-width: 767px) {
      padding: 0 15px;
    }
    @media screen and (max-width: 550px) {
      padding: 0 10px;
    }
    @media screen and (max-width: 450px) {
      padding: 0 5px 0 10px;
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

  .cart-action {
    flex-shrink: 0;
    padding: 20px 15px;
    @media screen and (max-width: 767px) {
      padding: 0 15px;
    }
    @media screen and (max-width: 550px) {
      padding: 0 10px;
    }
    @media screen and (max-width: 450px) {
      padding: 0 5px;
    }
    .cart-btn {
      display: flex;
      flex-direction: column;
      gap: 15px;
      @media screen and (max-width: 374px) {
        .ant-btn-icon-only {
          width: 26px;
          height: 26px;
          padding: 0px 0;
          font-size: 14px;
          border-radius: 2px;
        }
      }
    }
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
