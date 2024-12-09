import React, { useState } from "react";

const LoanRepayment = () => {
  const [repaymentSchedule, setRepaymentSchedule] = useState([
    { id: 1, dueDate: "2024-12-15", amount: 1000, status: "Pending" },
    { id: 2, dueDate: "2024-01-15", amount: 1000, status: "Pending" },
  ]);

  return (
    <div>
      <h2>Loan Repayment Schedule</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Due Date</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {repaymentSchedule.map((payment) => (
            <tr key={payment.id}>
              <td>{payment.id}</td>
              <td>{payment.dueDate}</td>
              <td>${payment.amount}</td>
              <td>{payment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoanRepayment;
