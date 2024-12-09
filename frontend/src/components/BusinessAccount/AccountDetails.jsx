import React from "react";

const AccountDetails = ({ accountId }) => {
  const account = { id: accountId, name: "Main Account", balance: 5000 };

  return (
    <div>
      <h2>Account Details</h2>
      <p><strong>ID:</strong> {account.id}</p>
      <p><strong>Name:</strong> {account.name}</p>
      <p><strong>Balance:</strong> ${account.balance}</p>
    </div>
  );
};

export default AccountDetails;
