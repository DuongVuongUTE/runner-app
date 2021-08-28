import styled from "styled-components";

export const ProductTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 30px;
`;
export const ProductLayout = styled.div`
  display: flex;
  gap: 30px;
  .ant-collapse-item {
    border: 1px solid #e3e7ef;
  }
`;
export const ProductFilter = styled.div`
  width: 250px;
  flex-shrink: 0;
  .ant-checkbox-group-item {
    display: flex;
  }
  h3 {
    padding: 10px 0;
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
