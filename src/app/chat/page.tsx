'use client'

import { Suspense } from 'react'
import ChatPage from '@/page-components/Chat'

export const dynamic = 'force-dynamic'

export default function ChatPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatPage />
    </Suspense>
  )
}