import styled from "styled-components";
import { Form } from "antd";

export const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;

  & > * {
    flex: 1 1 0%;
  }
`;

export const LoginFormContainer = styled.div`
  display: flex;
  align-items: center;
  @media (min-width: 768px) {
    max-width: 50%;
  }
`;

export const LoginFormWrapper = styled.div`
  max-width: 450px;
  margin: 0px auto;
  padding: 20px 30px;

  @media (min-width: 768px) {
    padding: 70px 30px 40px;
  }
`;

export const LoginFormTitle = styled.h1`
  font-weight: 600;
  line-height: 1.2;
  font-size: 38px;
  @media (min-width: 992px) {
    font-size: 48px;
  }
  @media (min-width: 768px) {
    font-size: 44px;
  }
`;

export const LoginForm = styled(Form)`
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;

export const LoginImageWrapper = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

export const LoginImage = styled.div`
  position: fixed;
  width: 50%;
  right: 0px;
  height: 100vh;
  top: 0px;
  bottom: 0px;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  background-color: rgb(231, 229, 230);
  background-image: linear-gradient(45deg, rgb(231, 229, 230) 0%, rgb(255, 255, 255) 100%);

  img {
    max-width: 80%;
    max-height: 70%;
  }

  h4 {
    font-weight: 500;
    font-size: 28px;
    margin-top: -30px;
  }

  p {
    font-size: 20px;
    line-height: 1.2;
    max-width: 75%;
    text-align: center;
  }
`;
