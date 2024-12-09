import React, { useState, useEffect } from "react";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transactions from API
    setTransactions([
      { id: 1, type: "Payment", amount: 1000, date: "2024-12-09" },
      { id: 2, type: "Transfer", amount: 500, date: "2024-12-10" },
    ]);
  }, []);

  return (
    <div>
      <h2>Transactions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx.id}>
              <td>{tx.id}</td>
              <td>{tx.type}</td>
              <td>{tx.amount}</td>
              <td>{tx.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;
