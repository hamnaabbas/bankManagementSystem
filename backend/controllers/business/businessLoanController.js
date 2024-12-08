const BusinessLoan = require("../../models/business/businessloanModel");

const businessLoanController = {
  async create(req, res) {
    try {
      const loan = await BusinessLoan.create(req.body);
      res.status(201).json(loan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const loans = await BusinessLoan.find().populate("business_id");
      res.status(200).json(loans);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const loan = await BusinessLoan.findById(req.params.id).populate("business_id");
      if (!loan) return res.status(404).json({ error: "Business loan not found" });
      res.status(200).json(loan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const loan = await BusinessLoan.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!loan) return res.status(404).json({ error: "Business loan not found" });
      res.status(200).json(loan);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const loan = await BusinessLoan.findByIdAndDelete(req.params.id);
      if (!loan) return res.status(404).json({ error: "Business loan not found" });
      res.status(200).json({ message: "Business loan deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = businessLoanController;