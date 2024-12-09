import React from "react";

const Alerts = () => {
  const alerts = [
    { id: 1, message: "High-value transaction detected" },
    { id: 2, message: "Payroll processing completed" },
  ];

  return (
    <div>
      <h2>Alerts</h2>
      <ul>
        {alerts.map((alert) => (
          <li key={alert.id}>{alert.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default Alerts;
