import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import "./DashboardPage.css";

export default function DashboardPage({ summary, transactions }) {
  return (
    <div>
      <h2>Dashboard</h2>
      <SummaryCards summary={summary} />
      <Charts transactions={transactions} />
    </div>
  );
}