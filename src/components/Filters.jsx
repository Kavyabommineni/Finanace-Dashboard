export default function Filters({
  search,
  setSearch,
  filterType,
  setFilterType,
  role,
  addTransaction,
  exportCSV
}) {
  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
      <input
        placeholder="Search category"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {role === "admin" && (
        <button onClick={addTransaction}>Add</button>
      )}

      <button onClick={exportCSV}>Export CSV</button>
    </div>
  );
}