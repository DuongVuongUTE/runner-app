import styled, { css } from 'styled-components';
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Sider } = Layout;
export const CustomSider = styled(Sider)`
  padding-top: 30px;
  background: #330867d3;
`;
export const CustomMenu = styled(Menu)`
  background-color:transparent;
  color: white;
`;

// export const SidebarItem = styled.div`
//   position: relative;
//   display: flex;
//   align-items: center;
//   padding: 0 16px;
//   height: 50px;
//   color: #110202;
//   cursor: pointer;

//   &:hover {
//     background-color: ${(props) => props.theme.hover};
//   }

//   ${(props) => props.active && css`
//     background-color: ${(props) => props.theme.active} !important;
//     border-right: 5px solid #b5f5ec;
//   `}
// `;
