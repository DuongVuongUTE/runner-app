import styled from "styled-components";

export const CardProduct = styled.div`
  position: relative;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

export const ProductImage = styled.div`
  position: relative;
  padding-top: 100%;
  cursor: pointer;
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
  text-align: left;
  h3 {
    color: #000;
    font-size: 14px;
    font-weight: 500;
    -webkit-transition: all linear 0.2s;
    transition: all linear 0.2s;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    width: fit-content;
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
    font-size: 14px;
    padding-top: 10px;
    word-break: break-word;
  }
  .star {
    font-size: 10px;
    .ant-rate-star:not(:last-child) {
      margin-right: 4px;
    }
  }
  .card-info {
    width: 100%;
    justify-content: space-between;
    margin-top: 20px;
    .brand {
      font-size: 14px;
      font-weight: 500;
      color: #002878;
    }
  }
`;
