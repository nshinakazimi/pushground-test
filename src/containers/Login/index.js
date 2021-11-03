import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Form, Input, Button } from "antd";

import { login } from "../../actions/user";

import {
  LoginContainer,
  LoginFormContainer,
  LoginFormWrapper,
  LoginFormTitle,
  LoginForm,
  LoginImageWrapper,
  LoginImage,
} from "./styles";
import loginImg from "../../assets/images/quick-tip-04.png";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const onFinish = (values) => {
    dispatch(login(values.username));
  };

  useEffect(() => {
    if (isAuthenticated) history.push({ pathname: `/dashboard` });
  }, [isAuthenticated, history]);

  return isAuthenticated ? null : (
    <LoginContainer>
      <LoginFormContainer>
        <LoginFormWrapper>
          <LoginFormTitle>Welcome to Pushground</LoginFormTitle>
          <LoginForm layout="vertical" onFinish={onFinish} requiredMark={"optional"}>
            <Form.Item
              label={<h3>Log in</h3>}
              name="username"
              rules={[{ required: true, type: "email", message: "Please input your username or email." }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="password" rules={[{ required: true, message: "Please input your password." }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" block danger>
                Submit
              </Button>
            </Form.Item>
          </LoginForm>
        </LoginFormWrapper>
      </LoginFormContainer>
      <LoginImageWrapper>
        <LoginImage>
          <img src={loginImg} alt="Pushground" />
          <h4>Quick tip</h4>
          <p>Using pre-landers can help you improve the performance of your campaigns.</p>
        </LoginImage>
      </LoginImageWrapper>
    </LoginContainer>
  );
};

export default Login;
