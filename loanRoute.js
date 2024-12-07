const express = require('express');
const router = express.Router();
const loanController = require('../controllers/loanController');

// Create a loan
router.post('/loan', loanController.createLoan);

// Get a loan by ID
router.get('/loan/:loanId', loanController.getLoan);

// Update a loan by ID
router.put('/loan/:loanId', loanController.updateLoan);

// Delete a loan by ID
router.delete('/loan/:loanId', loanController.deleteLoan);

module.exports = router;
