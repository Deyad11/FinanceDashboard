import { useState, lazy, Suspense } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

const Dashboard    = lazy(() => import('./components/Dashboard'))
const InsightsPage = lazy(() => import('./components/InsightsPage'))
const BudgetsPage  = lazy(() => import('./components/BudgetPage'))

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
  const [currentPage, setCurrentPage] = useState('dashboard')

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-950 overflow-hidden">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} darkMode={darkMode} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-950">
            <Suspense fallback={<PageFallback />}>
              {currentPage === 'dashboard' && <Dashboard searchQuery={searchQuery} />}
              {currentPage === 'insights'  && <InsightsPage />}
              {currentPage === 'budgets'   && <BudgetsPage />}
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}

export default App