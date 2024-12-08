const mongoose = require("mongoose");

// Define Business Account Schema
const businessAccountSchema = new mongoose.Schema(
  {
    business_name: {
      type: String,
      required: [true, "Please provide the business name."],
    },
    business_id: {
      type: String,
      required: [true, "Please provide a unique Business ID."],
      unique: true,
    },
    linked_accounts: [
      {
        account_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Account", // Links to individual account schema
        },
        account_name: {
          type: String,
        },
        balance: {
          type: Number,
        },
      },
    ],
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin or business creator
      required: [true, "Please provide the creator ID."],
    },
    status: {
      type: String,
      default: "active", // active, suspended, closed
      enum: ["active", "suspended", "closed"],
    },
  },
  {
    timestamps: true,
    collection: "BusinessAccounts",
  }
);

// Create and export BusinessAccount model
const BusinessAccount = mongoose.model("BusinessAccount", businessAccountSchema);
module.exports = BusinessAccount;
