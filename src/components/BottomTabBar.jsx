import { ROUTES } from '../constants/routes'

const tabs = [
  {
    id: ROUTES.DASHBOARD,
    label: 'Portfolio',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M2.5 3A1.5 1.5 0 001 4.5v4A1.5 1.5 0 002.5 10h4A1.5 1.5 0 008 8.5v-4A1.5 1.5 0 006.5 3h-4zm9 0A1.5 1.5 0 0010 4.5v4A1.5 1.5 0 0011.5 10h4A1.5 1.5 0 0017 8.5v-4A1.5 1.5 0 0015.5 3h-4zm-9 9A1.5 1.5 0 001 13.5v4A1.5 1.5 0 002.5 19h4A1.5 1.5 0 008 17.5v-4A1.5 1.5 0 006.5 12h-4zm9 0A1.5 1.5 0 0010 13.5v4A1.5 1.5 0 0011.5 19h4A1.5 1.5 0 0017 17.5v-4A1.5 1.5 0 0015.5 12h-4z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: ROUTES.INSIGHTS,
    label: 'Insights',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M12 2a.75.75 0 01.75.75v.56l.253-.146a.75.75 0 01.75 1.299l-.253.146.253.146a.75.75 0 01-.75 1.298l-.253-.146v.292a.75.75 0 01-1.5 0v-.292l-.253.146a.75.75 0 01-.75-1.298l.253-.146-.253-.146a.75.75 0 01.75-1.299l.253.146V2.75A.75.75 0 0112 2zM2.75 11a.75.75 0 01.75-.75h13a.75.75 0 010 1.5h-13A.75.75 0 012.75 11zM2 13.75a.75.75 0 01.75-.75h13a.75.75 0 010 1.5h-13a.75.75 0 01-.75-.75zM2.75 8a.75.75 0 01.75-.75h13a.75.75 0 010 1.5h-13A.75.75 0 012.75 8z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: ROUTES.BUDGETS,
    label: 'Budgets',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
      </svg>
    ),
  },
]

const BottomTabBar = ({ currentPage, setCurrentPage, darkMode, setDarkMode }) => {
  return (
    <nav aria-label="Mobile navigation" className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 flex items-center px-2 pb-safe">
      {tabs.map((tab) => {
        if (tab.id === 'settings') {
          return (
            <button
              aria-label="Settings"
              key={tab.id}
              onClick={() => alert('Settings coming soon!')}
              className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
            >
              <span className="text-gray-400 dark:text-gray-500">
                {darkMode ? (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.061l1.061-1.061zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.061l1.061-1.061zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.061 1.06l1.061 1.061zM5.404 6.464a.75.75 0 001.06-1.06L5.403 4.343a.75.75 0 00-1.06 1.06l1.06 1.061z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
                  </svg>
                )}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Settings
              </span>
            </button>
          )
        }

        const isActive = currentPage === tab.id
        return (
          <button
            aria-current={isActive ? 'page' : undefined}
            aria-label={tab.label}
            key={tab.id}
            onClick={() => setCurrentPage(tab.id)}
            className="flex-1 flex flex-col items-center justify-center py-3 gap-1"
          >
            <span className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 dark:text-gray-500'}>
              {tab.icon}
            </span>
            <span className={`text-xs font-medium ${
              isActive
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-400 dark:text-gray-500'
            }`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

export default BottomTabBar