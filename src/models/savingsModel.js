import mongoose from "mongoose";

const { Schema } = mongoose;

const savingsSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Savings = mongoose.model("Savings", savingsSchema);

export default Savings;
