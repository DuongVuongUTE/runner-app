import styled, { css } from 'styled-components';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Sider } = Layout;
export const CustomSider = styled(Sider)`
  padding-top: 60px;
  font-family: 'Kaisei Tokumin', serif;
`;
export const CustomMenu = styled(Menu)`
  font-size: 17px;
  & span{
    font-size: 17px !important;
  }
`;

