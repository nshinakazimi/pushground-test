import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Dropdown, Avatar, Breadcrumb, message } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { logout } from "../../actions/user";
import { getAudiences, getEvents } from "../../actions/data";

import Spinner from "../../components/Common/Spinner";

import { HeaderContainer, ContentContainer, FooterContainer, Logo, ContentWrapper } from "./styles";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const audiences = useSelector((state) => state.data.audiences);
  const events = useSelector((state) => state.data.events);

  const dispatch = useDispatch();

  const onClick = ({ key }) => {
    if (key === "logout") dispatch(logout());
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      if (!audiences) await dispatch(getAudiences());
      if (!events) await dispatch(getEvents((res) => res.success && message.success("Loading Success!", 2)));
      setIsLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  const menu = (
    <Menu onClick={onClick}>
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Log out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <HeaderContainer>
        <Logo src="https://app.pushground.com/assets/pushground.png" alt="logo" />
        <Dropdown overlay={menu}>
          <Avatar icon={<UserOutlined />} size={36} />
        </Dropdown>
      </HeaderContainer>
      <ContentContainer>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <ContentWrapper>{isLoading && <Spinner />}</ContentWrapper>
      </ContentContainer>
      <FooterContainer style={{ textAlign: "center" }}>Pushground ©2021</FooterContainer>
    </Layout>
  );
};

export default Dashboard;
