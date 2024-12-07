const express = require("express");
const {
  getAllBusinessLoans,
  getBusinessLoanById,
  createBusinessLoan,
  updateBusinessLoan,
  deleteBusinessLoan,
} = require("../controllers/businessLoanController");
const router = express.Router();
router.get("/", getAllBusinessLoans);
router.get("/:id", getBusinessLoanById);
router.post("/", createBusinessLoan);
router.put("/:id", updateBusinessLoan);
router.delete("/:id", deleteBusinessLoan);
module.exports = router;
