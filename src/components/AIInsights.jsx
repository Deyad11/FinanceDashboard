const AIInsights = ({ insights = [] }) => {
  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 transition-colors">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center">
          <span className="text-white text-xs">✦</span>
        </div>
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">AI Insights</h3>
      </div>

     <div className="space-y-3">
  {insights.length === 0 ? (
    <p className="text-sm text-gray-400 dark:text-gray-500">
      No insights available.
    </p>
  ) : (
    insights.map((insight, i) => (
      <div key={insight.id} className="flex items-start gap-3">
        <span className="mt-0.5 text-xs font-bold text-blue-600 dark:text-blue-400 w-4 shrink-0 transition-colors">
          {String(i + 1).padStart(2, '0')}
        </span>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
          {insight.text}
        </p>
      </div>
    ))
  )}
</div>

      <button className="mt-4 w-full py-2 text-xs font-medium text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors">
        View Full Analysis →
      </button>
    </section>
  )
}

export default AIInsights