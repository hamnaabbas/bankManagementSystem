const express = require("express");
const {
  getAllBusinessAccounts,
  getBusinessAccountById,
  createBusinessAccount,
  updateBusinessAccount,
  deleteBusinessAccount,
} = require("../controllers/businessAccountController");
const router = express.Router();
router.get("/", getAllBusinessAccounts);
router.get("/:id", getBusinessAccountById);
router.post("/", createBusinessAccount);
router.put("/:id", updateBusinessAccount);
router.delete("/:id", deleteBusinessAccount);
module.exports = router;