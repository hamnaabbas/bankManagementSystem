const Invoice = require("../../models/business/invoiceModel");

const invoiceController = {
  async create(req, res) {
    try {
      const invoice = await Invoice.create(req.body);
      res.status(201).json(invoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const invoices = await Invoice.find().populate("business_id");
      res.status(200).json(invoices);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const invoice = await Invoice.findById(req.params.id).populate("business_id");
      if (!invoice) return res.status(404).json({ error: "Invoice not found" });
      res.status(200).json(invoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!invoice) return res.status(404).json({ error: "Invoice not found" });
      res.status(200).json(invoice);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const invoice = await Invoice.findByIdAndDelete(req.params.id);
      if (!invoice) return res.status(404).json({ error: "Invoice not found" });
      res.status(200).json({ message: "Invoice deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async trackInvoice(req, res) {
    try {
      const invoice = await Invoice.findById(req.params.id);
      if (!invoice) return res.status(404).json({ error: "Invoice not found" });
      res.status(200).json({ status: invoice.status, payment_date: invoice.payment_date });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = invoiceController;
