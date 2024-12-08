const mongoose = require("mongoose");
const { autoIncrement } = require("mongoose-plugin-autoinc");

// Models
const Account = require("./models/customer/account");
const User = require("./models/customer/user");
const Transaction = require("./models/customer/transaction");
const Loan = require("./models/customer/loan");
const Notification = require("./models/notification");
const AuditLog = require("./models/admin/auditLog");
const Suspension = require("./models/admin/suspension");
const SupportTicket = require("./models/admin/supportTicket");
const Warning = require("./models/warning");
const AccountRequest = require("./models/customer/accountRequest");
const RolePermission = require("./models/business/rolePermission");
const Request = require("./models/business/request");
const Invoice = require("./models/business/invoice");
const BusinessTransaction = require("./models/business/businessTransaction");
const BusinessPayroll = require("./models/business/businessPayroll");
const BusinessAccount = require("./models/business/businessAccount");
const Analytics = require("./models/business/analytics");
const BusinessLoan = require("./models/business/businessLoan"); // Add the BusinessLoan model

mongoose.connect("mongodb://localhost:27017/bankManagementSystem", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedDatabase = async () => {
  try {
    // Create some Users
    const user1 = new User({
      user_name: "JohnDoe123",
      email: "johndoe@example.com",
      password: "password123",
      phone: 1023456789,
      full_addresse: "1234 Main St, Cairo, Egypt",
      zip_code: 12345,
      role: "Customer",
    });

    const user2 = new User({
      user_name: "JaneDoe456",
      email: "janedoe@example.com",
      password: "password456",
      phone: 1034567890,
      full_addresse: "5678 Elm St, Cairo, Egypt",
      zip_code: 54321,
      role: "Admin",
    });

    await user1.save();
    await user2.save();

    // Create Accounts for Users
    const account1 = new Account({
      user_id: user1._id,
      balance: 500,
    });

    const account2 = new Account({
      user_id: user2._id,
      balance: 1000,
    });

    await account1.save();
    await account2.save();

    // Create Transactions (Deposit, Withdraw)
    const deposit1 = new Transaction({
      loanId: null,
      amount: 200,
      transactionDate: new Date(),
      type: "DISBURSEMENT",
    });

    const withdraw1 = new Transaction({
      loanId: null,
      amount: 100,
      transactionDate: new Date(),
      type: "PAYMENT",
    });

    await deposit1.save();
    await withdraw1.save();

    // Create Loan
    const loan1 = new Loan({
      borrowerName: "JohnDoe123",
      amount: 5000,
      interestRate: 7.5,
      termInMonths: 24,
    });

    await loan1.save();

    // Create Account Requests
    const accountRequest = new AccountRequest({
      client_id: "12345",
      initial_balance: 500,
    });

    await accountRequest.save();

    // Create Notifications
    const notification1 = new Notification({
      user_id: user1._id,
      type: "approved",
      title: "Account Approved",
      message: "Your account has been approved.",
    });

    await notification1.save();

    // Create Audit Log
    const auditLog1 = new AuditLog({
      userId: user2._id,
      action: "Account Created",
      details: "User account creation successful",
    });

    await auditLog1.save();

    // Create Suspensions
    const suspension1 = new Suspension({
      user_id: user1._id,
      reason: "Policy Violation",
      status: "active",
    });

    await suspension1.save();

    // Create Support Ticket
    const supportTicket1 = new SupportTicket({
      userId: user1._id,
      subject: "Account Issue",
      description: "I cannot access my account.",
      status: "open",
    });

    await supportTicket1.save();

    // Create Warnings
    const warning1 = new Warning({
      user_id: user1._id,
      reason: "wrong-password",
      status: "pending",
    });

    await warning1.save();

    // Create Role Permissions
    const rolePermission1 = new RolePermission({
      business_id: user2._id, // assuming business is tied to Admin user
      role_name: "Admin",
      permissions: [
        "view-transactions",
        "process-payroll",
        "manage-accounts",
        "create-invoice",
        "approve-loan",
        "manage-users",
        "generate-reports",
      ],
      assigned_users: [
        { user_id: user2._id, email: user2.email, status: "active" },
      ],
    });

    await rolePermission1.save();

    // Create Requests
    const request1 = new Request({
      user_id: user1._id,
      request_type: "account-creation",
      details: "Request for new account",
      status: "pending",
    });

    await request1.save();

    // Create Invoices
    const invoice1 = new Invoice({
      business_id: user2._id,
      invoice_number: "INV12345",
      client_name: "Client A",
      client_email: "clientA@example.com",
      items: [
        { description: "Service A", quantity: 1, price: 100 },
        { description: "Service B", quantity: 2, price: 150 },
      ],
      total_amount: 400,
      status: "unpaid",
    });

    await invoice1.save();

    // Create Business Transactions
    const businessTransaction1 = new BusinessTransaction({
      business_id: user2._id,
      transaction_type: "batch-payment",
      transaction_details: [
        { recipient_name: "Employee 1", account_number: "123456", amount: 200, status: "pending" },
        { recipient_name: "Employee 2", account_number: "789012", amount: 300, status: "pending" },
      ],
      processed_by: user2._id,
      processed_at: new Date(),
    });

    await businessTransaction1.save();

    // Create Business Payroll
    const businessPayroll1 = new BusinessPayroll({
      business_id: user2._id,
      payroll_cycle: "monthly",
      employee_list: [
        { employee_id: user1._id, employee_name: "Employee 1", salary: 1500, status: "active" },
        { employee_id: user2._id, employee_name: "Employee 2", salary: 2000, status: "active" },
      ],
      payroll_history: [
        { batch_id: "BATCH12345", processed_date: new Date(), total_amount: 3500, status: "processed" },
      ],
    });

    await businessPayroll1.save();

    // Create Business Account
    const businessAccount1 = new BusinessAccount({
      business_name: "Business A",
      business_id: "BUS123",
      linked_accounts: [
        { account_id: account1._id, account_name: "Main Account", balance: 5000 },
      ],
      created_by: user2._id,
      status: "active",
    });

    await businessAccount1.save();

    // Create Analytics
    const analytics1 = new Analytics({
      business_id: businessAccount1._id,
      income: 10000,
      expenses: 5000,
      profitability: 5000,
      generated_at: new Date(),
    });

    await analytics1.save();

    // Create Business Loan
    const businessLoan1 = new BusinessLoan({
      business_id: businessAccount1._id,
      loan_amount: 10000,
      interest_rate: 8.5,
      repayment_schedule: [
        { due_date: new Date(), amount_due: 1000 },
        { due_date: new Date(), amount_due: 1000 },
      ],
      loan_status: "pending",
    });

    await businessLoan1.save();

    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

// Run the seeding function
seedDatabase();
