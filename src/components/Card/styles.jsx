import styled from "styled-components";

export const CardProduct = styled.div`
  position: relative;
  @keyframes showMore {
    from {
      transform: scaleY(0);
      opacity: 0;
      visibility: hidden;
    }
    to {
      transform: scaleY(1);
      opacity: 1;
      visibility: visible;
    }
  }
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
  .product-more {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 5px;
    z-index: 10;
    border-top: 1px solid red;
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    display: none;
    transform-origin: top;
    animation: showMore 0.3s;
    .size {
      display: flex;
      strong {
        display: block;
        flex-shrink: 0;
        padding-top: 4px;
        margin-right: 10px;
        word-break: break-word;
      }
    }
    .product-button {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      gap: 15px;
    }
  }
  &:hover .product-more {
    display: block;
  }
  @media screen and (max-width: 767px) {
    &:hover .product-more {
      display: none;
    }
  }
`;

export const ProductImage = styled.div`
  position: relative;
  padding-top: 100%;
  cursor: pointer;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .visible {
    z-index: 2;
    opacity: 1;
    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1) 0.15s;
  }
  .hidden {
    z-index: 1;
  }
  &:hover .visible {
    opacity: 0;
  }
`;
export const ProductContent = styled.div`
  padding: 10px 10px 15px;
  text-align: center;
  h3 {
    color: #000;
    font-size: 14px;
    font-weight: 500;
    -webkit-transition: all linear 0.2s;
    transition: all linear 0.2s;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
    margin: auto;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-word;
    cursor: pointer;
    &:hover {
      color: #3f62a7;
    }
  }
  strong {
    display: block;
    margin-top: 10px;
    word-break: break-word;
  }
`;
