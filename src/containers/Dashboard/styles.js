import styled from "styled-components";
import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

export const HeaderContainer = styled(Header)`
  position: fixed;
  z-index: 1;
  width: 100%;
  align-items: center;
`;

export const NavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.img`
  float: left;
  width: 15%;
  height: 30px;
  margin: 16px 24px 16px 0;
`;

export const ContentContainer = styled(Content)`
  padding: 0 3.125rem;
  margin-top: 4rem;
`;

export const ContentWrapper = styled.div`
  position: relative;
  padding: 24px;
  min-height: 80vh;
  background: #fff;
`;

export const FooterContainer = styled(Footer)`
  text-align: center;
`;
