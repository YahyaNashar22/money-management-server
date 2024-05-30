import mongoose from "mongoose";
import slugify from "slugify";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    role: {
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

userSchema.pre("save", function (next) {
  this.slug = slugify(`${this.fullName} - ${this._id}`, { lower: true });
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
