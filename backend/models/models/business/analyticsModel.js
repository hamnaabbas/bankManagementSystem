const mongoose = require("mongoose");

// Define Analytics Schema
const analyticsSchema = new mongoose.Schema(
  {
    business_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BusinessAccount",
      required: [true, "Please provide the associated Business ID."],
    },
    income: {
      type: Number,
      default: 0,
    },
    expenses: {
      type: Number,
      default: 0,
    },
    profitability: {
      type: Number,
      default: 0,
    },
    generated_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "Analytics",
  }
);

// Create and export Analytics model
const Analytics = mongoose.model("Analytics", analyticsSchema);
module.exports = Analytics;
