'use client'

import { Suspense } from 'react'
import OAuthFail from '@/page-components/Callback/OAuthFail'

export const dynamic = 'force-dynamic'

export default function OAuthFailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OAuthFail />
    </Suspense>
  )
}