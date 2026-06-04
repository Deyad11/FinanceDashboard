import { useState } from 'react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'
import { portfolioData } from '../data/mockData'

// ── Portfolio chart tooltip ───────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-gray-900 text-white rounded-lg px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-400 mb-0.5">{label}</p>
      <p className="font-semibold">${payload[0].value.toLocaleString()}</p>
    </div>
  )
}

const formatYAxis = (v) =>
  v >= 1_000_000 ? `$${(v / 1_000_000).toFixed(1)}M` : `$${(v / 1_000).toFixed(0)}k`

// ── Sub-components ────────────────────────────────────────────────────────────

const ActiveSignalCard = () => (
  <div className="bg-white border border-gray-100 rounded-xl p-6">
    <div className="flex items-center gap-2 mb-4">
      <span className="w-2 h-2 rounded-full bg-orange-400" />
      <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">
        Active Signal: Rebalance Priority
      </span>
    </div>

    <div className="flex gap-6">
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3">
          Your technology exposure has increased by 14.2% since last quarter.
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-5">
          Our algorithms suggest shifting 4% of gains into emerging market debt
          and high-yield real estate to maintain your risk-adjusted profile.
        </p>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">
            Review Strategy
          </button>
          <button className="px-4 py-2 text-blue-600 text-sm font-medium hover:underline transition-colors">
            Dismiss
          </button>
        </div>
      </div>

      {/* Signal confidence box */}
      <div className="w-44 shrink-0 border border-gray-100 rounded-xl p-4 flex flex-col items-center justify-center bg-gray-50">
        <div className="mb-3">
          <svg viewBox="0 0 48 32" className="w-16 h-10 text-gray-300" fill="none">
            <path d="M4 28 Q12 8 24 16 Q36 24 44 4" stroke="#e5e7eb" strokeWidth="2" fill="none"/>
            <path d="M4 28 Q12 8 24 16 Q36 24 44 4" stroke="#378ADD" strokeWidth="2.5" fill="none" strokeDasharray="60" strokeDashoffset="10"/>
          </svg>
        </div>
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Signal Confidence</p>
        <div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mb-1.5">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: '92%' }} />
        </div>
        <p className="text-lg font-bold text-gray-800">92%</p>
      </div>
    </div>
  </div>
)

const MarketSentimentCard = () => {
  const items = [
    { label: 'Global Equities', status: 'Bullish',  color: 'text-green-500' },
    { label: 'Fixed Income',    status: 'Neutral',  color: 'text-amber-500' },
    { label: 'Volatility Index',status: 'Low',      color: 'text-green-500' },
  ]

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
        Market Sentiment
      </p>

      {/* Gauge illustration */}
      <div className="flex flex-col items-center mb-5">
        <div className="relative w-28 h-14 overflow-hidden">
          <div className="absolute inset-0 rounded-t-full border-8 border-gray-100" />
          <div
            className="absolute inset-0 rounded-t-full border-8 border-blue-500"
            style={{ clipPath: 'inset(0 30% 0 0)' }}
          />
        </div>
        <p className="text-lg font-bold text-gray-900 -mt-1">Optimistic</p>
        <p className="text-xs text-gray-400">Score: 74/100</p>
      </div>

      <div className="space-y-3 border-t border-gray-50 pt-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-sm text-gray-600">{item.label}</span>
            <span className={`text-sm font-semibold ${item.color}`}>{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const PortfolioPerformanceCard = () => {
  const [activeRange, setActiveRange] = useState('1M')
  const ranges = ['1M', '3M', '1Y', 'ALL']

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
        Portfolio Performance
      </p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-bold text-gray-900">$1,424,902.18</span>
          <span className="text-sm font-semibold text-green-500">+12.4%</span>
        </div>
        <div className="flex items-center gap-1">
          {ranges.map((r) => (
            <button
              key={r}
              onClick={() => setActiveRange(r)}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${
                activeRange === r
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-500 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={portfolioData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="insightsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#378ADD" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#378ADD" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis tickFormatter={formatYAxis} tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} width={52} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={2.5}
            fill="url(#insightsGrad)"
            dot={false}
            activeDot={{ r: 4, fill: '#2563eb', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

const SectorAllocationCard = () => {
  const sectors = [
    { label: 'Technology', percent: 42, color: '#378ADD' },
    { label: 'Financials',  percent: 18, color: '#EF9F27' },
    { label: 'Healthcare',  percent: 15, color: '#6b7280' },
    { label: 'Other',       percent: 25, color: '#d1d5db' },
  ]

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4">
      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
        Sector Allocation
      </p>

      <div className="space-y-3">
        {sectors.map((s) => (
          <div key={s.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-sm text-gray-700">{s.label}</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">{s.percent}%</span>
          </div>
        ))}
      </div>

      {/* Top performer + Risk level */}
      <div className="grid grid-cols-2 gap-3 mt-1">
        <div className="rounded-xl p-3 text-white" style={{ background: 'linear-gradient(135deg, #1a4fc4, #378ADD)' }}>
          <p className="text-xs text-blue-200 uppercase tracking-widest mb-1">Top Performer</p>
          <p className="text-lg font-bold">NVDA</p>
          <p className="text-xs text-green-300 font-semibold">+8.4%</p>
        </div>
        <div className="rounded-xl p-3 bg-gray-50 border border-gray-100">
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Risk Level</p>
          <p className="text-lg font-bold text-gray-800">Moderate</p>
          <p className="text-xs text-gray-400">Balanced</p>
        </div>
      </div>
    </div>
  )
}

const CashFlowSection = () => {
  const items = [
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-blue-500">
          <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.33.576z" />
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696V15.75a.75.75 0 01-1.5 0v-.324a3.781 3.781 0 01-1.652-.713C6.9 14.353 6.5 13.75 6.5 13a.75.75 0 011.5 0c0 .14.083.366.33.564.27.21.657.364 1.12.43v-2.47a3.784 3.784 0 01-1.96-.696C6.704 10.367 6.2 9.611 6.2 8.75c0-.86.504-1.616 1.29-2.13A3.784 3.784 0 019.25 5.926V5.75A.75.75 0 0110 5z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Surplus Opportunity',
      desc: "You spent 12% less on dining this month. Transfer $450 to your 'Growth' bucket to stay ahead of your 2024 goal.",
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-500">
          <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
        </svg>
      ),
      title: 'Recurring Audit',
      desc: "We detected two overlapping streaming subscriptions. Cancelling 'Media+' would save you $180 annually.",
    },
    {
      icon: (
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-500">
          <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
        </svg>
      ),
      title: 'Tax-Loss Harvesting',
      desc: '3 assets in your legacy portfolio are eligible for tax-loss harvesting. Potential benefit: $2,100.',
    },
  ]

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-6">
      <div className="flex items-start justify-between mb-5">
        <div>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">
            Cash Flow Intelligence
          </p>
          <p className="text-sm text-gray-500">
            Automated suggestions based on your November spending patterns.
          </p>
        </div>
        <button className="text-sm text-blue-500 font-medium hover:text-blue-600 transition-colors whitespace-nowrap">
          View Monthly Report →
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0">
              {item.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800 mb-1">{item.title}</p>
              <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── InsightsPage ──────────────────────────────────────────────────────────────

const InsightsPage = () => {
  return (
    <div className="space-y-4">
      {/* Page header */}
      <div className="mb-2">
        <p className="text-xs font-semibold text-blue-500 uppercase tracking-widest mb-1">
          Wealth Intelligence
        </p>
        <h1 className="text-3xl font-bold text-gray-900">Portfolio Insights</h1>
        <p className="text-sm text-gray-500 mt-1 max-w-lg">
          Your curated financial perspective, balancing algorithmic precision with
          long-term wealth preservation goals.
        </p>
      </div>

      {/* Row 1 — Active Signal + Market Sentiment */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <ActiveSignalCard />
        </div>
        <div className="col-span-5">
          <MarketSentimentCard />
        </div>
      </div>

      {/* Row 2 — Portfolio Chart + Sector Allocation */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-7">
          <PortfolioPerformanceCard />
        </div>
        <div className="col-span-5">
          <SectorAllocationCard />
        </div>
      </div>

      {/* Row 3 — Cash Flow Intelligence */}
      <CashFlowSection />
    </div>
  )
}

export default InsightsPage