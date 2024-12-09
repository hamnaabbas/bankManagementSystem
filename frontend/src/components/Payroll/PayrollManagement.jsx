import React, { useState } from "react";

const PayrollManagement = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [cycle, setCycle] = useState("");

  const handlePayrollProcess = () => {
    // Example API Call
    console.log("Processing payroll for cycle:", cycle);
  };

  return (
    <div>
      <h2>Payroll Management</h2>
      <label>
        Payroll Cycle:
        <input
          type="text"
          value={cycle}
          onChange={(e) => setCycle(e.target.value)}
          placeholder="e.g., Monthly"
        />
      </label>
      <button onClick={handlePayrollProcess}>Process Payroll</button>

      <h3>Payroll History</h3>
      <ul>
        {payrollData.map((payroll, index) => (
          <li key={index}>
            {payroll.date}: {payroll.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PayrollManagement;
