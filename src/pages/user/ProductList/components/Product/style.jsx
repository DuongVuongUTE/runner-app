import styled from "styled-components";

export const ProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  min-height: 700px;
  grid-gap: 15px;
  @media screen and (max-width: 1023px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(3, 1fr);
    min-height: unset;
  }
  @media screen and (max-width: 460px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
export const ProductItem = styled.div``;
