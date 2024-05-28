import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const expenseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

expenseSchema.pre("save", function (next) {
  this.slug = slugify(`${this.title} ${this._id}`, { lower: true });
  next();
});

const Expense = mongoose.model("Expense", expenseSchema);

export default Expense;
