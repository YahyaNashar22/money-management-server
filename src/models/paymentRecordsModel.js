import mongoose from "mongoose";

const { Schema } = mongoose;

const paymentRecordsSchema = new Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PaymentRecords = mongoose.model("PaymentRecords", paymentRecordsSchema);

export default PaymentRecords;
