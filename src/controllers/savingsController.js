import Savings from "../models/savingsModel.js";

// Add Savings Amount
export const addSavingsController = async (req, res) => {
  try {
    const { amount } = req.body;
    const savings = new Savings({ amount });
    await savings.save();
    res
      .status(200)
      .json({ message: "savings added successfully!", payload: savings });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Problem adding Savings", error: e.message });
  }
};

// Edit Savings Amount
export const editSavingsController = async (req, res) => {
  try {
    const { amount } = req.body;
    const { id } = req.params;
    const updatedSavings = await Savings.findByIdAndUpdate(
      { _id: id },
      { amount },
      { new: true }
    );
    res.status(200).json({
      message: "savings updated successfully!",
      payload: updatedSavings,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Problem updating Savings", error: e.message });
  }
};

// Delete Savings
export const deleteSavingsController = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSavings = await Savings.findByIdAndDelete({ _id: id });
    res.status(200).json({
      message: "savings deleted successfully!",
      payload: deletedSavings,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem deleting savings", error: e.message });
  }
};

// Get Single Savings
export const getSingleSavingsController = async (req, res) => {
  try {
    const { id } = req.params;
    const savings = await Savings.findById({ _id: id });
    res.status(200).json({
      message: "savings " + savings._id + " Found successfully!",
      payload: savings,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching savings", error: e.message });
  }
};

// Get All Savings
export const getAllSavingsController = async (req, res) => {
  try {
    const savings = await Savings.find({});
    res.status(200).json({
      message: "savings Found successfully!",
      payload: savings,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching savings", error: e.message });
  }
};
