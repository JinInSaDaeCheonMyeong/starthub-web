import React from "react";
import Header from "@/widgets/Header";
import Footer from "@/widgets/Footer";
import ChatAIWidget from "@/widgets/chatAI";
import { useLocation } from "react-router-dom";
import { useGetMyProfile } from "@/features/auth/getProfile/model/useGetMyProfile";
import styled from "styled-components";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const { data } = useGetMyProfile();

  const path = location.pathname;
  const hidePatterns: RegExp[] = [
    /^\/sign-in$/, 
    /^\/sign-up$/, 
    /^\/onboarding(?:$|\/)/, 
    /^\/oauth(?:$|\/)/, 
    /^\/callback(?:$|\/)/, 
  ];
  const hideChat = hidePatterns.some((r) => r.test(path));

  return (
    <PageLayout>
      <Header />
      {children}
      <Footer />
      {data && !hideChat && <ChatAIWidget />}
    </PageLayout>
  );
};

export default Layout;

const PageLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 110.8px;
`;
