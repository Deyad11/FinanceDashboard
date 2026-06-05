# 💰 Wealth Curator — Personal Finance Dashboard

> A production-quality AI-powered personal finance dashboard built for the **Bright Money Frontend Intern Assignment**.

🔗 **[Live Demo](https://finance-dashboard-iihovi0cc-rockstardeepanshu11-2032s-projects.vercel.app)** · **[GitHub](https://github.com/yourusername/finance-dashboard)**

---

## 🛠 Tech Stack

| Tool                    | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| Vite + React 18         | Build tooling & UI framework                         |
| Tailwind CSS v4         | Utility-first styling via `@tailwindcss/vite` plugin |
| Recharts                | Portfolio performance & budget history charts        |
| GA4 (`gtag`)            | Analytics event tracking                             |
| @tanstack/react-virtual | Transaction table virtualization                     |

---

## 📁 Project Structure

```
finance-dashboard/
├── public/
│   └── og-image.png
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx               # Desktop navigation sidebar
│   │   ├── Header.jsx                # Top bar — search, tabs, dark mode
│   │   ├── BottomTabBar.jsx          # Mobile-only bottom navigation
│   │   ├── Dashboard.jsx             # Main dashboard page assembler
│   │   ├── InsightsPage.jsx          # Portfolio Insights page
│   │   ├── BudgetPage.jsx            # Budget overview page
│   │   ├── SummaryCards.jsx          # Net Worth / Spending / Savings cards
│   │   ├── AIStrategyCard.jsx        # Blue AI strategy CTA card
│   │   ├── AlertsSection.jsx         # Active alerts with type-based colors
│   │   ├── SpendingComposition.jsx   # Progress bar spending breakdown
│   │   ├── TransactionsTable.jsx     # Virtualized recent activity table
│   │   └── AIInsights.jsx            # Dynamic AI insight bullets
│   ├── hooks/
│   │   ├── useFetch.js               # Async data fetching with cancel support
│   │   ├── useDebounce.js            # 300ms debounce for search input
│   │   ├── useLocalStorage.js        # Persist state to localStorage
│   │   ├── useAnalytics.js           # GA4 event tracking wrapper
│   │   └── generateInsights.js       # Dynamic AI insight generation logic
│   ├── data/
│   │   └── mockData.js               # All mock data — transactions, portfolio, budgets
│   ├── App.jsx                       # Root — routing state, dark mode, layout
│   ├── main.jsx                      # React DOM entry point
│   └── index.css                     # Tailwind v4 import
└── index.html                        # SEO meta tags, OG tags, GA4 script
```

---

## 🚀 Getting Started

```bash
npm install
npm run dev
```

### Deployment

```bash
npm run build
# Push to GitHub → import in vercel.com → Deploy
```

> GA4 Measurement ID is configured as a Vercel environment variable: `VITE_GA_MEASUREMENT_ID`

---

## 🏗 Architecture Decisions

### State-based routing (no React Router)

Navigation between Dashboard, Insights, and Budgets is handled via a single `currentPage` state in `App.jsx`. This avoids adding a routing dependency for a 3-page app and keeps the bundle lean.

### Tailwind CSS v4

Using the new `@tailwindcss/vite` plugin instead of the legacy `tailwind.config.js` approach. Configuration lives entirely in `vite.config.js`. Styles are imported with a single `@import "tailwindcss"` in `index.css`.

### Mobile-first responsive layout

- **Desktop:** persistent sidebar + full header
- **Mobile:** sidebar hidden, simplified header (logo + icons only), bottom tab bar for navigation
- All grids use `grid-cols-1 md:grid-cols-12` so every section stacks cleanly on small screens

### Lazy loading by page

Each page component (`Dashboard`, `InsightsPage`, `BudgetPage`) is loaded via `React.lazy` + `Suspense`. The initial bundle only includes the shell — pages load on demand.

---

## 🪝 Custom Hooks

| Hook                                 | Description                                                                                                                   |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| `useFetch(fetchFn, deps)`            | Wraps any sync data function with simulated async delay (800ms), loading/error state, and cancellation via a `cancelled` flag |
| `useDebounce(value, delay)`          | Returns a debounced value — used to delay GA4 search events by 300ms                                                          |
| `useLocalStorage(key, initialValue)` | Persists state to `localStorage` with JSON serialization — used for dark mode preference                                      |
| `useAnalytics()`                     | Wraps `window.gtag` with a safe `console.log` fallback; returns a `track(eventName, params)` function                         |

---

## 📊 GA4 Events Tracked

| Event                              | Trigger                                       |
| ---------------------------------- | --------------------------------------------- |
| `page_load`                        | App first loads                               |
| `execute_strategy`                 | Execute Strategy button click                 |
| `execute_strategy` (review)        | Review Audit button click                     |
| `tab_click`                        | Portfolio / Analysis / Market / Insights tabs |
| `nav_click`                        | Sidebar navigation items                      |
| `search_usage`                     | Debounced search input (300ms)                |
| `budget_export_report`             | Export Report button in Budget page           |
| `budget_adjust_clicked`            | Adjust Budget button                          |
| `budget_category_clicked`          | Individual budget category card               |
| `budget_optimization_plan_clicked` | Curator's Note CTA                            |

---

## ⚡ Performance Optimizations

- **`React.lazy` + `Suspense`** — All three page components are lazy loaded; initial bundle only ships the shell
- **`React.memo`** — `TransactionRow` is memoized to prevent re-renders on search filter updates
- **`useMemo`** — Filtered transactions recompute only when `transactions` or `searchQuery` changes
- **Table Virtualization** — `@tanstack/react-virtual` renders only visible rows, preventing DOM bloat on large datasets
- **Dark mode via class strategy** — A single `dark` class on the root div toggles all dark variants; no JS recalculation per render

---

## 🔍 SEO & Accessibility

### Meta & Open Graph

- Full meta tags: `title`, `description`, `keywords`, `author`, `robots`, `theme-color`
- Full OG tag set for rich link previews on LinkedIn, WhatsApp, Slack
- Twitter `summary_large_image` card

### Semantic HTML

`<aside>` · `<header>` · `<main>` · `<nav>` · `<section>` · `<table>` / `<thead>` / `<tbody>` / `<tr>` / `<th>` / `<td>`

### Accessibility

- `aria-label` on all icon-only buttons (bell, settings, dark mode toggle)
- Keyboard-navigable buttons throughout
- Color is never the only indicator — status dots are always paired with text labels

---

## 🤖 AI Insights (Simulated Logic)

`generateInsights(transactions, spendingCategories)` in `src/hooks/generateInsights.js` analyzes mock data to produce dynamic, context-aware insights:

- Detects highest spending category and flags overexposure
- Calculates income vs expense ratio
- Identifies pending transactions as risk signals
- Generates premium-toned financial copy matching the UI

Insights appear in `Dashboard.jsx` (Editor's Note in SpendingComposition) and `InsightsPage.jsx` (Active Signal card + Cash Flow Intelligence section).

---

## ⚖️ Trade-offs

| Decision                            | Trade-off                                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------- |
| State-based routing vs React Router | Simpler bundle, but no URL-based deep linking or browser back/forward navigation        |
| Mock data vs real API               | Fast to build and demo, but no real persistence or auth                                 |
| Tailwind CSS v4                     | Cutting-edge, but less community documentation than v3                                  |
| Virtualization on small dataset     | Adds complexity for only 4 mock rows — scales well if data grows                        |
| No design token system              | Colors hardcoded in components — a full token system would improve consistency at scale |
