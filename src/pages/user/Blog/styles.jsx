import styled from "styled-components";
import { Container } from "../../../styles/styles";

export const BlogPage = styled.div``;

export const Breadcrumb = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  transform: translateX(-50%);
  color: white;
`;
export const Hero = styled.div`
  position: relative;
  padding-top: 150px;
  background-image: linear-gradient(to right, #cb5eee, #4be1ec);
  margin-bottom: 45px;
`;

export const HeroTitle = styled.h2`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  text-align: center;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: #fff;
  margin-bottom: 30px;
`;

export const BlogContainer = styled(Container)``;
