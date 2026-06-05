const SkeletonBlock = ({ className = '' }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-800 rounded-xl transition-colors ${className}`} />
)

export default SkeletonBlock