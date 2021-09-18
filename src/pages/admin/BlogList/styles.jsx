import styled from "styled-components";
import { Table, Button, List, Space } from "antd";

export const Title = styled.h3`
  font-size: 20px;
  text-transform: uppercase;
  color: #1d3a98;
  font-weight: 900;
`;
export const CustomButton = styled(Button)`
  height: auto;
  font-size: 16px;
`;
export const Search = styled.div`
  display: flex;
  min-width: 400px;
  justify-content: flex-end;
  font-weight: 900;
`;
export const CustomTable = styled(Table)`
  & th {
    text-transform: uppercase;
    background-color: #096dd9 !important;
    color: white !important;
    white-space: nowrap;
  }
`;
export const ListItem = styled(List.Item)`
  background-color: #feffe6;
`;
export const CustomSpace = styled(Space)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`;
export const ShowImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  height: 75px;
  width: 75px;
`;
export const ShowColor = styled.div`
  height: 20px;
  width: 20px;
  ${(props) => {
    if (props.color) {
      return props.color == "multiColor"
        ? "background:linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);"
        : `background-color:#${props.color}`;
    }
  }};
  border: 1px solid #096dd9;
`;
export const CustomSpaceBox = styled(Space)`
  display: flex;
  justify-content: space-between;
`;
