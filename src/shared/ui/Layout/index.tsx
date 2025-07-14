import React from 'react';
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
      {children}
      <Footer />
    </PageLayout>
  );
};

export default Layout;

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

