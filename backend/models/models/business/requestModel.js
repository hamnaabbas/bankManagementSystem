const mongoose = require("mongoose");

// Define Request Schema
const requestSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide a User ID."],
    },
    request_type: {
      type: String,
      required: [true, "Please provide the request type."],
      enum: ["account-creation", "role-change", "balance-adjustment"],
    },
    details: {
      type: String,
      required: [true, "Please provide request details."],
    },
    status: {
      type: String,
      default: "pending", // pending, approved, rejected
      enum: ["pending", "approved", "rejected"],
    },
    handled_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Admin ID
    },
  },
  {
    timestamps: true,
    collection: "Requests",
  }
);

// Create and export Request model
const Request = mongoose.model("Request", requestSchema);
module.exports = Request;
