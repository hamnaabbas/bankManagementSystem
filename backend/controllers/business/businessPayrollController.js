const BusinessPayroll = require("../models/BusinessPayroll");

const businessPayrollController = {
  async create(req, res) {
    try {
      const payroll = await BusinessPayroll.create(req.body);
      res.status(201).json(payroll);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const payrolls = await BusinessPayroll.find().populate("business_id").populate("employee_list.employee_id");
      res.status(200).json(payrolls);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const payroll = await BusinessPayroll.findById(req.params.id)
        .populate("business_id")
        .populate("employee_list.employee_id");
      if (!payroll) return res.status(404).json({ error: "Business payroll not found" });
      res.status(200).json(payroll);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const payroll = await BusinessPayroll.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!payroll) return res.status(404).json({ error: "Business payroll not found" });
      res.status(200).json(payroll);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const payroll = await BusinessPayroll.findByIdAndDelete(req.params.id);
      if (!payroll) return res.status(404).json({ error: "Business payroll not found" });
      res.status(200).json({ message: "Business payroll deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = businessPayrollController;