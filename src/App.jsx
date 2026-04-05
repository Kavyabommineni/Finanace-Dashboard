import { useState, useMemo, useEffect } from "react";
import mockData from "./data/mockData";
import { FaUser, FaUserShield } from "react-icons/fa";

import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import InsightsPage from "./pages/InsightsPage";

import "./App.css";

export default function App() {
  const [current, setCurrent] = useState("dashboard");

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : mockData;
  });

  const [role, setRole] = useState("viewer");
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("none");

  // 🌙 Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // Load dark mode preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setDarkMode(JSON.parse(savedTheme));
  }, []);

  // ✅ Summary
  const summary = useMemo(() => {
    let income = 0, expense = 0;

    transactions.forEach(t => {
      t.type === "income" ? income += t.amount : expense += t.amount;
    });

    return {
      income: income || 0,
      expense: expense || 0,
      balance: (income || 0) - (expense || 0)
    };
  }, [transactions]);

  // ✅ Filter + Sort
  const filtered = useMemo(() => {
    let data = transactions.filter(t =>
      t.category.toLowerCase().includes(search.toLowerCase()) &&
      (filterType === "all" || t.type === filterType)
    );

    if (sortBy === "amount") {
      data = [...data].sort((a, b) => b.amount - a.amount);
    }

    if (sortBy === "date") {
      data = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return data;
  }, [transactions, search, filterType, sortBy]);

  // ✅ Highest Category
  const highestCategory = useMemo(() => {
    const map = {};

    transactions.forEach(t => {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });

    return Object.entries(map).sort((a,b)=>b[1]-a[1])[0]?.[0] || "N/A";
  }, [transactions]);

  // ✅ Monthly Comparison
  const monthlyComparison = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const lastMonth = currentMonth - 1;

    let current = 0;
    let previous = 0;

    transactions.forEach(t => {
      const month = new Date(t.date).getMonth();

      if (t.type === "expense") {
        if (month === currentMonth) current += t.amount;
        if (month === lastMonth) previous += t.amount;
      }
    });

    if (previous === 0 && current === 0) return "No spending data available";
    if (previous === 0) return "No data from last month";

    const change = ((current - previous) / previous) * 100;

    return change > 0
      ? `Spending increased by ${change.toFixed(1)}%`
      : `Spending decreased by ${Math.abs(change).toFixed(1)}%`;
  }, [transactions]);

  // ✅ Category Insight
  const categoryInsight = useMemo(() => {
    const total = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const map = {};

    transactions.forEach(t => {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });

    const top = Object.entries(map).sort((a, b) => b[1] - a[1])[0];

    if (!top) return "No data";

    const percent = ((top[1] / total) * 100).toFixed(1);

    return `${top[0]} accounts for ${percent}% of your expenses`;
  }, [transactions]);

  // ✅ Monthly Data
  const monthlyData = useMemo(() => {
    const months = {};

    transactions.forEach(t => {
      const d = new Date(t.date);

      const key = d.toLocaleString("default", {
        month: "short",
        year: "numeric"
      });

      if (!months[key]) {
        months[key] = { month: key, income: 0, expense: 0 };
      }

      if (t.type === "income") {
        months[key].income += t.amount;
      } else {
        months[key].expense += t.amount;
      }
    });

    return Object.values(months);
  }, [transactions]);

  // ✅ Top Categories
  const topCategories = useMemo(() => {
    const map = {};

    transactions.forEach(t => {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });

    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([category, amount]) => ({ category, amount }));
  }, [transactions]);

  // Actions
  const addTransaction = () => {
    const newTx = {
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      amount: Math.floor(Math.random() * 2000),
      category: "Misc",
      type: Math.random() > 0.5 ? "income" : "expense"
    };

    setTransactions(prev => [...prev, newTx]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const exportCSV = () => {
    const csv = ["Date,Amount,Category,Type",
      ...transactions.map(t => `${t.date},${t.amount},${t.category},${t.type}`)
    ].join("\n");

    const blob = new Blob([csv]);
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>

      <Sidebar current={current} setCurrent={setCurrent} />

      <div className="main-content">

        {/* 🔥 Top Bar */}
        <div className="top-bar">
          <h2>Finance Dashboard</h2>

          <div className="role-container">

            {/* 🌙 Dark Mode Toggle */}
            <button className="dark-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>

            {/* Role Toggle */}
            <div className={`role-toggle ${role}`}>
              <div className="slider"></div>

              <button onClick={() => setRole("viewer")}>
                <FaUser /> Viewer
              </button>

              <button onClick={() => setRole("admin")}>
                <FaUserShield /> Admin
              </button>
            </div>

          </div>
        </div>

        {/* Pages */}
        {current === "dashboard" && (
          transactions.length === 0
            ? <div className="empty-state">
  No data available
</div>
            : <DashboardPage summary={summary} transactions={transactions} />
        )}

        {current === "transactions" && (
          filtered.length === 0
            ? <p>No transactions found</p>
            : <TransactionsPage
                search={search}
                setSearch={setSearch}
                filterType={filterType}
                setFilterType={setFilterType}
                role={role}
                addTransaction={addTransaction}
                deleteTransaction={deleteTransaction}
                filtered={filtered}
                exportCSV={exportCSV}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
        )}

        {current === "insights" && (
          <InsightsPage
            summary={summary}
            highestCategory={highestCategory}
            monthlyComparison={monthlyComparison}
            categoryInsight={categoryInsight}
            monthlyData={monthlyData}
            topCategories={topCategories}
          />
        )}

      </div>
    </div>
  );
}