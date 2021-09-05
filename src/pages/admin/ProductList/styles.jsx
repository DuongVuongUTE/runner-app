import styled from "styled-components";
import { Table, Button, List } from "antd";

export const Title = styled.h3`
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
  text-transform: uppercase;
  color:#330867;
  font-weight: 900;
`
export const CustomButton = styled(Button)`
  height: auto;
  font-size: 16px;
`
export const Search = styled.div`
  margin: 20px;
  display: flex;
  font-weight: 900;
  justify-content: flex-end;
`
export const CustomTable = styled(Table)`
  & th{
    text-transform: uppercase;
    background-color: #391085 !important;
    color: white !important;
    white-space: nowrap;
  }
`
export const ListItem = styled(List.Item)`
  background-color: #feffe6;
`