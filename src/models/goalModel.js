import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const goalSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
      default: 0,
    },
    amount: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

goalSchema.pre("save", function (next) {
  this.slug = slugify(`${this.title} ${this._id}`, { lower: true });
  next();
});

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
