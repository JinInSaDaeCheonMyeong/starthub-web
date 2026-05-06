"use client";

import React from "react";
import Header from "@/widgets/Header";
import Footer from "@/widgets/Footer";
import ChatAIWidget from "@/widgets/chatAI";
import { usePathname } from "next/navigation";
import { useGetMyProfile } from "@/features/auth/getProfile/model/useGetMyProfile";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const pathname = usePathname();
  const { data } = useGetMyProfile();

  const path = pathname || "";
  const hidePatterns: RegExp[] = [
    /^\/sign-in$/,
    /^\/sign-up$/,
    /^\/onboarding(?:$|\/)/,
    /^\/oauth(?:$|\/)/,
    /^\/callback(?:$|\/)/,
    /^\/chat(?:$|\/)/,
  ];
  const hideLayoutElements = hidePatterns.some((r) => r.test(path));

  if (hideLayoutElements) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <Header />
      <div className="w-full flex-1">{children}</div>
      <Footer />
      {data && <ChatAIWidget />}
    </div>
  );
};

export default Layout;
