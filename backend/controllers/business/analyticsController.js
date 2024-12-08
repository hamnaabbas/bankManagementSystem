const Analytics = require("../../models/business/analyticsModel");
const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

// Set canvas dimensions for Chart.js
const chartJSNodeCanvas = new ChartJSNodeCanvas({ width: 800, height: 600 });

module.exports = {
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

      if (req.query.format === "chart") {
        // Generate chart if "format=chart" query param is passed
        const data = analytics.map((item) => ({
          label: item.name || `Analytics ${item._id}`,
          income: item.income || 0,
          expenses: item.expenses || 0,
          profit: (item.income || 0) - (item.expenses || 0),
        }));

        const chartConfig = {
          type: "bar",
          data: {
            labels: data.map((item) => item.label),
            datasets: [
              {
                label: "Income",
                data: data.map((item) => item.income),
                backgroundColor: "#36A2EB",
              },
              {
                label: "Expenses",
                data: data.map((item) => item.expenses),
                backgroundColor: "#FF6384",
              },
              {
                label: "Profit",
                data: data.map((item) => item.profit),
                backgroundColor: "#4BC0C0",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
              },
            },
          },
        };

        const chartImage = await chartJSNodeCanvas.renderToBuffer(chartConfig);
        res.set("Content-Type", "image/png");
        return res.send(chartImage);
      }

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
