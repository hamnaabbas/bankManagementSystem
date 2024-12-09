import React, { useState } from "react";

const InvoiceManagement = () => {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({ customer: "", amount: "" });

  const handleCreateInvoice = () => {
    setInvoices([...invoices, newInvoice]);
    setNewInvoice({ customer: "", amount: "" });
  };

  return (
    <div>
      <h2>Invoice Management</h2>
      <div>
        <label>
          Customer:
          <input
            type="text"
            value={newInvoice.customer}
            onChange={(e) =>
              setNewInvoice({ ...newInvoice, customer: e.target.value })
            }
          />
        </label>
        <label>
          Amount:
          <input
            type="number"
            value={newInvoice.amount}
            onChange={(e) =>
              setNewInvoice({ ...newInvoice, amount: e.target.value })
            }
          />
        </label>
        <button onClick={handleCreateInvoice}>Create Invoice</button>
      </div>
      <h3>Invoice List</h3>
      <ul>
        {invoices.map((invoice, index) => (
          <li key={index}>
            {invoice.customer} - ${invoice.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceManagement;
