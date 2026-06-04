import { useState } from 'react'
import {
  BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from 'recharts'

import useFetch from '../hooks/useFetch'
import useAnalytics from '../hooks/useAnalytics'
import { budgetOverview, budgetCategories, budgetHistory } from '../data/mockData'

// ── Loading Skeleton & Error State ────────────────────────────────────────────

const SkeletonBlock = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl transition-colors ${className}`} />
)

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-end">
      <div>
        <SkeletonBlock className="h-4 w-32 mb-2" />
        <SkeletonBlock className="h-8 w-72" />
      </div>
      <div className="flex gap-3">
        <SkeletonBlock className="h-10 w-32" />
        <SkeletonBlock className="h-10 w-32" />
      </div>
    </div>
    <SkeletonBlock className="h-48 w-full rounded-2xl" />
    <div className="grid grid-cols-5 gap-4">
      {[1, 2, 3, 4, 5].map(i => <SkeletonBlock key={i} className="h-40 rounded-2xl" />)}
    </div>
    <div className="grid grid-cols-12 gap-6 h-96">
      <SkeletonBlock className="col-span-8 h-full rounded-2xl" />
      <SkeletonBlock className="col-span-4 h-full rounded-2xl" />
    </div>
  </div>
)

const ErrorState = ({ message, onRetry }) => (
  <div className="flex flex-col items-center justify-center py-20 text-center transition-colors">
    <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center mb-4 transition-colors">
      <span className="text-red-400 text-xl">⚠</span>
    </div>
    <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 transition-colors">
      Failed to load budget data
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

// ── Icons Mapping ─────────────────────────────────────────────────────────────

const getCategoryIcon = (title) => {
  const icons = {
    'Housing': <path d="M11.47 3.84a.75.75 0 011.06 0l8.99 9a.75.75 0 11-1.06 1.06l-4.69-4.7V21a.75.75 0 01-.75.75H8.98a.75.75 0 01-.75-.75V9.2L3.54 13.9a.75.75 0 11-1.06-1.06l8.99-9z"/>,
    'Food & Dining': <path fillRule="evenodd" d="M5.25 2.25a.75.75 0 01.75.75v8.628c0 1.042.545 2.012 1.417 2.565.132.083.25.176.353.279v7.278a.75.75 0 01-1.5 0v-6.38a3.743 3.743 0 01-.84-2.152V3a.75.75 0 01.75-.75zm13.5 0a.75.75 0 01.75.75v18a.75.75 0 01-1.5 0V12h-2.25v9a.75.75 0 01-1.5 0V7.5a3 3 0 013-3h.75V3a.75.75 0 01.75-.75z" clipRule="evenodd"/>,
    'Transportation': <><path d="M3.375 12h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" /><path fillRule="evenodd" d="M3.75 13.5a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-1.5zm13.5 0a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 001.5-1.5v-3a1.5 1.5 0 00-1.5-1.5h-1.5z" clipRule="evenodd"/></>,
    'Utilities': <path fillRule="evenodd" d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h7.268a.75.75 0 01.548 1.262l-10.5 11.25a.75.75 0 01-1.272-.71l1.992-7.302H3.75a.75.75 0 01-.548-1.262l10.5-11.25a.75.75 0 01.913-.143z" clipRule="evenodd"/>,
    'Entertainment': <path fillRule="evenodd" d="M4.5 4.5a3 3 0 00-3 3v9a3 3 0 003 3h15a3 3 0 003-3v-9a3 3 0 00-3-3h-15zm3 4.5a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm6-6a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zm0 3a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75z" clipRule="evenodd"/>
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      {icons[title] || icons['Housing']}
    </svg>
  )
}

// ── Custom Tooltip for Chart ──────────────────────────────────────────────────

const ChartTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gray-900 dark:bg-gray-800 text-white rounded-lg px-3 py-2 text-xs shadow-xl border border-transparent dark:border-gray-700 transition-colors">
      <p className="text-gray-400 mb-1">{label}</p>
      <p className="font-semibold text-gray-300">Target: ${payload[0].value.toLocaleString()}</p>
      <p className="font-semibold text-blue-400">Actual: ${payload[1].value.toLocaleString()}</p>
    </div>
  )
}

// ── Data Fetcher ──────────────────────────────────────────────────────────────

const fetchBudgetData = () => ({
  overview: budgetOverview,
  categories: budgetCategories,
  history: budgetHistory
})

// ── Main Component ────────────────────────────────────────────────────────────

const BudgetPage = () => {
  const { track } = useAnalytics()
  const [retryKey, setRetryKey] = useState(0)
  const { data, loading, error } = useFetch(fetchBudgetData, [retryKey])

  const refetch = () => setRetryKey((k) => k + 1)

  if (loading) return <LoadingSkeleton />
  if (error)   return <ErrorState message={error} onRetry={refetch} />
  if (!data)   return null

  const percentSpent = ((data.overview.spent / data.overview.total) * 100).toFixed(0)

  return (
    <div className="space-y-6">
      
      {/* Header Area */}
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs font-bold text-orange-600 dark:text-orange-500 uppercase tracking-widest mb-1 transition-colors">
            Budget Overview
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 transition-colors">
            Wealth Curator Summary
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => track('budget_export_report')}
            className="px-5 py-2.5 text-sm font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Export Report
          </button>
          <button 
            onClick={() => track('budget_adjust_clicked')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-blue-600 dark:bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Adjust Budget
          </button>
        </div>
      </div>

      {/* Top Overview Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-8 flex items-center justify-between transition-colors">
        <div className="flex-1 pr-12 border-r border-gray-100 dark:border-gray-800 transition-colors">
          <div className="flex items-end gap-16 mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors">Spent So Far</p>
              <div className="flex items-baseline gap-1">
                <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100 transition-colors">
                  ${data.overview.spent.toLocaleString(undefined, {minimumFractionDigits: 0})}
                </h2>
                <span className="text-xl font-medium text-gray-400 dark:text-gray-500">.00</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 transition-colors">Total Monthly Budget</p>
              <h2 className="text-2xl font-semibold text-gray-600 dark:text-gray-300 transition-colors">
                ${data.overview.total.toLocaleString(undefined, {minimumFractionDigits: 2})}
              </h2>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-2 transition-colors">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${percentSpent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 transition-colors">
            <span>0% Utilization</span>
            <span className="text-blue-600 dark:text-blue-400">{percentSpent}% Spent</span>
            <span>100% Target</span>
          </div>
        </div>

        {/* Right side mini-stats */}
        <div className="flex gap-4 pl-12 shrink-0">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 w-40 transition-colors">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 transition-colors">Remaining</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1 transition-colors">${data.overview.remaining.toLocaleString()}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors">{data.overview.capacity}% capacity</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 w-40 transition-colors">
            <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1 transition-colors">Daily Burn</p>
            <p className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1 transition-colors">${data.overview.dailyBurn}</p>
            <p className="text-xs text-gray-400 dark:text-gray-500 transition-colors">Avg. since Oct 1</p>
          </div>
        </div>
      </div>

      {/* Spending Categories Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 transition-colors">Spending Categories</h3>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 transition-colors" />
            <span className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors" />
            <span className="w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors" />
          </div>
        </div>
        
        <div className="grid grid-cols-5 gap-4">
          {data.categories.map(cat => (
            <div key={cat.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-5 transition-colors cursor-pointer hover:border-blue-200 dark:hover:border-blue-500/30" onClick={() => track('budget_category_clicked', { category: cat.title })}>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center transition-colors">
                  {getCategoryIcon(cat.title)}
                </div>
                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-end gap-0.5 justify-center p-2.5 transition-colors">
                  <div className="w-1 bg-gray-300 dark:bg-gray-600 h-1/2 rounded-sm transition-colors" />
                  <div className="w-1 bg-blue-500 h-full rounded-sm transition-colors" />
                  <div className="w-1 bg-gray-300 dark:bg-gray-600 h-3/4 rounded-sm transition-colors" />
                </div>
              </div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-1 transition-colors">{cat.title}</h4>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 transition-colors">
                ${cat.left} left of ${cat.total.toLocaleString()}
              </p>
              <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden mb-1.5 transition-colors">
                <div 
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded-full transition-all" 
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
              <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 text-right uppercase tracking-wider transition-colors">
                {cat.percent}% Used
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid: Chart & Curator Note */}
      <div className="grid grid-cols-12 gap-6 h-96">
        
        {/* Budget History Chart */}
        <div className="col-span-8 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-6 flex flex-col transition-colors h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-gray-100 transition-colors">Budget History</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors">Target vs. Actual (Last 6 Months)</p>
            </div>
            <div className="flex items-center gap-4 text-xs font-semibold text-gray-500 dark:text-gray-400 transition-colors">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors" />
                Budget
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 dark:bg-blue-500 transition-colors" />
                Actual
              </div>
            </div>
          </div>
          
          <div className="flex-1 text-gray-400 dark:text-gray-500 transition-colors">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.history} margin={{ top: 0, right: 0, left: -25, bottom: 0 }} barGap={-24}>
                <CartesianGrid strokeDasharray="3 3" stroke="currentColor" vertical={false} opacity={0.5} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: 'currentColor' }} axisLine={false} tickLine={false} />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: 'transparent' }} />
                <Bar dataKey="budget" fill="currentColor" className="text-gray-100 dark:text-gray-800/50 transition-colors" barSize={32} radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" fill="currentColor" className="text-blue-600 dark:text-blue-500 transition-colors" barSize={24} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Curator's Note */}
        <div className="col-span-4 rounded-2xl p-8 flex flex-col justify-between text-white shadow-lg bg-gradient-to-br from-[#0A56C9] to-[#1264E6] dark:from-blue-900 dark:to-gray-800 transition-colors h-full relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 rounded-full bg-white opacity-5" />
          
          <div className="relative z-10">
            <p className="text-xs font-bold text-blue-200 dark:text-blue-300 uppercase tracking-widest mb-4 transition-colors">
              Curator's Note
            </p>
            <p className="text-xl font-medium leading-relaxed mb-6 text-gray-50 dark:text-gray-100 transition-colors">
              You're tracking <span className="italic text-white">12% better</span> than last month in 'Food & Dining'. Keep this pace to save an extra $400 by year-end.
            </p>
            <button 
              onClick={() => track('budget_optimization_plan_clicked')}
              className="text-sm font-semibold hover:text-blue-200 transition-colors"
            >
              View optimization plan →
            </button>
          </div>

          <div className="relative z-10 mt-auto bg-white/10 dark:bg-gray-900/40 border border-white/20 dark:border-gray-700/50 rounded-xl p-4 flex items-center gap-3 backdrop-blur-sm transition-colors">
            <div className="w-10 h-10 rounded-lg bg-white dark:bg-gray-800 flex items-center justify-center shrink-0 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-600 dark:text-blue-400 transition-colors">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Smart Allocation</p>
              <p className="text-xs text-blue-100 dark:text-gray-300 transition-colors">AI suggestion available</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default BudgetPage