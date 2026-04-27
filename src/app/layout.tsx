import type { Metadata } from 'next'
import { Providers } from './providers'
import { GlobalStyle } from '@/shared/style/webfont.style'

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
        <GlobalStyle />
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}