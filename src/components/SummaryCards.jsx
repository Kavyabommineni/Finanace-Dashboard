import "./SummaryCards.css";
import { FaWallet, FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function SummaryCards({ summary }) {
  return (
    <div className="cards">

      <div className="card">
        <FaWallet />
        <h3>Balance</h3>
        <p>₹{summary.balance}</p>
      </div>

      <div className="card">
        <FaArrowUp color="green" />
        <h3>Income</h3>
        <p>₹{summary.income}</p>
      </div>

      <div className="card">
        <FaArrowDown color="red" />
        <h3>Expense</h3>
        <p>₹{summary.expense}</p>
      </div>

    </div>
  );
}