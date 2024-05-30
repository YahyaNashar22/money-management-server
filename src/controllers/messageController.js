import Message from "../models/messageModel.js";

// Add Message
export const addMessageController = async (req, res) => {
  try {
    const { title, content } = req.body;

    const message = new Message({ title, content });
    await message.save();

    res
      .status(200)
      .json({ message: "message added successfully!", payload: message });
  } catch (e) {
    res
      .status(200)
      .json({ message: "problem adding message", error: e.message });
  }
};

// Edit Message
export const editMessageController = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.params;

    const message = await Message.findByIdAndUpdate(
      { _id: id },
      { title, content },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "message edited successfully!", payload: message });
  } catch (e) {
    res
      .status(200)
      .json({ message: "problem editing message", error: e.message });
  }
};

// Delete Message
export const deleteMessageController = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "message deleted successfully!", payload: message });
  } catch (e) {
    res
      .status(200)
      .json({ message: "problem deleting message", error: e.message });
  }
};

// Get Single Message
export const getSingleMessageController = async (req, res) => {
  try {
    const { id } = req.params;

    const message = await Message.findById({ _id: id });
    res
      .status(200)
      .json({ message: "message fetched successfully!", payload: message });
  } catch (e) {
    res
      .status(200)
      .json({ message: "problem fetching message", error: e.message });
  }
};

// Get All Message
export const getAllMessageController = async (req, res) => {
  try {
    const messages = await Message.find({});
    res
      .status(200)
      .json({ message: "messages fetched successfully!", payload: messages });
  } catch (e) {
    res
      .status(200)
      .json({ message: "problem fetching messages", error: e.message });
  }
};
