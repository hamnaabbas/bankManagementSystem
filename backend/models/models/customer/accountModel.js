const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

// Define Balance Transferred In Schema
const transferredInSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId, // Referencing User ID
      ref: "User",
      required: [true, "Please Provide Sending Account User ID!"],
    },
    balance_transferred: {
      type: Number,
      required: [true, "Please Provide Transferred Balance!"],
      min: [50, "You Cannot Transfer Balance Less Than 50 L.E"],
    },
  },
  {
    timestamps: true,
  }
);

// Define Balance Transferred Out Schema
const transferredOutSchema = new mongoose.Schema(
  {
    to: {
      type: mongoose.Schema.Types.ObjectId, // Referencing User ID
      ref: "User",
      required: [true, "Please Provide Receiving Account User ID!"],
    },
    balance_transferred: {
      type: Number,
      required: [true, "Please Provide Transferred Balance!"],
      min: [50, "You Cannot Transfer Balance Less Than 50 L.E"],
    },
  },
  {
    timestamps: true,
  }
);

// Define Withdraw Log Schema
const withdrawLogSchema = new mongoose.Schema(
  {
    withdrawn_amount: {
      type: Number,
      required: [true, "Please Provide Withdrawn Balance Amount"],
      min: [100, "You Cannot Withdraw Balance Less Than 100 L.E"],
    },
  },
  {
    timestamps: true,
  }
);

// Define Deposit Log Schema
const depositLogSchema = new mongoose.Schema(
  {
    deposited_amount: {
      type: Number,
      required: [true, "Please Provide Deposited Balance Amount"],
      min: [100, "You Cannot Deposit Balance Less Than 100 L.E"],
    },
  },
  {
    timestamps: true,
  }
);

// Define Account Schema
const accountSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId, // Referencing User ID
      ref: "User",
      required: [true, "Please Provide User ID!"],
    },
    balance: {
      type: Number,
      default: 0,
      min: [0, "Balance Cannot Be Less Than 0 L.E!"],
    },
    in: [transferredInSchema],
    out: [transferredOutSchema],
    deposit_logs: [depositLogSchema],
    withdraw_logs: [withdrawLogSchema],
  },
  {
    timestamps: true,
    collection: "Accounts",
  }
);

// Auto Increment Account ID Plugin
accountSchema.plugin(autoIncrement, {
  model: "Account",
  startAt: 202511545300,
  incrementBy: 1,
});

// Define Account Model
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
