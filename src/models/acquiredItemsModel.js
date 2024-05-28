import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const acquiredItemSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    picture: {
      type: String,
      required: false,
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

acquiredItemSchema.pre("save", function (next) {
  this.slug = slugify(`${this.title} ${this._id}`, { lower: true });
  next();
});

const AcquiredItem = mongoose.model("AcquiredItem", acquiredItemSchema);

export default AcquiredItem;
