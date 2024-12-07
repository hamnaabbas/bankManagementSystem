const Analytics = require("../models/Analytics");

const analyticsController = {
  async create(req, res) {
    try {
      const analytics = await Analytics.create(req.body);
      res.status(201).json(analytics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const analytics = await Analytics.find().populate("business_id");
      res.status(200).json(analytics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      const analytics = await Analytics.findById(req.params.id).populate("business_id");
      if (!analytics) return res.status(404).json({ error: "Analytics not found" });
      res.status(200).json(analytics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const analytics = await Analytics.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!analytics) return res.status(404).json({ error: "Analytics not found" });
      res.status(200).json(analytics);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const analytics = await Analytics.findByIdAndDelete(req.params.id);
      if (!analytics) return res.status(404).json({ error: "Analytics not found" });
      res.status(200).json({ message: "Analytics deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = analyticsController;
