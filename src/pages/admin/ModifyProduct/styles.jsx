import styled from "styled-components";
import { Form, Input, Button,InputNumber, Tag, Radio, Upload } from 'antd';

export const Container = styled.div`
  &>div{
    margin: 30px auto;
    padding: 60px 40px;
    max-width: 700px;
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
export const Title = styled.h2`
  font-size: 20px;
  text-transform: uppercase;
  font-weight: 900;
  color:#330867;
`

