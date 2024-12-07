const Loan = require('../models/Loan'); // Assuming you have a Loan model
const User = require('../models/User'); // Assuming you have a User model

// Create a new loan
exports.createLoan = async (req, res) => {
    try {
        const { userId, amount, interestRate, duration, startDate } = req.body;

        // Validate if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        // Create new loan
        const loan = new Loan({
            userId,
            amount,
            interestRate,
            duration,
            startDate,
            status: 'Pending', // Assuming the default status is 'Pending'
        });

        await loan.save();

        res.status(201).json({ message: 'Loan created successfully', loan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating loan' });
    }
};

// Get loan details by ID
exports.getLoan = async (req, res) => {
    try {
        const loanId = req.params.loanId;

        // Find loan by ID
        const loan = await Loan.findById(loanId).populate('userId'); // Assuming loan has a reference to User

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        res.status(200).json({ loan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving loan details' });
    }
};

// Update loan status or details
exports.updateLoan = async (req, res) => {
    try {
        const loanId = req.params.loanId;
        const { status, amount, interestRate, duration } = req.body;

        // Find loan and update
        const loan = await Loan.findByIdAndUpdate(loanId, { status, amount, interestRate, duration }, { new: true });

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        res.status(200).json({ message: 'Loan updated successfully', loan });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating loan' });
    }
};

// Delete a loan
exports.deleteLoan = async (req, res) => {
    try {
        const loanId = req.params.loanId;

        // Find and delete loan
        const loan = await Loan.findByIdAndDelete(loanId);

        if (!loan) {
            return res.status(404).json({ message: 'Loan not found' });
        }

        res.status(200).json({ message: 'Loan deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting loan' });
    }
};
