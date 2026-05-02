'use client'

import { Suspense } from 'react'
import CompetitorCreate from '@/page-components/Competitor/Create'

export const dynamic = 'force-dynamic'

export default function CompetitorCreatePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompetitorCreate />
    </Suspense>
  )
}