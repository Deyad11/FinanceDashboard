import { memo, useMemo } from 'react'

// Category config: badge colors + merchant icons
const categoryConfig = {
  Technology: {
    badge: 'bg-blue-50 text-blue-600',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-400">
        <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
      </svg>
    ),
    iconBg: 'bg-blue-50',
  },
  Lifestyle: {
    badge: 'bg-orange-50 text-orange-600',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-orange-400">
        <path d="M9.653 16.915l-.005-.003-.019-.01a20.759 20.759 0 01-1.162-.682 22.045 22.045 0 01-2.582-2.046c-1.076-1.077-2.177-2.61-2.177-4.174 0-1.99 1.274-3.5 3-3.5 1.032 0 1.99.536 2.594 1.44.604-.904 1.562-1.44 2.594-1.44 1.726 0 3 1.51 3 3.5 0 1.564-1.101 3.097-2.177 4.174a22.045 22.045 0 01-2.582 2.046 20.759 20.759 0 01-1.162.682l-.019.01-.005.003h-.002a.739.739 0 01-.69.001l-.002-.001z" />
      </svg>
    ),
    iconBg: 'bg-orange-50',
  },
  Utilities: {
    badge: 'bg-yellow-50 text-yellow-700',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-yellow-500">
        <path d="M11.983 1.907a.75.75 0 00-1.292-.657l-8.5 9.5A.75.75 0 002.75 12h6.572l-1.305 6.093a.75.75 0 001.292.657l8.5-9.5A.75.75 0 0017.25 8h-6.572l1.305-6.093z" />
      </svg>
    ),
    iconBg: 'bg-yellow-50',
  },
  Income: {
    badge: 'bg-green-50 text-green-700',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-green-500">
        <path fillRule="evenodd" d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
      </svg>
    ),
    iconBg: 'bg-green-50',
  },
}

// Fake dates for display
const fakeDates = {
  1: 'Oct 24, 2023 • 14:20',
  2: 'Oct 23, 2023 • 20:15',
  3: 'Oct 22, 2023 • 09:00',
  4: 'Oct 21, 2023 • 12:00',
}

const TransactionRow = memo(({ tx }) => {
  const isIncome = tx.amount > 0
  const cfg = categoryConfig[tx.category] ?? {
    badge: 'bg-gray-100 text-gray-600',
    icon: <span className="text-xs text-gray-400">#</span>,
    iconBg: 'bg-gray-50',
  }

  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(Math.abs(tx.amount))

  return (
    <tr className="hover:bg-gray-50/60 transition-colors">
      {/* Merchant */}
      <td className="px-5 py-3.5">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg ${cfg.iconBg} flex items-center justify-center shrink-0`}>
            {cfg.icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{tx.merchant}</p>
            <p className="text-xs text-gray-400 mt-0.5">{fakeDates[tx.id] ?? ''}</p>
          </div>
        </div>
      </td>

      {/* Category */}
      <td className="px-4 py-3.5">
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${cfg.badge}`}>
          {tx.category.toUpperCase()}
        </span>
      </td>

      {/* Status */}
      <td className="px-4 py-3.5">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              tx.status === 'Cleared' ? 'bg-green-400' : 'bg-amber-400'
            }`}
          />
          <span className={`text-xs font-medium ${
            tx.status === 'Cleared' ? 'text-green-600' : 'text-amber-600'
          }`}>
            {tx.status}
          </span>
        </div>
      </td>

      {/* Amount */}
      <td className="px-5 py-3.5 text-right">
        <span className={`text-sm font-bold ${isIncome ? 'text-green-500' : 'text-gray-800'}`}>
          {isIncome ? '+' : '-'}{formattedAmount}
        </span>
      </td>
    </tr>
  )
})

TransactionRow.displayName = 'TransactionRow'

const TransactionsTable = ({ transactions = [], searchQuery = '' }) => {
  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return transactions
    const q = searchQuery.toLowerCase()
    return transactions.filter(
      (tx) =>
        tx.merchant.toLowerCase().includes(q) ||
        tx.category.toLowerCase().includes(q) ||
        tx.status.toLowerCase().includes(q)
    )
  }, [transactions, searchQuery])

  return (
    <section className="bg-white border border-gray-100 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-50 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Recent Activity</h3>
        <div className="flex items-center gap-2">
          <button className="text-xs font-medium text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            Export CSV
          </button>
          <button className="text-xs font-medium text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-5 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Merchant</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Category</th>
              <th className="px-4 py-2.5 text-left text-xs font-medium text-gray-400 uppercase tracking-wide">Status</th>
              <th className="px-5 py-2.5 text-right text-xs font-medium text-gray-400 uppercase tracking-wide">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length > 0 ? (
              filtered.map((tx) => <TransactionRow key={tx.id} tx={tx} />)
            ) : (
              <tr>
                <td colSpan={4} className="px-5 py-10 text-center text-sm text-gray-400">
                  No transactions match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default TransactionsTable