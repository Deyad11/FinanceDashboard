import { useState } from 'react'

import useFetch from '../hooks/useFetch'
import useAnalytics from '../hooks/useAnalytics'
import {
  summaryData, alerts, spendingCategories,
  transactions, aiInsights, portfolioData
} from '../data/mockData'

import SummaryCards from './SummaryCards'
import AIStrategyCard from './AIStrategyCard'
import AlertsSection from './AlertsSection'
import SpendingComposition from './SpendingComposition'
import TransactionsTable from './TransactionsTable'
import { generateDynamicInsights } from '../hooks/generateInsights'
// ── Loading skeleton ──────────────────────────────────────────────────────────

const SkeletonBlock = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl transition-colors ${className}`} />
)

const LoadingSkeleton = () => (
  <div className="space-y-4">
    <div className="grid grid-cols-3 gap-4">
      <SkeletonBlock className="h-24" />
      <SkeletonBlock className="h-24" />
      <SkeletonBlock className="h-24" />
    </div>
    <div className="grid grid-cols-12 gap-4">
      <SkeletonBlock className="col-span-7 h-56" />
      <SkeletonBlock className="col-span-5 h-56" />
    </div>
    <div className="grid grid-cols-12 gap-4">
      <SkeletonBlock className="col-span-5 h-72" />
      <SkeletonBlock className="col-span-7 h-72" />
    </div>
  </div>
)

// ── Error state ───────────────────────────────────────────────────────────────

const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center transition-colors">
    <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4 transition-colors">
      <span className="text-red-400 text-xl">⚠</span>
    </div>
    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 transition-colors">
      Failed to load dashboard
    </h3>
    <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 max-w-xs transition-colors">
      {message}
    </p>
    <button
      onClick={onRetry}
      className="px-4 py-2 text-sm font-medium text-white bg-blue-500 dark:bg-blue-600 rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
    >
      Retry
    </button>
  </div>
)

// ── fetchFn ───────────────────────────────────────────────────────────────────

const fetchDashboardData = () => ({
  summaryData,
  alerts,
  spendingCategories,
  transactions,
  aiInsights,
  portfolioData,
})

// ── Dashboard ─────────────────────────────────────────────────────────────────

const Dashboard = ({ searchQuery }) => {
  const { track } = useAnalytics()
  const [retryKey, setRetryKey] = useState(0)
  const { data, loading, error } = useFetch(fetchDashboardData, [retryKey])
  const refetch = () => setRetryKey((k) => k + 1)
  if (loading) return <LoadingSkeleton />
  if (error)   return <ErrorState message={error} onRetry={refetch} />
  if (!data)   return null
const liveInsights = generateDynamicInsights(data.transactions, data.spendingCategories)
  return (
    <div className="space-y-4">

      {/* Row 0 — Summary cards */}
      <SummaryCards data={data.summaryData} />

      {/* Row 1 — AI Strategy (left) + Active Alerts (right) */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <AIStrategyCard />
        </div>
        <div className="col-span-5">
          <AlertsSection alerts={data.alerts} />
        </div>
      </div>

      {/* Row 2 — Spending Composition (left) + Recent Activity (right) */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-5">
          <SpendingComposition
            categories={data.spendingCategories}
           insight={liveInsights[0]}
          />
        </div>
        <div className="col-span-7">
          <TransactionsTable
            transactions={data.transactions}
            searchQuery={searchQuery}
          />
        </div>
      </div>

    </div>
  )
}

export default Dashboard