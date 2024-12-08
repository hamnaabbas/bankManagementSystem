const mongoose = require("mongoose");

// Define Business Payroll Schema
const businesspayrollSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessAccount",
      required: [true, "Please provide the associated Business ID."],
    },
    payroll_cycle: {
      type: String,
      required: [true, "Please specify the payroll cycle (e.g., monthly, weekly)."],
      enum: ["weekly", "bi-weekly", "monthly"],
    },
    employee_list: [
      {
        employee_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Employee",
        },
        employee_name: {
          type: String,
        },
        salary: {
          type: Number,
        },
        status: {
          type: String,
          default: "active", // active, inactive
          enum: ["active", "inactive"],
        },
      },
    ],
    payroll_history: [
      {
        batch_id: {
          type: String,
        },
        processed_date: {
          type: Date,
        },
        total_amount: {
          type: Number,
        },
        status: {
          type: String,
          enum: ["processed", "failed"],
        },
      },
    ],
  },
  {
    timestamps: true,
    collection: "Payrolls",
  }
);

// Create and export BusinessPayroll model
const BusinessPayroll = mongoose.model("BusinessPayroll", businesspayrollSchema);
module.exports = BusinessPayroll;
