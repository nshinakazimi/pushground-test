import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Layout, Menu, Dropdown, Avatar, Breadcrumb, message } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import { logout } from "../../actions/user";
import { getAudiences, getEvents } from "../../actions/data";

import AudienceTable from "../../components/Dashboard/AudienceTable";

import Spinner from "../../components/Common/Spinner";

import { HeaderContainer, ContentContainer, FooterContainer, Logo, ContentWrapper } from "./styles";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const audiences = useSelector((state) => state.data.audiences);
  const events = useSelector((state) => state.data.events);

  const dispatch = useDispatch();

  const onClick = ({ key }) => {
    if (key === "logout") dispatch(logout());
  };

  const getTableData = (list) => {
    const newData = list.map((item) => {
      return { ...item, key: item.id };
    });
    return newData;
  };

  useEffect(() => {
    if (audiences && audiences.length) {
      setTableData(getTableData(audiences));
      message.success("Table Data Loading Success!", 2);
    } else
      (async () => {
        setIsLoading(true);
        await dispatch(getAudiences());
        setIsLoading(false);
      })();
  }, [audiences, dispatch]);

  useEffect(() => {
    if (events && events.length) setGraphData(events);
    else
      (async () => {
        setIsLoading(true);
        await dispatch(getEvents());
        setIsLoading(false);
      })();
  }, [events, dispatch]);

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
              <AudienceTable tableData={tableData} />
            </>
          )}
        </ContentWrapper>
      </ContentContainer>
      <FooterContainer style={{ textAlign: "center" }}>Pushground ©2021</FooterContainer>
    </Layout>
  );
};

export default Dashboard;
