const Request = require("../models/Request");

const requestController = {
  async create(req, res) {
    try {
      // Create a new request based on the provided request body
      const newRequest = new Request({
        user_id: req.body.user_id,
        request_type: req.body.request_type,
        details: req.body.details,
        status: "pending",
      });
      await newRequest.save();
      res.status(201).json(newRequest);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      // Retrieve all requests, optionally filter by user ID or status
      const { user_id, status } = req.query;
      const filter = {};
      if (user_id) filter.user_id = user_id;
      if (status) filter.status = status;

      const requests = await Request.find(filter).populate("user_id handled_by");
      res.status(200).json(requests);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getOne(req, res) {
    try {
      // Find a specific request by its ID
      const request = await Request.findById(req.params.id).populate("user_id handled_by");
      if (!request) return res.status(404).json({ error: "Request not found" });
      res.status(200).json(request);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      // Update a request's status (e.g., approved or rejected)
      const request = await Request.findByIdAndUpdate(
        req.params.id,
        { status: req.body.status, handled_by: req.body.handled_by },
        { new: true }
      );
      if (!request) return res.status(404).json({ error: "Request not found" });
      res.status(200).json(request);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      // Delete a specific request by ID
      const request = await Request.findByIdAndDelete(req.params.id);
      if (!request) return res.status(404).json({ error: "Request not found" });
      res.status(200).json({ message: "Request deleted successfully" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

module.exports = requestController;
