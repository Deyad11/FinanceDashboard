const SummaryCards = ({ data }) => {
  if (!data) return null

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      {/* Net Worth Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 transition-colors">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 transition-colors">
          Total Net Worth
        </p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 transition-colors">
          ${data.netWorth.value.toLocaleString()}
        </p>
        <p className="text-xs text-green-500 dark:text-green-400 mt-1 transition-colors">
          ↑ +{data.netWorth.change}% {data.netWorth.label}
        </p>
      </div>

      {/* Spending Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 transition-colors">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 transition-colors">
          Monthly Spending
        </p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 transition-colors">
          ${data.spending.value.toLocaleString()}
        </p>
        <p className="text-xs text-orange-500 dark:text-orange-400 mt-1 transition-colors">
          ↑ +{data.spending.change}% {data.spending.label}
        </p>
      </div>

      {/* Savings Card */}
      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 transition-colors">
        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 transition-colors">
          Total Savings
        </p>
        <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100 transition-colors">
          ${data.savings.value.toLocaleString()}
        </p>
        <p className="text-xs text-green-500 dark:text-green-400 mt-1 transition-colors">
          ✓ {data.savings.status}
        </p>
      </div>
    </div>
  )
}

export default SummaryCards