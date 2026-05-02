'use client'

import { Suspense } from 'react'
import CompetitorAnalysis from '@/page-components/CompetitorAnalysis'

export const dynamic = 'force-dynamic'

export default function CompetitorAnalysisPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompetitorAnalysis />
    </Suspense>
  )
}