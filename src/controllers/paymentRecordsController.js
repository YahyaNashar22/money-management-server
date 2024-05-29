import PaymentRecords from "../models/paymentRecordsModel.js";

// Add Payment Record
export const addPaymentRecordController = async (req, res) => {
  try {
    const { amount, date, description } = req.body;

    const paymentRecord = new PaymentRecords({ amount, date, description });
    await paymentRecord.save();

    res.status(200).json({
      message: "payment record added successfully!",
      payload: paymentRecord,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem adding payment record", error: e.message });
  }
};

// Edit Payment Record
export const editPaymentRecordController = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, date, description } = req.body;

    const paymentRecord = await PaymentRecords.findByIdAndUpdate(
      { _id: id },
      { amount, date, description },
      { new: true }
    );

    res.status(200).json({
      message: "payment record edited successfully!",
      payload: paymentRecord,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem editing payment record", error: e.message });
  }
};

// Delete Payment Record
export const deletePaymentRecordController = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentRecord = await PaymentRecords.findByIdAndDelete({ _id: id });

    res.status(200).json({
      message: "payment record deleted successfully!",
      payload: paymentRecord,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem deleted payment record", error: e.message });
  }
};

// Get Single Payment Record
export const getSinglePaymentRecordController = async (req, res) => {
  try {
    const { id } = req.params;

    const paymentRecord = await PaymentRecords.findById({ _id: id });

    res.status(200).json({
      message: "payment record fetched successfully!",
      payload: paymentRecord,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching payment record", error: e.message });
  }
};

// Get All Payment Record
export const getAllPaymentRecordController = async (req, res) => {
  try {
    const paymentRecords = await PaymentRecords.find({});

    res.status(200).json({
      message: "payment records fetched successfully!",
      payload: paymentRecords,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching payment records", error: e.message });
  }
};
