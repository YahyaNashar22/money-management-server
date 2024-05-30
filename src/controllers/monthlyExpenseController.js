import MonthlyExpense from "../models/monthlyExpenseModel.js";

// Add Monthly Expense
export const addMonthlyExpenseController = async (req, res) => {
  try {
    const { month, expenses } = req.body;
    const monthlyExpense = new MonthlyExpense({ month, expenses });
    await monthlyExpense.save();
    res.status(200).json({
      message: "monthly expense added successfully!",
      payload: monthlyExpense,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem adding monthly expense", error: e.message });
  }
};

// Edit Monthly Expense
export const editMonthlyExpenseController = async (req, res) => {
  try {
    const { month, expenses } = req.body;
    const { id } = req.params;

    const monthlyExpense = await MonthlyExpense.findByIdAndUpdate(
      { _id: id },
      { month, expenses },
      { new: true }
    );
    res.status(200).json({
      message: "monthly expense edited successfully!",
      payload: monthlyExpense,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem editing monthly expense", error: e.message });
  }
};

// Delete Monthly Expense
export const deleteMonthlyExpenseController = async (req, res) => {
  try {
    const { id } = req.params;

    const monthlyExpense = await MonthlyExpense.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "monthly expense deleted successfully!",
      payload: monthlyExpense,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem deleting monthly expense", error: e.message });
  }
};

// Get Single Monthly Expense
export const getSingleMonthlyExpenseController = async (req, res) => {
  try {
    const { id } = req.params;

    const monthlyExpense = await MonthlyExpense.findById({ _id: id });
    res.status(200).json({
      message: "monthly expense fetched successfully!",
      payload: monthlyExpense,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching monthly expense", error: e.message });
  }
};

// Get All Monthly Expense
export const getAllMonthlyExpenseController = async (req, res) => {
  try {
    const monthlyExpenses = await MonthlyExpense.find({});
    res.status(200).json({
      message: "monthly expenses fetched successfully!",
      payload: monthlyExpenses,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching monthly expenses", error: e.message });
  }
};
