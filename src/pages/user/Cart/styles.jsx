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
  .cart-image {
    width: 240px;
    flex-shrink: 0;
    img {
      max-width: 100%;
    }
  }
  .cart-content {
    flex-grow: 1;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    .cart-content-box {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      align-items: baseline;
      font-size: 16px;
      font-weight: 700;
      h3 {
        font-family: "Poppins", sans-serif;
        text-transform: uppercase;
        cursor: pointer;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
        word-break: break-word;
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
    .cart-btn {
      display: flex;
      flex-direction: column;
      gap: 15px;
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
