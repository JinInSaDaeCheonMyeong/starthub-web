import type { Metadata } from "next";
import { Providers } from "./providers";
import Layout from "@/shared/ui/Layout";
import "./globals.css";

export const metadata: Metadata = {
  title: "StartHub",
  description: "스타트업 창업을 돕는 AI 서비스",
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
}
