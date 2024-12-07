const Transaction = require('../models/transaction');
const Account = require('../models/account'); // Assuming you have an Account model

// Deposit money
const deposit = async (accountId, amount, description = 'Deposit') => {
  try {
    // Update account balance
    const account = await Account.findById(accountId);
    if (!account) throw new Error('Account not found');

    account.balance += amount;
    await account.save();

    // Create a transaction record
    const transaction = new Transaction({
      transactionType: 'credit',
      amount,
      description,
      accountId,
      status: 'completed',
    });

    await transaction.save();
    return { success: true, transaction };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

// Withdraw money
const withdraw = async (accountId, amount, description = 'Withdrawal') => {
  try {
    // Update account balance
    const account = await Account.findById(accountId);
    if (!account) throw new Error('Account not found');
    if (account.balance < amount) throw new Error('Insufficient funds');

    account.balance -= amount;
    await account.save();

    // Create a transaction record
    const transaction = new Transaction({
      transactionType: 'debit',
      amount,
      description,
      accountId,
      status: 'completed',
    });

    await transaction.save();
    return { success: true, transaction };
  } catch (error) {
    return { success: false, message: error.message };
  }
};

module.exports = {
  deposit,
  withdraw,
};
