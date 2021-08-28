import { Space } from "antd";
import styled from "styled-components";

export const Section = styled.div`
  padding: 30px 0;
`;
export const ProductDetail = styled.div`
  padding: 15px 0;
`;
export const Color = styled.div`
  margin-top: 10px;
  height: 20px;
  box-shadow: 0 0 0 3px white,
    0 0 0 4px ${(props) => (props.color ? props.color : "white")};
  width: 20px;
  background-color: ${(props) => (props.color ? props.color : "white")};
`;
export const ListProductDetail = styled(Space)`
  width: 100%;
  img {
    display: block;
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #1dbfaf;
    cursor: pointer;
  }
`;
