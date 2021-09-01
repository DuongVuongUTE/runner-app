import styled from "styled-components";

export const LoginContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  min-height: 100vh;
  background: linear-gradient(45deg, #f53e2d, #2d88ff);
  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: -1;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 500px;
    gap: 30px;
    padding: 15px;
    background-color: #fff;
    z-index: 1;
    @media screen and (max-width: 1023px) {
      width: 100%;
    }
  }
  .login-title {
    h1 {
      font-weight: 600;
      color: #002878;
      padding-bottom: 15px;
      cursor: pointer;
    }
    h2 {
    }
  }
  .form-login {
    flex: 1;
  }
`;
