const express = require("express");
const userAuthMiddlewere = require("../middleware/auth");
const expenseController = require("../controllers/expense");

const router = express.Router();

router.get(
  "/",
  userAuthMiddlewere.authentication,
  expenseController.getExpenses
);

router.delete(
  "/:id",
  userAuthMiddlewere.authentication,
  expenseController.deleteExpense
);

router.post(
  "/add-expense",
  userAuthMiddlewere.authentication,
  expenseController.postExpense
);

module.exports = router;
