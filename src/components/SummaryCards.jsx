const SummaryCards = ({ data }) => {
  if (!data) return null

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Total Net Worth</p>
        <p className="text-2xl font-semibold text-gray-900">
          ${data.netWorth.value.toLocaleString()}
        </p>
        <p className="text-xs text-green-500 mt-1">
          ↑ +{data.netWorth.change}% {data.netWorth.label}
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Monthly Spending</p>
        <p className="text-2xl font-semibold text-gray-900">
          ${data.spending.value.toLocaleString()}
        </p>
        <p className="text-xs text-orange-400 mt-1">
          ↑ +{data.spending.change}% {data.spending.label}
        </p>
      </div>

      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <p className="text-xs text-gray-400 uppercase tracking-wide mb-2">Total Savings</p>
        <p className="text-2xl font-semibold text-gray-900">
          ${data.savings.value.toLocaleString()}
        </p>
        <p className="text-xs text-green-500 mt-1">
          ✓ {data.savings.status}
        </p>
      </div>
    </div>
  )
}

export default SummaryCards