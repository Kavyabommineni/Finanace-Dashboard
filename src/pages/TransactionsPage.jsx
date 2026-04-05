import "./TransactionsPage.css";
import { FaSearch, FaPlus, FaFileExport } from "react-icons/fa";

export default function TransactionsPage(props) {
  return (
    <div className="transactions-page">

      <h2>Transactions</h2>

      {/* FILTER CARD */}
      <div className="card filter-card">

        <div className="filter-group">
          <FaSearch />

          <input
            placeholder="Search category..."
            value={props.search}
            onChange={(e) => props.setSearch(e.target.value)}
          />
        </div>

        <select
          value={props.filterType}
          onChange={(e) => props.setFilterType(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        {props.role === "admin" && (
          <button className="btn" onClick={props.addTransaction}>
            <FaPlus /> Add
          </button>
        )}
<select
  value={props.sortBy}
  onChange={(e) => props.setSortBy(e.target.value)}
>
  <option value="none">Sort</option>
  <option value="amount">Amount</option>
  <option value="date">Date</option>
</select>
        <button className="btn export" onClick={props.exportCSV}>
          <FaFileExport /> Export
        </button>

      </div>

      {/* TABLE CARD */}
      <div className="card table-card">

        <table className="modern-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Type</th>
              {props.role === "admin" && <th>Action</th>}
            </tr>
          </thead>

          <tbody>
            {props.filtered.map(t => (
              <tr key={t.id}>
                <td>{t.date}</td>
                <td>{t.category}</td>

                <td className={t.type === "income" ? "green" : "red"}>
                  ₹{t.amount}
                </td>

                <td>
                  <span className={`badge ${t.type}`}>
                    {t.type}
                  </span>
                </td>

                {props.role === "admin" && (
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => props.deleteTransaction(t.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}

              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </div>
  );
}