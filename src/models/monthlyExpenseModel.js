import mongoose from "mongoose";

const { Schema } = mongoose;

const monthlyExpenseSchema = new Schema(
  {
    month: {
      type: String,
      required: true,
    },
    expenses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Expense",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MonthlyExpense = mongoose.model("MonthlyExpense", monthlyExpenseSchema);
export default MonthlyExpense;
