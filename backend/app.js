require("dotenv").config(); // Load environment variables
const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpecs = require("./swaggerConfig");

const app = express();

// Connect to MongoDB
mongoose
mongoose.connect(process.env.MONGO_URI);

// Middleware for parsing JSON
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the API. Visit /api-docs for documentation.");
});

// Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Your existing route imports
const businessAccountRoutes = require("./routes/business/businessAccountRoutes");
const businessLoanRoutes = require("./routes/business/businessLoanRoutes");
const businessPayrollRoutes = require("./routes/business/businessPayrollRoutes");
const invoiceRoutes = require("./routes/business/invoiceRoutes");
const requestRoutes = require("./routes/business/requestRoutes");
const rolePermissionRoutes = require("./routes/business/rolePermissionRoutes");
const businessTransactionRoutes = require("./routes/business/businessTransactionRoutes");
const analyticsRoutes = require("./routes/business/analyticsRoutes");

// Route middleware
app.use("/analytics", analyticsRoutes);
app.use("/business-accounts", businessAccountRoutes);
app.use("/business-loans", businessLoanRoutes);
app.use("/payrolls", businessPayrollRoutes);
app.use("/invoices", invoiceRoutes);
app.use("/requests", requestRoutes);
app.use("/roles", rolePermissionRoutes);
app.use("/business-transactions", businessTransactionRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
