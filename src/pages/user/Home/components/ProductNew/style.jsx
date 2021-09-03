import styled from "styled-components";

export const ProductList = styled.div`
  --spacing: 20px;
  --column: 5;
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
  margin-left: calc(-1 * var(--spacing));
  margin-bottom: calc(-1 * var(--spacing) + 10px);
  & > * {
    margin-left: var(--spacing);
    margin-bottom: calc(var(--spacing) + 10px);
    width: calc((100% / var(--column)) - var(--spacing));
  }
  @media screen and (max-width: 1080px) {
    --spacing: 15px;
    --column: 4;
    justify-content: center;
  }

  @media screen and (max-width: 920px) {
    --spacing: 15px;
    --column: 3;
  }

  @media screen and (max-width: 767px) {
    --spacing: 10px;
    --column: 2;
  }
`;
export const ProductItem = styled.div``;
