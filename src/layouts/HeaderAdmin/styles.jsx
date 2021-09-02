import styled from "styled-components";
import { Row, Col ,Space} from 'antd';

export const HeaderContainer = styled.div`
  padding: 20px 40px;
  background: #330867;
`
export const HeaderLogo = styled.h1`
  flex-shrink: 0;
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
  background-image: linear-gradient(to right, #e7ecec 0%, #7f6c97 100%);
  text-transform: uppercase;
  font-style: italic;
  font-size: 36px;
  font-weight: 700;
  font-family: "Poppins", sans-serif;
  margin: 0;
  cursor: pointer;
  @media screen and (max-width: 767px) {
    font-size: 26px;
  }
  @media screen and (max-width: 340px) {
    font-size: 22px;
  }
`;

export const CustomSpace = styled(Space)`
  width: 100%;
  justify-content: flex-end;
`
export const profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 20px;
  border-radius: 30px;
  border: 1px solid white;
  cursor: pointer;
  color: white;
  &>span{
    margin: 0;
  }
  &>div{
    margin-right: 20px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    &>img{
      width: 100%;
    }
  }
`