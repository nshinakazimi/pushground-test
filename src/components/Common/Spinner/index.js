import React from "react";
import styled from "styled-components";
import { Spin, Space } from "antd";

const Spinner = () => (
  <SpinnerWrapper>
    <Space size="large">
      <Spin size="large" tip="Loading...." />
    </Space>
  </SpinnerWrapper>
);

const SpinnerWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export default Spinner;
