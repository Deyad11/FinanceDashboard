# Wealth Curator — AI-Powered Personal Finance Dashboard

https://finance-dashboard-one-gold.vercel.app

---

Most finance dashboards feel like someone handed a spreadsheet a dark mode
toggle and called it a product. This one tries to actually feel like it's
thinking with you.

I was given a design spec and a feature list. The visual direction, the
sections to build, the feature scope — that came from the assignment. What
I had to figure out was everything underneath. How to structure it. How to
make it scale. How to make the mobile experience work when the spec gave me
a native app design and I was building for web.

That last part took real thinking.

---

## The problem with the mobile spec

The design had a desktop sidebar and a separate mobile app layout. Two
different interaction paradigms. On web you can't just stack them and call
it responsive.

What I landed on: the sidebar exists only on desktop. On mobile it disappears
entirely and a fixed bottom tab bar takes over — thumb-reachable, app-native
feeling, no hamburger menus. The header adapts independently. Logo and quick
actions on mobile. Search, tabs, and controls on desktop. Same data, same
components, completely different navigation shells.

The desktop header tabs — Portfolio, Analysis, Market — were not specified
for behavior. I made a call: they're scaffolded as future sub-views, visually
present but marked disabled so the UI is honest about what's built and what
isn't. Better than fake interactivity.

---

## Architecture

```
src/
├── components/        # reusable UI primitives
│   └── ui/            # atomic pieces — SkeletonBlock
├── pages/             # route-level containers
│   ├── Dashboard.jsx
│   ├── InsightsPage.jsx
│   └── BudgetPage.jsx
├── hooks/             # useFetch, useDebounce, useLocalStorage, useAnalytics
├── utils/             # generateInsights — pure logic, no React
├── data/              # mock data layer
└── constants/         # routes.js — no magic strings anywhere
```

Pages and components are separated intentionally. A page assembles. A
component renders. Mixing them means the day you add a sixth page you're
digging through Sidebar logic to find your Dashboard. I've seen that
codebase. Didn't want to build it.

Route names live in `constants/routes.js`. No raw strings like
`setCurrentPage('dashboard')` anywhere in the app. One typo in a string
literal gives you a blank screen with no error. Constants give you that
error immediately.

---

## Custom Hooks

Four hooks. Each one has a specific reason to exist.

**`useFetch(fetchFn, deps)`**

Async data fetching with a cancellation flag. If the component unmounts
before the fetch resolves, we don't call setState on a dead component.
Uses a ref-stabilized fetchFn so the function identity never causes a
spurious re-fire. Retry logic via a retryKey pattern that bumps state
without touching the hook's internal API. Dev-only simulated delay so
the skeleton states are actually visible during development.

**`useLocalStorage(key, initialValue)`**

Persists React state to localStorage. The order matters — setItem runs
before setState. If localStorage throws (quota exceeded, Safari private
mode), the React state doesn't update. UI and storage stay in sync.
Also supports the functional updater pattern so you can do
`setValue(prev => !prev)` safely.

**`useDebounce(value, delay)`**

300ms debounce on the transaction search input. The key thing here is
how it's wired. The input updates searchQuery instantly on every
keystroke so the UI stays responsive. A separate useEffect watches
the debounced value and fires the analytics event only after the user
stops typing. That's the correct pattern. Firing analytics inside
onChange defeats the entire purpose of debouncing.

**`useAnalytics()`**

Thin wrapper around GA4's window.gtag. The track function is
useCallback-stabilized so it has a consistent reference across renders.
Safe to use in useEffect dependency arrays without infinite loop risk.
console.log gated to development only. Production consoles stay clean.

---

## Performance

**Lazy loading and code splitting**

All three pages are loaded via React.lazy with Suspense. The initial
bundle only contains App shell code. Page code loads on first navigation.
Users who never visit Budgets never download that code.

**Memoization**

generateDynamicInsights runs over transaction data to produce insight
strings. It's wrapped in useMemo keyed to transactions and
spendingCategories. Doesn't recompute on unrelated re-renders.
useCallback on analytics track and localStorage setValue so their
references don't silently break effects that depend on them.

**Virtualized transactions table**

Built with @tanstack/react-virtual. Only visible rows render in the DOM.
Padding rows above and below maintain accurate scrollbar height.
TransactionRow is wrapped in React.memo with a displayName set.
Intl.NumberFormat instantiated once at module level, not per row render.

**Skeleton loading states**

Layout-accurate skeletons that match the real grid dimensions. No
cumulative layout shift when content loads. SkeletonBlock extracted
into components/ui and shared across Dashboard and BudgetPage rather
than duplicated.

---

## AI Insights

`generateDynamicInsights` in utils/ is a deterministic rule engine. It
reads actual transaction and spending data and produces contextual
insight strings. Tech allocation above 30% triggers a rebalancing
insight. Dining spend above a threshold surfaces a savings opportunity.
Subscription overlap is always flagged.

It's not a real LLM. It's designed to look like one from the outside.
The output contract is identical to what a real API would return — an
array of objects with id, title, and text. Swapping in a real OpenAI
call means changing one function in utils. Nothing else moves.

---

## Google Analytics 4

GA4 initialized in index.html before the React bundle loads. Measurement
ID injected via `VITE_GA_MEASUREMENT_ID` environment variable, kept out
of source control and configured separately per environment on Vercel.

Tracks:

- `page_view` — fires on mount of Dashboard, InsightsPage, BudgetPage
- `nav_click` — fires on every sidebar navigation with item label
- `search_usage` — fires via debounced useEffect, not on every keystroke
- `tab_click` — header and mobile tab interactions
- `dark_mode_toggle` — with current mode as parameter
- `strategy_executed` / `strategy_review_clicked` — CTA interactions
- `budget_category_clicked` — with category name
- `budget_export_report` / `budget_adjust_clicked` — budget actions

---

## SEO

Semantic HTML throughout. `<main>`, `<header>`, `<aside>`, `<section>`,
`<nav>` used structurally not decoratively. Full Open Graph and Twitter
Card meta tags in index.html. Absolute URLs on OG images so social
platform crawlers resolve them correctly. Meta description, keywords,
robots, and author all set.

---

## Accessibility

Every icon-only button has an aria-label. Active navigation items carry
aria-current="page". Nav elements have aria-label landmarks — "Main
navigation", "Mobile navigation". Search input has an aria-label. Dark
mode toggle label updates dynamically based on current state.

---

## Dark Mode

Theme preference persisted via useLocalStorage. Applied as a dark class
on the root div, enabling Tailwind's dark: variant throughout the tree
without a Context provider. Consistent SVG icons for the toggle across
mobile and desktop — no emoji, which renders differently across operating
systems.

---

## Known Gaps and Honest Trade-offs

**Design tokens**

Colors and spacing are Tailwind utility classes applied directly. In a
production system these would be a tokens.js file with semantic scales —
`color.surface.primary`, `spacing.card.padding`. The gap is real. The
fix is mechanical, not conceptual.

**SummaryCards**

The three cards share identical structure. A StatCard primitive would
eliminate the repetition. Straightforward refactor, just not done yet.

**InsightsPage sector data**

SectorAllocationCard has hardcoded sector percentages. They don't come
from mockData or props. Works fine for a mock environment. In production
this would be a prop drilled from the data layer like everything else.

**Routing**

Navigation state is useState at the App root. Works for three pages.
For anything beyond that, React Router v6 with URL-based routing is
the right call — search state becomes a URL param, navigation becomes
bookmarkable, browser back button works.

---

## Tech Stack

|                |                         |
| -------------- | ----------------------- |
| Framework      | React 18                |
| Styling        | Tailwind CSS v4         |
| Charts         | Recharts                |
| Virtualization | @tanstack/react-virtual |
| Analytics      | Google Analytics 4      |
| Build          | Vite                    |
| Deploy         | Vercel                  |

---

## Running locally

```bash
git clone [repo-url]
cd finance-dashboard
npm install
npm run dev
```

No environment variables required for local development — GA4 will
simply not fire without a valid `VITE_GA_MEASUREMENT_ID` in your `.env`,
but the app runs fully without it.
