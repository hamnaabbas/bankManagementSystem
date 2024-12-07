const express = require("express");
const { deposit, withdraw } = require('../models/transactionService');
const router = express.Router();
const {
  validatePassword,
  checkPassword,
} = require("../middlewares/userMiddleware/userMiddlewares");
const {
  authUserProtect,
} = require("../middlewares/userMiddleware/authUsersMiddleware");

const {
  authAdminProtect,
} = require("../middlewares/adminMiddlewares/authAdminsMiddleware");

const {
  getUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  userLogin,
  updateUserStatus,
  notificationUpdate,
} = require("../controllers/usersControllers");
const {
  checkUserStatus,
} = require("../middlewares/userMiddleware/checkUserStatus");

router
  .route("/")
  .get(authAdminProtect, getUsers)
  .post(validatePassword, createUser);

router
  .route("/:id")
  .get(authUserProtect, getOneUser)
  .put(
    authUserProtect,
    checkUserStatus,
    checkPassword,
    validatePassword,
    updateUser
  )
  .delete(authAdminProtect, deleteUser);

router.route("/login").post(userLogin);

router.route("/:id/updatestatus").put(authAdminProtect, updateUserStatus);

router
  .route("/notifications/:id")
  .put(authUserProtect, checkUserStatus, notificationUpdate);
  router.post('/deposit', async (req, res) => {
    const { accountId, amount } = req.body;
    try {
      const result = await deposit(accountId, amount);
      if (result.success) {
        res.status(200).json(result.transaction);
      } else {
        res.status(400).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Withdrawal route
  router.post('/withdraw', async (req, res) => {
    const { accountId, amount } = req.body;
    try {
      const result = await withdraw(accountId, amount);
      if (result.success) {
        res.status(200).json(result.transaction);
      } else {
        res.status(400).json({ error: result.message });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
module.exports = router;
