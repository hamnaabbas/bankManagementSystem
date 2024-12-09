import React from "react";

const Reports = () => {
  return (
    <div>
      <h2>Business Reports</h2>
      <p>Generate financial reports to analyze your business performance.</p>
      <button onClick={() => console.log("Report generated!")}>
        Generate Report
      </button>
    </div>
  );
};

export default Reports;
