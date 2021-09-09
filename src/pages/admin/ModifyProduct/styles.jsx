import styled from "styled-components";
import { Form, Input, Button,InputNumber, Tag, Radio, Upload } from 'antd';

export const Container = styled.div`
  &>div{
    max-width: 80%;
    margin: 0 auto;
  }
  &>.form{
    margin: 30px auto;
    padding: 60px 40px;
    max-width: 80%;
    background-color: #80808022;
  }
  & label{
    font-size: 14px;
    font-weight: 500;
    color: black;
  }
 `
 export const customRadio = styled(Radio)`
  margin: 10px;
  width: 100px;
`
export const customTag = styled(Tag)`
  min-width: 80px;
`
export const Title = styled.h3`
  font-family: 'Times New Roman', Times, serif;
  font-size: 20px;
  text-transform: uppercase;
  color:#096dd9;
  font-weight: 900;
`
export const ImagesBox = styled.div`
  position: relative;
  & .icon_delete{
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    color: red;
    font-size: 20px;
    background-color: #80808024;
    z-index: 9999;
  }
`

