import { useState, useEffect } from 'react'
import useDebounce from '../hooks/useDebounce'
import useAnalytics from '../hooks/useAnalytics'
import { ROUTES } from '../constants/routes'

const tabs = [
  { label: 'Portfolio', disabled: false },
  { label: 'Analysis',  disabled: true  },
  { label: 'Market',    disabled: true  },
]

const Header = ({ searchQuery, setSearchQuery, darkMode, setDarkMode, currentPage, setCurrentPage }) => {
  const { track } = useAnalytics()
  const [activeTab, setActiveTab] = useState('Portfolio')
  const debouncedSearch = useDebounce(searchQuery, 300)

  const handleSearch = (e) => setSearchQuery(e.target.value)

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    if (currentPage === ROUTES.INSIGHTS) setCurrentPage(ROUTES.DASHBOARD)
    track('tab_click', { tab })
  }

  useEffect(() => {
    if (debouncedSearch) {
      track('search_usage', { query: debouncedSearch })
    }
  }, [debouncedSearch, track])

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shrink-0 transition-colors">

      {/* ── Mobile header ── */}
      <div className="flex md:hidden items-center justify-between px-4 py-3">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center shrink-0">
            <svg viewBox="0 0 20 20" fill="white" className="w-3.5 h-3.5">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 10-2 0v1H8a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">Proton Finance</p>
            <p className="text-gray-400 uppercase tracking-widest font-medium" style={{ fontSize: '8px' }}>Wealth Curator</p>
          </div>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-2">
          <button
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => setDarkMode(!darkMode)}
            className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            {darkMode ? (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.061l1.061-1.061zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.061l1.061-1.061zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.061 1.06l1.061 1.061zM5.404 6.464a.75.75 0 001.06-1.06L5.403 4.343a.75.75 0 00-1.06 1.06l1.06 1.061z" />
              </svg>
            ) : (
              <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
              </svg>
            )}
          </button>

          <button aria-label="Notifications" className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clipRule="evenodd" />
            </svg>
          </button>

          <div
            role="img"
            aria-label="User avatar"
            className="w-7 h-7 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold"
          >
            JD
          </div>
        </div>
      </div>

      {/* ── Desktop header ── */}
      <div className="hidden md:flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
            </svg>
            <input
              aria-label="Search portfolio or markets"
              type="text"
              placeholder="Search portfolio or markets..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-64 pl-9 pr-4 py-1.5 text-sm bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:placeholder-gray-500 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:border-blue-400 focus:bg-white dark:focus:bg-gray-800 transition-colors"
            />
          </div>

          {/* Tabs */}
          <nav className="flex items-center gap-1">
            {tabs.map((tab) => {
              const isTabActive = activeTab === tab.label && currentPage !== ROUTES.INSIGHTS
              return (
                <button
                  key={tab.label}
                  onClick={() => !tab.disabled && handleTabClick(tab.label)}
                  disabled={tab.disabled}
                  className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
                    tab.disabled
                      ? 'text-gray-300 dark:text-gray-600 cursor-not-allowed'
                      : isTabActive
                        ? 'text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-500 rounded-none'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
            <button
              onClick={() => {
                setCurrentPage(ROUTES.INSIGHTS)
                track('tab_click', { tab: 'Insights' })
              }}
              className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
               currentPage === ROUTES.INSIGHTS ? 'text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-500 rounded-none'
                  : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
              }`}
            >
              Insights
            </button>
          </nav>
        </div>

        {/* Right icons */}
        <div className="flex items-center gap-3">
        <button
  aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
  onClick={() => {
    setDarkMode(!darkMode)
    track('dark_mode_toggle', { mode: darkMode ? 'light' : 'dark' })
  }}
  className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
>
  {darkMode ? (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.061l1.061-1.061zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.061l1.061-1.061zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.061 1.06l1.061 1.061zM5.404 6.464a.75.75 0 001.06-1.06L5.403 4.343a.75.75 0 00-1.06 1.06l1.06 1.061z" />
    </svg>
  ) : (
    <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z" clipRule="evenodd" />
    </svg>
  )}
</button>
          <button aria-label="Notifications" className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clipRule="evenodd" />
            </svg>
          </button>
          <button aria-label="Settings" className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors">
            <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </button>
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
            JD
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header