'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import StyledComponentsRegistry from '@/lib/registry'
import GlobalToastContainer from '@/shared/ui/Toast'
import { GlobalStyle } from '@/shared/style/webfont.style'

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <StyledComponentsRegistry>
        <GlobalStyle />
        {children}
        <GlobalToastContainer />
      </StyledComponentsRegistry>
    </QueryClientProvider>
  )
}