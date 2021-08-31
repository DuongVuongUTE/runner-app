import styled from "styled-components";

export const Hero = styled.div`
  position: relative;
  padding-top: 150px;
  background-image: linear-gradient(to right, #cb5eee, #4be1ec);
  margin-bottom: 45px;
`;

export const HeroTitle = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #fff;
  margin-bottom: 30px;
`;
export const ProductLayout = styled.div`
  position: sticky;
  top: 0;
  overflow: hidden;
  display: flex;
  gap: 30px;
  .ant-collapse-item {
    border: 1px solid #e3e7ef;
  }
`;
export const ProductFilter = styled.div`
  width: 250px;
  flex-shrink: 0;
  h3 {
    padding: 10px 0;
    border-bottom: 3px solid #003a8c;
  }
  .title-collapse {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .ant-collapse-header {
    border-bottom: 2px transparent solid;
    transition: all 0.4s ease-in-out;
  }
  .ant-collapse-item-active {
    border: 1px solid #003a8c;
    .title-collapse,
    .ant-collapse-arrow {
      font-weight: 500;
      color: #003a8c;
    }
    .ant-collapse-header {
      border-bottom: 1px solid #003a8c;
      &::before {
        content: "";
        position: absolute;
        top: -1px;
        left: -1px;
        width: 3px;
        height: calc(100% + 2px);
        background-color: #003a8c;
      }
    }
  }
  .ant-checkbox-group-item {
    display: flex;
  }
  @media screen and (max-width: 767px) {
    display: none;
  }
`;
export const ProductContent = styled.div`
  flex-grow: 1;
  .search-sort {
    display: flex;
    gap: 15px;
    margin-bottom: 16px;
    @media screen and (max-width: 460px) {
      flex-wrap: wrap;
    }
  }

  .select-sort {
    flex-shrink: 0;
    width: 250px;
    max-width: 100%;
    @media screen and (max-width: 767px) {
      & {
        width: unset;
      }
    }
    @media screen and (max-width: 460px) {
      width: 100%;
    }
  }
`;

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 15px;
  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 460px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const ProductItem = styled.div``;
