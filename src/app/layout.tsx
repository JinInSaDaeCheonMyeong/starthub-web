import type { Metadata } from 'next'
import { Providers } from './providers'
import Layout from '@/shared/ui/Layout'

export const metadata: Metadata = {
  title: 'StartHub',
  description: '스타트업 창업을 돕는 AI 서비스',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Pretendard:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <Providers>
          <Layout>
            {children}
          </Layout>
        </Providers>
      </body>
    </html>
  )
}