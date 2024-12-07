const express = require('express');
const transactionController = require('../controllers/transactionController');

const router = express.Router();

router.post('/', transactionController.createTransaction); // Create a transaction
router.get('/:transactionId', transactionController.getTransaction); // Get transaction by ID
router.get('/', transactionController.getAllTransactions); // Get all transactions
// Create a transaction
router.post('/transaction', transactionController.createTransaction);

// Get a transaction by ID
router.get('/transaction/:transactionId', transactionController.getTransaction);

// Update a transaction by ID
router.put('/transaction/:transactionId', transactionController.updateTransaction);

// Delete a transaction by ID
router.delete('/transaction/:transactionId', transactionController.deleteTransaction);

module.exports = router;
