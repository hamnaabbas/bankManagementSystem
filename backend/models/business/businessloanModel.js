const mongoose = require("mongoose");

// Define Business Loan Schema
const businessloanSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessAccount",
      required: [true, "Please provide the associated Business ID."],
    },
    loan_amount: {
      type: Number,
      required: [true, "Please specify the loan amount."],
    },
    interest_rate: {
      type: Number,
    },
    repayment_schedule: [
      {
        due_date: {
          type: Date,
        },
        amount_due: {
          type: Number,
        },
        status: {
          type: String,
          default: "pending", // pending, paid, overdue
          enum: ["pending", "paid", "overdue"],
        },
      },
    ],
    loan_status: {
      type: String,
      default: "pending", // pending, approved, rejected
      enum: ["pending", "approved", "rejected"],
    },
  },
  {
    timestamps: true,
    collection: "Loans",
  }
);

// Create and export BusinessLoan model
const BusinessLoan = mongoose.model("BusinessLoan", businessloanSchema);
module.exports = BusinessLoan;
