const Expense = require("../models/expense");

exports.getExpenses = async (req, res, next) => {
  try {
    const allExpenses = await req.user.getExpenses();
    return res
      .status(200)
      .json({ message: "Data Fetched Successfully", expenses: allExpenses });
  } catch (error) {
    res.status(404).json({ message: "unable to load expenses" });
  }
};

exports.postExpense = async (req, res, next) => {
  try {
    const { amount, description, category } = req.body;
    await req.user.createExpense({ amount, description, category });
    return res
      .status(200)
      .json({ message: "Expense Added", expense: { ...req.body } });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const expenseId = req.params.id;
    await req.user.getExpenses({ where: { id: expenseId } }).then((expense) => {
      let expenseToBeDeleted = expense[0];
      expenseToBeDeleted.destroy();
      res.status(200).json({ message: "Item deleted successfully!" });
    });
  } catch (error) {
    res.status(500).json({ message: "failed to delete the Expense!" });
  }
};
