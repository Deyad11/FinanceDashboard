const typeConfig = {
  error: {
    bar: '#E24B4A',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-red-500 dark:text-red-400 transition-colors">
        <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
    iconBg: 'bg-red-50 dark:bg-red-500/10',
  },
  warning: {
    bar: '#EF9F27',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-amber-500 dark:text-amber-400 transition-colors">
        <path fillRule="evenodd" d="M10 2a8 8 0 100 16A8 8 0 0010 2zm0 3a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
      </svg>
    ),
    iconBg: 'bg-amber-50 dark:bg-amber-500/10',
  },
  info: {
    bar: '#378ADD',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-blue-500 dark:text-blue-400 transition-colors">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
      </svg>
    ),
    iconBg: 'bg-blue-50 dark:bg-blue-500/10',
  },
}

const AlertItem = ({ alert }) => {
  const cfg = typeConfig[alert.type] ?? typeConfig.info
  return (
    <div className="flex items-start gap-3 py-3 border-b border-gray-50 dark:border-gray-800 last:border-0 transition-colors">
      {/* Left color bar */}
      <div
        className="w-1 self-stretch rounded-full shrink-0"
        style={{ backgroundColor: cfg.bar }}
      />
      {/* Icon */}
      <div className={`w-7 h-7 rounded-lg ${cfg.iconBg} flex items-center justify-center shrink-0 mt-0.5 transition-colors`}>
        {cfg.icon}
      </div>
      {/* Text */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-800 dark:text-gray-200 transition-colors">{alert.title}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed transition-colors">{alert.desc}</p>
      </div>
    </div>
  )
}

const AlertsSection = ({ alerts = [] }) => {
  return (
    <section className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5 h-full transition-colors">
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 uppercase tracking-wide transition-colors">
          Active Alerts
        </h3>
      </div>
      <div>
        {alerts.map((alert) => (
          <AlertItem key={alert.id} alert={alert} />
        ))}
      </div>
    </section>
  )
}

export default AlertsSection