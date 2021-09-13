import styled from "styled-components";
import { Table, Button, List, Space } from "antd";

export const Title = styled.h3`
  font-size: 20px;
  text-transform: uppercase;
  color:#1d3a98;
  font-weight: 900;
`
export const CustomButton = styled(Button)`
  height: auto;
  font-size: 16px;
`
export const Search = styled.div`
  display: flex;
  min-width: 400px;
  justify-content: flex-end;
  font-weight: 900;
`
export const CustomTable = styled(Table)`
  & th{
    text-transform: uppercase;
    background-color: #096dd9 !important;
    color: white !important;
    white-space: nowrap;
  }
`
export const ListItem = styled(List.Item)`
  background-color: #feffe6;
`
export const CustomSpace = styled(Space)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
`
export const ShowImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
`
export const ShowColor = styled.div`
  height: 20px;
  width: 20px;
  ${(props) => {
    if (props.color) {
      return props.color == "multiColor"
        ? "background: radial-gradient(#59ae12,#a5a100,#d88f1f,#f77e54,#ff7887,#fb81b6,#e493df,#bfa8fd,#8bc3ff,#4cdaff,#29edff,#5ffbf1);"
        : `background-color:${props.color}`
    }
  }};
  border: 1px solid #096dd9;
`