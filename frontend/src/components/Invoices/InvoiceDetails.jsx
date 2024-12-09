import React, { useState } from "react";

const InvoiceDetails = ({ invoiceId }) => {
  const [invoice, setInvoice] = useState({
    id: invoiceId,
    customer: "John Doe",
    amount: 500,
    status: "Paid",
    date: "2024-12-01",
  });

  return (
    <div>
      <h2>Invoice Details</h2>
      <p><strong>ID:</strong> {invoice.id}</p>
      <p><strong>Customer:</strong> {invoice.customer}</p>
      <p><strong>Amount:</strong> ${invoice.amount}</p>
      <p><strong>Status:</strong> {invoice.status}</p>
      <p><strong>Date:</strong> {invoice.date}</p>
    </div>
  );
};

export default InvoiceDetails;
