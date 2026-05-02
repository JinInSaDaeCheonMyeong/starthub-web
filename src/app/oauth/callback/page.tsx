'use client'

import { Suspense } from 'react'
import CallbackPage from '@/page-components/Callback'

export const dynamic = 'force-dynamic'

export default function OAuthCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackPage />
    </Suspense>
  )
}