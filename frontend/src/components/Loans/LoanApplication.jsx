import React, { useState } from "react";

const LoanApplication = () => {
  const [loanDetails, setLoanDetails] = useState({ amount: "", term: "" });

  const handleApplyLoan = () => {
    console.log("Loan Applied:", loanDetails);
  };

  return (
    <div>
      <h2>Apply for Loan</h2>
      <label>
        Amount:
        <input
          type="number"
          value={loanDetails.amount}
          onChange={(e) =>
            setLoanDetails({ ...loanDetails, amount: e.target.value })
          }
        />
      </label>
      <label>
        Term (Months):
        <input
          type="number"
          value={loanDetails.term}
          onChange={(e) =>
            setLoanDetails({ ...loanDetails, term: e.target.value })
          }
        />
      </label>
      <button onClick={handleApplyLoan}>Apply</button>
    </div>
  );
};

export default LoanApplication;
