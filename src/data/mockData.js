export const summaryData = {
  netWorth: { value: 1248390, change: 12.4, label: "vs last month" },
  spending: { value: 4250, change: 2.1, label: "higher than avg" },
  savings: { value: 84120, status: "On track for Q4 goal" }
}

export const alerts = [
  { id: 1, type: "error", title: "Subscription Spike", desc: "3 new recurring charges detected from Cloud SaaS in the last 48h." },
  { id: 2, type: "warning", title: "Emergency Fund Cap", desc: "Your Rainy Day fund has reached its target of $20k. Redirecting flows?" },
  { id: 3, type: "info", title: "Dividend Reinvestment", desc: "AAPL and MSFT paid dividends today. Automatic reinvestment pending." }
]

export const spendingCategories = [
  { label: "Housing & Utilities", percent: 42, color: "#EF9F27" },
  { label: "Dining & Leisure", percent: 18, color: "#E24B4A" },
  { label: "Investments", percent: 25, color: "#1D9E75" },
  { label: "Transportation", percent: 15, color: "#378ADD" }
]

export const transactions = [
  { id: 1, merchant: "Apple Store Soho", category: "Technology", status: "Cleared", amount: -1299.00 },
  { id: 2, merchant: "Blue Hill Farm", category: "Lifestyle", status: "Cleared", amount: -485.20 },
  { id: 3, merchant: "ConEd Utility Bill", category: "Utilities", status: "Pending", amount: -214.10 },
  { id: 4, merchant: "Monthly Salary Deposit", category: "Income", status: "Cleared", amount: 12500.00 }
]

export const aiInsights = [
  { id: 1, text: "Your tech exposure increased by 14.2% since last quarter. Consider rebalancing." },
  { id: 2, text: "You can save $180 annually by removing duplicate streaming subscriptions." },
  { id: 3, text: "Discretionary spending on Dining & Leisure is down 12% this month." }
]

export const portfolioData = [
  { month: "May", value: 1100000 },
  { month: "Jun", value: 1150000 },
  { month: "Jul", value: 1180000 },
  { month: "Aug", value: 1140000 },
  { month: "Sep", value: 1200000 },
  { month: "Oct", value: 1248390 }
]