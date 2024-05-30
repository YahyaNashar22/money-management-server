import AcquiredItem from "../models/acquiredItemsModel.js";
import removePicture from "../utils/removeMulterPicture.js";

// Add Acquired Item
export const addAcquiredItem = async (req, res) => {
  try {
    const { title, price } = req.body;
    const { filename } = req.file;
    const picture = `images/${filename}`;

    const acquiredItem = new AcquiredItem({ title, price, picture });
    await acquiredItem.save();

    res.status(200).json({
      message: "acquired item added successfully!",
      payload: acquiredItem,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem adding acquired item", error: e.message });
  }
};

// Edit Acquired Item
export const editAcquiredItem = async (req, res) => {
  try {
    const { title, price } = req.body;
    const { id } = req.params;
    const { filename } = req.file;
    const picture = filename ? `images/${filename}` : null;

    const originalAcquiredItem = await AcquiredItem.findById(id);
    if (picture) {
      removePicture(originalAcquiredItem.picture);
    }

    const acquiredItem = await AcquiredItem.findByIdAndUpdate(
      { _id: id },
      {
        title,
        price,
        picture: picture ? picture : originalAcquiredItem.picture,
      },
      { new: true }
    );

    res.status(200).json({
      message: "acquired item edited successfully!",
      payload: acquiredItem,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem editing acquired item", error: e.message });
  }
};

// Delete Acquired Item
export const deleteAcquiredItem = async (req, res) => {
  try {
    const { id } = req.params;

    const originalAcquiredItem = await AcquiredItem.findById(id);
    removePicture(originalAcquiredItem.picture);

    const acquiredItem = await AcquiredItem.findByIdAndDelete({ _id: id });

    res.status(200).json({
      message: "acquired item deleted successfully!",
      payload: acquiredItem,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem deleting acquired item", error: e.message });
  }
};

// Get Single Acquired Item
export const getSingleAcquiredItem = async (req, res) => {
  try {
    const { id } = req.params;

    const acquiredItem = await AcquiredItem.findById({ _id: id });

    res.status(200).json({
      message: "acquired item fetched successfully!",
      payload: acquiredItem,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching acquired item", error: e.message });
  }
};

// Get All Acquired Item
export const getAllAcquiredItem = async (req, res) => {
  try {
    const acquiredItems = await AcquiredItem.find({});

    res.status(200).json({
      message: "acquired items fetched successfully!",
      payload: acquiredItems,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching acquired items", error: e.message });
  }
};
