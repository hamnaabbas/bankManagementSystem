const BusinessTransaction = require("../../models/business/businesstransactionModel");

const businessTransactionController = {
  async create(req, res) {
    try {
      const transaction = await BusinessTransaction.create(req.body);
      res.status(201).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const transactions = await BusinessTransaction.find()
        .populate("business_id")
        .populate("related_transactions.transaction_id");
      res.status(200).json(transactions);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const transaction = await BusinessTransaction.findById(req.params.id)
        .populate("business_id")
        .populate("related_transactions.transaction_id");
      if (!transaction) return res.status(404).json({ error: "Transaction not found" });
      res.status(200).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const transaction = await BusinessTransaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!transaction) return res.status(404).json({ error: "Transaction not found" });
      res.status(200).json(transaction);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const transaction = await BusinessTransaction.findByIdAndDelete(req.params.id);
      if (!transaction) return res.status(404).json({ error: "Transaction not found" });
      res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = businessTransactionController;
