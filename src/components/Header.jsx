import { useState } from 'react'
import useDebounce from '../hooks/useDebounce'
import useAnalytics from '../hooks/useAnalytics'

const tabs = ['Portfolio', 'Analysis', 'Market']

const Header = ({ searchQuery, setSearchQuery, darkMode, setDarkMode, currentPage, setCurrentPage }) => {
  const { track } = useAnalytics()
  const [activeTab, setActiveTab] = useState('Portfolio')
  const debouncedSearch = useDebounce(searchQuery, 300)

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    if (debouncedSearch) {
      track('search_usage', { query: debouncedSearch })
    }
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    // FIX: If we are on the Insights page, going back to a tab should reset the main page view
    if (currentPage === 'insights') {
      setCurrentPage('dashboard') // Note: Change 'dashboard' to whatever your main page state is called in App.jsx
    }
    track('tab_click', { tab })
  }

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 px-6 py-3 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
          </svg>
          <input
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
            // FIX: Only highlight these tabs if we are NOT viewing the Insights page
            const isTabActive = activeTab === tab && currentPage !== 'insights'

            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
                  isTabActive
                    ? 'text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-500 rounded-none'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                }`}
              >
                {tab}
              </button>
            )
          })}
          <button
            onClick={() => {
              setCurrentPage('insights')
              track('tab_click', { tab: 'Insights' })
            }}
            className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
              currentPage === 'insights'
                ? 'text-blue-600 dark:text-blue-400 font-medium border-b-2 border-blue-500 rounded-none'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
            }`}
          >
            Insights
          </button>
        </nav>
      </div>

      <div className="flex items-center gap-3">
        {/* Dark mode toggle */}
        <button
          onClick={() => {
            setDarkMode(!darkMode)
            track('dark_mode_toggle', { mode: darkMode ? 'light' : 'dark' })
          }}
          className="p-1.5 text-sm text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? '☀️' : '🌙'}
        </button>

        {/* Bell */}
        <button className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors" aria-label="Notifications">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 00.515 1.076 32.91 32.91 0 003.256.508 3.5 3.5 0 006.972 0 32.903 32.903 0 003.256-.508.75.75 0 00.515-1.076A11.448 11.448 0 0116 8a6 6 0 00-6-6zM8.05 14.943a33.54 33.54 0 003.9 0 2 2 0 01-3.9 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Settings */}
        <button className="p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 transition-colors" aria-label="Settings">
          <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-semibold">
          JD
        </div>
      </div>
    </header>
  )
}

export default Header