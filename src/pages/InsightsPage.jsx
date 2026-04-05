import "./InsightsPage.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function InsightsPage({
  summary,
  highestCategory,
  monthlyComparison,
  categoryInsight,
  monthlyData,
  topCategories
}) {
  return (
    <div className="insights-page">

      <h2>Insights</h2>

      {/* 🔥 TOP CARDS */}
      <div className="insights-grid">

        <div className="insight-card">
          <h4>Top Category</h4>
          <p>{highestCategory}</p>
        </div>

        <div className="insight-card">
          <h4>Monthly Trend</h4>
          <p>{monthlyComparison}</p>
        </div>

        <div className="insight-card">
          <h4>Spending Insight</h4>
          <p>{categoryInsight}</p>
        </div>

        <div className="insight-card highlight">
          <h4>Balance</h4>
          <p>₹{summary.balance}</p>
        </div>

      </div>

      {/* 🔥 BOTTOM SECTION */}
      <div className="insights-bottom">

        {/* LEFT → CHART */}
        <div className="insight-card chart-card">
          <h4>Monthly Overview</h4>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={monthlyData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill="#22c55e" />
              <Bar dataKey="expense" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* RIGHT → TOP CATEGORIES */}
        <div className="insight-card category-card">
          <h4>Top 3 Spending Categories</h4>

          {topCategories.length === 0 ? (
            <p>No data available</p>
          ) : (
            topCategories.map((item, i) => (
              <div key={i} className="category-row">
                <span>{item.category}</span>
                <span>₹{item.amount}</span>
              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}