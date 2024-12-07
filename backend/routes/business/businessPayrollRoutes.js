const express = require("express");
const {
  getAllPayrolls,
  getPayrollById,
  createPayroll,
  updatePayroll,
  deletePayroll,
} = require("../controllers/businessPayrollController");
const router = express.Router();
router.get("/", getAllPayrolls);
router.get("/:id", getPayrollById);
router.post("/", createPayroll);
router.put("/:id", updatePayroll);
router.delete("/:id", deletePayroll);
module.exports = router;