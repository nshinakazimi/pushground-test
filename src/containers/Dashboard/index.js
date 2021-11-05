import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Dropdown, Avatar, Breadcrumb, message } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { logout } from "../../actions/user";
import { getAudiences, getEvents, setCurrentTableData } from "../../actions/data";

import AudienceTable from "../../components/Dashboard/AudienceTable";
import Graph from "../../components/Dashboard/Graph";

import Spinner from "../../components/Common/Spinner";

import { HeaderContainer, ContentContainer, FooterContainer, Logo, ContentWrapper } from "./styles";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);

  const audiences = useSelector((state) => state.data.audiences);
  const dispatch = useDispatch();

  const onClick = ({ key }) => {
    if (key === "logout") dispatch(logout());
  };

  const getTableData = (list) => {
    const newData = list.map((item) => {
      return { ...item, key: item.id, checked: false };
    });
    return newData;
  };

  useEffect(() => {
    if (audiences && audiences.length) {
      const tableData = getTableData(audiences);
      dispatch(setCurrentTableData(tableData));
      message.success("Table Data Loading Success!", 2);
    } else
      (async () => {
        setIsLoading(true);
        await dispatch(getAudiences());
        await dispatch(getEvents());
        setIsLoading(false);
      })();
  }, [audiences, dispatch]);

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
        <ContentWrapper>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <Graph />
              <AudienceTable />
            </>
          )}
        </ContentWrapper>
      </ContentContainer>
      <FooterContainer style={{ textAlign: "center" }}>Pushground ©2021</FooterContainer>
    </Layout>
  );
};

export default Dashboard;
