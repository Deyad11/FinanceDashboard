import useAnalytics from '../hooks/useAnalytics'

const AIStrategyCard = () => {
  const { track } = useAnalytics()

  const handleExecute = () => {
    track('execute_strategy', { action: 'execute', timestamp: Date.now() })
  }

  const handleReview = () => {
    track('execute_strategy', { action: 'review_audit', timestamp: Date.now() })
  }

  return (
    <div
      className="rounded-xl p-6 relative overflow-hidden h-full border border-transparent dark:border-gray-800 bg-gradient-to-br from-[#1a4fc4] via-[#2d6be4] to-[#378ADD] dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors"
    >
      {/* Decorative blobs */}
      <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10 dark:opacity-5 bg-white" />
      <div className="absolute -bottom-10 right-12 w-28 h-28 rounded-full opacity-10 dark:opacity-5 bg-white" />
      <div className="absolute top-1/2 -right-4 w-20 h-20 rounded-full opacity-5 bg-white" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Badge */}
        <div className="mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest bg-white/20 dark:bg-blue-500/10 text-white/90 dark:text-blue-400 px-3 py-1 rounded-full transition-colors">
            Pro Strategy Insight
          </span>
        </div>

        {/* Headline */}
        <h2 className="text-2xl font-bold text-white dark:text-gray-100 leading-snug mb-3 transition-colors">
          Optimizing your portfolio for the upcoming Q3 market shift.
        </h2>

        {/* Body */}
        <p className="text-blue-100 dark:text-gray-400 text-sm leading-relaxed mb-6 transition-colors">
          Our AI analyzed your current allocation and identified 3 key rebalancing
          opportunities to increase yield by 2.4%.
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3 mt-auto">
          <button
            onClick={handleExecute}
            className="px-5 py-2.5 text-sm font-semibold bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 rounded-lg border border-transparent dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors shadow-md dark:shadow-none"
          >
            Execute Strategy
          </button>
          <button
            onClick={handleReview}
            className="px-5 py-2.5 text-sm font-medium text-white dark:text-gray-300 border border-white/40 dark:border-gray-600 rounded-lg hover:bg-white/10 dark:hover:bg-gray-800 transition-colors"
          >
            Review Audit
          </button>
        </div>
      </div>
    </div>
  )
}

export default AIStrategyCard