import Expense from "../models/expenseModel.js";

// Add Expense
export const addExpenseController = async (req, res) => {
  try {
    const { title, price } = req.body;

    const expense = new Expense({ title, price });
    await expense.save();

    res
      .status(200)
      .json({ message: "expense added successfully!", payload: expense });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem adding expense", error: e.message });
  }
};

// Edit Expense
export const editExpenseController = async (req, res) => {
  try {
    const { title, price } = req.body;
    const { id } = req.params;

    const expense = await Expense.findByIdAndUpdate(
      { _id: id },
      { title, price },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "expense edited successfully!", payload: expense });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem editing expense", error: e.message });
  }
};

// Delete Expense
export const deleteExpenseController = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete({ _id: id });

    res
      .status(200)
      .json({ message: "expense deleted successfully!", payload: expense });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem deleting expense", error: e.message });
  }
};

// Get Single Expense
export const getSingleExpenseController = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findById({ _id: id });

    res
      .status(200)
      .json({ message: "expense fetched successfully!", payload: expense });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching expense", error: e.message });
  }
};

// Get All Expenses
export const getAllExpenseController = async (req, res) => {
  try {
    const expenses = await Expense.find({});

    res
      .status(200)
      .json({ message: "expenses fetched successfully!", payload: expenses });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching expenses", error: e.message });
  }
};
