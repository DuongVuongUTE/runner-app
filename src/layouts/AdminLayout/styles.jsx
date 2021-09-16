import styled, { css } from 'styled-components';

import { Layout, Menu, Breadcrumb } from 'antd';
const { Content } = Layout;

export const ComponentsLayout=styled.div`
  
`
export const SiteLayout = styled(Layout)`
  height: calc(100vh - 100px);
  margin-bottom: 10px;
  margin-left: 16px;
  margin-right: 16px;
`
export const CustomContent = styled(Content)`
  background-color: white;
  width: 100%;
  overflow: hidden;
`
