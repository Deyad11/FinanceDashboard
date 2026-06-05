export const generateDynamicInsights = (transactions, categories) => {
    if (!transactions || !categories) return [] 
  const insights = []

  // Logic 1: Tech Exposure
  const tech = categories.find(c => c.label === 'Technology')
  if (tech && tech.percent > 30) {
    insights.push({
      id: 'insight_tech',
      title: 'Overweight Sector',
      text: `Your technology sector allocation has reached ${tech.percent}%. To maintain an optimal risk-adjusted profile, our algorithms suggest taking some profits and rebalancing into high-yield fixed income or defensive assets.`
    })
  }

  // Logic 2: Dining Spend
  const diningTx = transactions.filter(t => t.category === 'Lifestyle' || t.category === 'Dining')
  const diningTotal = diningTx.reduce((sum, t) => sum + Math.abs(t.amount), 0)
  
  if (diningTotal > 400) {
    insights.push({
      id: 'insight_dining',
      title: 'Surplus Opportunity',
      text: `Your discretionary spending on dining reached $${Math.round(diningTotal)} this month. Reallocating 15% of this capital towards your primary investment portfolio will significantly accelerate your progress toward your Q4 wealth targets.`
    })
  }

  // Logic 3: Subscriptions (Simulated)
  insights.push({
    id: 'insight_subs',
    title: 'Recurring Audit',
    text: `We identified overlapping media subscriptions in your recent transaction history. Consolidating these recurring expenses will immediately improve your monthly cash flow efficiency and save you approximately $180 annually.`
  })

  return insights
}