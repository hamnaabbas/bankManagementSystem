const BusinessAccount = require("../models/BusinessAccount");

const businessAccountController = {
  async create(req, res) {
    try {
      const account = await BusinessAccount.create(req.body);
      res.status(201).json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const accounts = await BusinessAccount.find().populate("created_by").populate("linked_accounts.account_id");
      res.status(200).json(accounts);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const account = await BusinessAccount.findById(req.params.id)
        .populate("created_by")
        .populate("linked_accounts.account_id");
      if (!account) return res.status(404).json({ error: "Business account not found" });
      res.status(200).json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const account = await BusinessAccount.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!account) return res.status(404).json({ error: "Business account not found" });
      res.status(200).json(account);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const account = await BusinessAccount.findByIdAndDelete(req.params.id);
      if (!account) return res.status(404).json({ error: "Business account not found" });
      res.status(200).json({ message: "Business account deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = businessAccountController;