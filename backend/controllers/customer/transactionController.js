const Transaction = require('../models/Transaction'); // Assuming you have a Transaction model
const Loan = require('../models/Loan'); // Assuming you have a Loan model

// Create a new transaction
exports.createTransaction = async (req, res) => {
    try {
        const { loanId, transactionAmount, transactionType, date } = req.body;

        // Find loan by ID
        const loan = await Loan.findById(loanId);
        if (!loan) {
            return res.status(404).json({ message: "Loan not found!" });
        }

        // Create new transaction
        const transaction = new Transaction({
            loanId,
            transactionAmount,
            transactionType, // Can be 'credit' or 'debit'
            date,
        });

        await transaction.save();

        res.status(201).json({ message: 'Transaction created successfully', transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating transaction' });
    }
};

// Get transaction details by ID
exports.getTransaction = async (req, res) => {
    try {
        const transactionId = req.params.transactionId;

        // Find transaction by ID
        const transaction = await Transaction.findById(transactionId).populate('loanId'); // Assuming transaction has a reference to Loan

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({ transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving transaction details' });
    }
};

// Update transaction details
exports.updateTransaction = async (req, res) => {
    try {
        const transactionId = req.params.transactionId;
        const { transactionAmount, transactionType, date } = req.body;

        // Find transaction and update
        const transaction = await Transaction.findByIdAndUpdate(transactionId, { transactionAmount, transactionType, date }, { new: true });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({ message: 'Transaction updated successfully', transaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating transaction' });
    }
};

// Delete a transaction
exports.deleteTransaction = async (req, res) => {
    try {
        const transactionId = req.params.transactionId;

        // Find and delete transaction
        const transaction = await Transaction.findByIdAndDelete(transactionId);

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting transaction' });
    }
};
