import styled, { css } from 'styled-components';

import { Layout, Menu, Breadcrumb } from 'antd';

export const ComponentsLayout=styled.div`
  & .logo {
    height: 32px;
    margin: 16px;
    background: rgba(255, 255, 255, 0.3);
  }
`

export const SiteLayout = styled(Layout)`
  & .site-layout-background {
  background: #fff;
}
`
