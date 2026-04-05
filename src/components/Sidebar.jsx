import "./Sidebar.css";
import { FaChartPie, FaList, FaLightbulb } from "react-icons/fa";

export default function Sidebar({ setCurrent }) {
  return (
    <div className="sidebar">
      <div className="logo">💰 Finance</div>

      <div className="nav-item" onClick={() => setCurrent("dashboard")}>
        <FaChartPie /> Dashboard
      </div>

      <div className="nav-item" onClick={() => setCurrent("transactions")}>
        <FaList /> Transactions
      </div>

      <div className="nav-item" onClick={() => setCurrent("insights")}>
        <FaLightbulb /> Insights
      </div>
    </div>
  );
}