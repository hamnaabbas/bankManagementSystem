const mongoose = require("mongoose");

// Define Business Transaction Schema
const businesstransactionSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessAccount",
      required: [true, "Please provide the associated Business ID."],
    },
    transaction_type: {
      type: String,
      required: [true, "Please specify the transaction type."],
      enum: ["batch-payment", "bulk-transfer", "payroll-processing"],
    },
    transaction_details: [
      {
        recipient_name: {
          type: String,
        },
        account_number: {
          type: String,
        },
        amount: {
          type: Number,
        },
        status: {
          type: String,
          default: "pending", // pending, completed, failed
          enum: ["pending", "completed", "failed"],
        },
      },
    ],
    processed_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    processed_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
    collection: "Transactions",
  }
);

// Create and export BusinessTransaction model
const BusinessTransaction = mongoose.model(
  "BusinessTransaction",
  businesstransactionSchema
);
module.exports = BusinessTransaction;
