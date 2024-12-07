// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Initialize app
const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/bankManagementSystem', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

// Define Schemas and Models
const loanSchema = new mongoose.Schema({
  borrowerName: String,
  amount: Number,
  interestRate: Number,
  termInMonths: Number,
  createdAt: { type: Date, default: Date.now },
});

const transactionSchema = new mongoose.Schema({
  loanId: { type: mongoose.Schema.Types.ObjectId, ref: 'Loan' },
  amount: Number,
  transactionDate: { type: Date, default: Date.now },
  type: { type: String, enum: ['PAYMENT', 'DISBURSEMENT'], required: true },
});

const Loan = mongoose.model('Loan', loanSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);

// Routes
// Create a new loan


// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
app.post('/loans', async (req, res) => {
  try {
    const { borrowerName, amount, interestRate, termInMonths } = req.body;
    const loan = new Loan({ borrowerName, amount, interestRate, termInMonths });
    await loan.save();
    res.status(201).json({ success: true, loan });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Fetch all loans
app.get('/loans', async (req, res) => {
  try {
    const loans = await Loan.find();
    res.json({ success: true, loans });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Record a transaction (payment or disbursement)
app.post('/transactions', async (req, res) => {
  try {
    const { loanId, amount, type } = req.body;
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ success: false, message: 'Loan not found' });

    const transaction = new Transaction({ loanId, amount, type });
    await transaction.save();

    res.status(201).json({ success: true, transaction });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Fetch transactions for a specific loan
app.get('/loans/:loanId/transactions', async (req, res) => {
  try {
    const { loanId } = req.params;
    const transactions = await Transaction.find({ loanId });
    res.json({ success: true, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Fetch loan details with transactions
app.get('/loans/:loanId', async (req, res) => {
  try {
    const { loanId } = req.params;
    const loan = await Loan.findById(loanId);
    if (!loan) return res.status(404).json({ success: false, message: 'Loan not found' });

    const transactions = await Transaction.find({ loanId });
    res.json({ success: true, loan, transactions });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});