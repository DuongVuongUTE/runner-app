import styled from "styled-components";

export const ProductLayout = styled.div`
  display: flex;
  padding: 30px 0 30px 0;
  gap: 30px;
  .ant-collapse-item {
    border: 1px solid #e3e7ef;
  }
`;
export const ProductFilter = styled.div`
  width: 250px;
  flex-shrink: 0;
  .sticky {
    position: sticky;
    top: 15px;
    z-index: 10;
  }
  h3 {
    padding: 10px 0;
    border-bottom: 3px solid #003a8c;
    color: #003a8c;
    font-weight: 600;
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
  .checkbox-normal {
    .ant-checkbox-group-item {
      display: inline-flex;
      min-width: 50px;
    }
  }
  .color-list {
    .ant-checkbox-group-item {
      display: inline-flex;
      min-width: unset;
    }
    .ant-checkbox {
      display: none;
    }
    .ant-checkbox-wrapper-checked {
      .color {
        border-color: #2d88ff;
        border-style: dotted;
        box-shadow: 0 0 0 2px #003a8c;
      }
    }
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

export const Color = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid rgb(229, 229, 229);
  background: ${(props) =>
    props.color
      ? props.color === "multiColor"
        ? "radial-gradient(circle, #59ae12, #a5a100, #d88f1f, #f77e54, #ff7887, #fb81b6, #e493df, #bfa8fd, #8bc3ff, #4cdaff, #29edff, #5ffbf1);"
        : props.color
      : "white"};
`;
