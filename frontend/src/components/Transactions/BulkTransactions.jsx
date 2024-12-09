import React from "react";

const BulkTransactions = () => {
  const handleBulkUpload = () => {
    console.log("Bulk transaction uploaded!");
  };

  return (
    <div>
      <h2>Bulk Transactions</h2>
      <input type="file" accept=".csv" />
      <button onClick={handleBulkUpload}>Upload Bulk Transactions</button>
    </div>
  );
};

export default BulkTransactions;
