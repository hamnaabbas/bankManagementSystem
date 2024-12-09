import React, { useEffect, useState } from "react";
import apiClient from "../../services/apiClient";

const PayrollHistory = () => {
  const [payrollHistory, setPayrollHistory] = useState([]);

  useEffect(() => {
    const fetchPayrollHistory = async () => {
      try {
        const response = await apiClient.get("/payrolls");
        setPayrollHistory(response.data);
      } catch (error) {
        console.error("Error fetching payroll history:", error);
      }
    };

    fetchPayrollHistory();
  }, []);

  return (
    <div>
      <h2>Payroll History</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {payrollHistory.map((payroll) => (
            <tr key={payroll.id}>
              <td>{payroll.id}</td>
              <td>{payroll.date}</td>
              <td>${payroll.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollHistory;
