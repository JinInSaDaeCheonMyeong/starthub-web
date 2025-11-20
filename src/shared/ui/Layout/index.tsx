import React from "react";
import Header from "@/widgets/Header";
import Footer from "@/widgets/Footer";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <PageLayout>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </PageLayout>
  );
};

export default Layout;

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110.16px;
`;
