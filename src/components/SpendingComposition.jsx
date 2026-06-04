const SpendingComposition = ({ categories = [], insight }) => {
  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 flex flex-col transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 transition-colors">
          Spending Composition
        </h3>
        <button className="text-xs text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 transition-colors">
          View All
        </button>
      </div>

      {/* Bars */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors">
                {cat.label}
              </span>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 transition-colors">
                {cat.percent}%
              </span>
            </div>
            <div className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden transition-colors">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${cat.percent}%`,
                  backgroundColor: cat.color, // Note: Ensure these prop colors look good on dark gray!
                  transition: 'width 0.8s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Editor's Note — AI insight box */}
      {insight && (
        <div className="mt-5 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-4 transition-colors">
          <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1.5 transition-colors">
            Editor's Note
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
            "{insight.text}"
          </p>
        </div>
      )}
    </section>
  )
}

export default SpendingComposition