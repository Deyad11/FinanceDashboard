const SpendingComposition = ({ categories = [], insight }) => {
  return (
    <section className="bg-white border border-gray-100 rounded-xl p-5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">Spending Composition</h3>
        <button className="text-xs text-blue-500 font-medium hover:text-blue-600 transition-colors">
          View All
        </button>
      </div>

      {/* Bars */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm text-gray-700">{cat.label}</span>
              <span className="text-sm font-semibold text-gray-800">{cat.percent}%</span>
            </div>
            <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${cat.percent}%`,
                  backgroundColor: cat.color,
                  transition: 'width 0.8s ease',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Editor's Note — AI insight box */}
      {insight && (
        <div className="mt-5 rounded-lg bg-gray-50 border border-gray-100 p-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1.5">
            Editor's Note
          </p>
          <p className="text-xs text-gray-600 leading-relaxed">
            "{insight.text}"
          </p>
        </div>
      )}
    </section>
  )
}

export default SpendingComposition