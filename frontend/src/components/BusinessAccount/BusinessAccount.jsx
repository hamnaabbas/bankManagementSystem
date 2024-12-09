import React from "react";

const BusinessAccount = () => {
  const accounts = [
    { id: 1, name: "Main Account", balance: 5000 },
    { id: 2, name: "Savings Account", balance: 3000 },
  ];

  return (
    <div>
      <h2>Business Accounts</h2>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>
            {account.name}: ${account.balance}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BusinessAccount;
