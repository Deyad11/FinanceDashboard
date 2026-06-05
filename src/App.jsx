import { useState, lazy, Suspense } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import BottomTabBar from './components/BottomTabBar'
import { ROUTES } from './constants/routes'
const Dashboard    = lazy(() => import('./pages/Dashboard'))
const InsightsPage = lazy(() => import('./pages/InsightsPage'))
const BudgetsPage  = lazy(() => import('./pages/BudgetPage'))

const PageFallback = () => (
  <div className="flex-1 flex items-center justify-center h-full">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-xs text-gray-400 dark:text-gray-500">Loading…</p>
    </div>
  </div>
)

function App() {
  const [darkMode, setDarkMode]       = useLocalStorage('darkMode', false)
  const [searchQuery, setSearchQuery] = useState('')
const [currentPage, setCurrentPage] = useState(ROUTES.DASHBOARD)

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">

        {/* Sidebar — desktop only */}
        <div className="hidden md:flex">
          <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} darkMode={darkMode} />
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />

          {/* Main content — extra bottom padding on mobile for tab bar */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 dark:bg-gray-950 pb-20 md:pb-6">
            <Suspense fallback={<PageFallback />}>
           {currentPage === ROUTES.DASHBOARD && <Dashboard searchQuery={searchQuery} />}
{currentPage === ROUTES.INSIGHTS  && <InsightsPage />}
{currentPage === ROUTES.BUDGETS   && <BudgetsPage />}
            </Suspense>
          </main>
        </div>
      </div>

      {/* Bottom tab bar — mobile only */}
      <div className="md:hidden">
        <BottomTabBar
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      </div>
    </div>
  )
}

export default App