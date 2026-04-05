export default function TransactionsTable({ data, role, deleteTransaction }) {
  return (
    <table border="1" width="100%">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>Category</th>
          <th>Type</th>
          {role === "admin" && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan="5">No Data</td>
          </tr>
        ) : (
          data.map((t) => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>₹{t.amount}</td>
              <td>{t.category}</td>
              <td>{t.type}</td>
              {role === "admin" && (
                <td>
                  <button onClick={() => deleteTransaction(t.id)}>Delete</button>
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}