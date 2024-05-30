import Goal from "../models/goalModel.js";
import removePicture from "../utils/removeMulterPicture.js";

// Add Goal
export const addGoalController = async (req, res) => {
  try {
    const { title, progress, amount } = req.body;
    const { filename } = req.file;
    const picture = `images/${filename}`;

    const goal = new Goal({ title, progress, amount, picture });
    await goal.save();

    res
      .status(200)
      .json({ message: "goal added successfully!", payload: goal });
  } catch (e) {
    res.status(500).json({ message: "problem adding goal", error: e.message });
  }
};

// Edit Goal
export const editGoalController = async (req, res) => {
  try {
    const { title, progress, amount } = req.body;
    const { filename } = req.file;
    const picture = filename ? `images/${filename}` : null;
    const { id } = req.params;

    console.log(filename);

    const originalGoal = await Goal.findById(id);
    if (picture) {
      removePicture(originalGoal.picture);
    }

    const goal = await Goal.findByIdAndUpdate(
      { _id: id },
      {
        title,
        progress,
        amount,
        picture: picture ? picture : originalGoal.picture,
      },
      { new: true }
    );

    res
      .status(200)
      .json({ message: "goal edited successfully!", payload: goal });
  } catch (e) {
    res.status(500).json({ message: "problem editing goal", error: e.message });
  }
};

// Delete Goal
export const deleteGoalController = async (req, res) => {
  try {
    const { id } = req.params;

    const originalGoal = await Goal.findById(id);
    removePicture(originalGoal.picture);

    const goal = await Goal.findByIdAndDelete({ _id: id });

    res
      .status(200)
      .json({ message: "goal deleted successfully!", payload: goal });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem deleting goal", error: e.message });
  }
};

// Get Single Goal
export const getSingleGoalController = async (req, res) => {
  try {
    const { id } = req.params;

    const goal = await Goal.findById({ _id: id });

    res
      .status(200)
      .json({ message: "goal fetched successfully!", payload: goal });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching goal", error: e.message });
  }
};

// Get All Goal
export const getAllGoalController = async (req, res) => {
  try {
    const goals = await Goal.find({});

    res
      .status(200)
      .json({ message: "goals fetched successfully!", payload: goals });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching goals", error: e.message });
  }
};
