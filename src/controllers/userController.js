import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import removePicture from "../utils/removeMulterPicture.js";
import { createToken, verifyToken } from "../utils/token.js";

// Sign up
export const signup = async (req, res) => {
  try {
    const { userName, fullName, password } = req.body;
    const { filename } = req.file;
    const picture = filename ? `images/${filename}` : null;

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const user = new User({
      userName,
      fullName,
      password: hash,
      profilePicture: picture,
    });
    await user.save();

    const token = createToken(user);
    const decoded = verifyToken(token);
    res
      .status(201)
      .cookie("userToken", token, {
        secure: true,
        httpOnly: true,
        sameSite: "None",
      })
      .json({ message: "sign up successful!", payload: decoded });
  } catch (e) {
    res.status(500).json({ message: "problem signing up", error: e.message });
  }
};

// Log in
export const login = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ userName });
  if (!user) {
    return res.status(404).send("user not found");
  } else {
    try {
      if (await bcrypt.compare(password, user.password)) {
        const token = createToken(user);
        const decoded = verifyToken(token);
        return res
          .cookie("userToken", token, {
            secure: true,
            httpOnly: true,
            sameSite: "None",
          })
          .status(201)
          .json({ message: "user logged in successfully!", payload: decoded });
      }
      return res.status(400).send("wrong credential");
    } catch (e) {
      res.status(500).json({ message: "problem signing in", error: e.message });
    }
  }
};

// Log out
export const logout = (req, res) => {
  Object.keys(req.cookies).forEach((cookieName) => {
    // Clear each cookie by setting its value to null and setting an expired date
    res.clearCookie(cookieName);
  });
  return res
    .clearCookie("userToken")
    .status(201)
    .send("successfully logged out!");
};

// Get Single User By Token ID
export const getSingleUserByTokenIDController = async (req, res) => {
  const token = req.cookies.userToken;
  const decoded = verifyToken(token);
  const id = decoded.data ? decoded.data.id : undefined;

  try {
    if (!id) {
      return res.status(401).json({ message: "Token not found!" });
    }
    const user = await User.findById(id);

    if (user) {
      return res.status(200).json({ message: "user found!", payload: user });
    } else {
      return res.status(404).json({ message: "user not found" });
    }
  } catch (e) {
    res
      .status(404)
      .json({ message: "problem fetching user", error: e.message });
  }
};

// Get Single User By ID
export const getSingleUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById({ _id: id });

    res
      .status(200)
      .json({ message: "user fetched successfully!", payload: user });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem fetching user", error: e.message });
  }
};

// Get All Users
export const getAllUsersController = async (req, res) => {
  try {
    const users = await User.find({});
    return res
      .status(200)
      .json({ message: "users fetched successfully", payload: users });
  } catch (e) {
    res
      .status(400)
      .json({ message: "problem fetching users", error: e.message });
  }
};

// Edit User
export const editUserController = async (req, res) => {
  try {
    const { userName, fullName, password } = req.body;
    const { id } = req.params;
    const { filename } = req.file;
    const picture = filename ? `images/${filename}` : null;

    const originalUser = await User.findById(id);
    if (picture) {
      originalUser.profilePicture && removePicture(originalUser.profilePicture);
    }
    let hash = originalUser.password;

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        userName,
        fullName,
        password: hash,
        profilePicture: picture,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "user edited successfully!", payload: user });
  } catch (e) {
    res.status(500).json({ message: "problem editing user", error: e.message });
  }
};

// Delete User
export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const originalUser = await User.findById(id);
    removePicture(originalUser.profilePicture);

    const user = await User.findByIdAndDelete({ _id: id });
    res
      .status(200)
      .json({ message: "user deleted successfully!", payload: user });
  } catch (e) {
    res
      .status(500)
      .json({ message: "problem deleting user", error: e.message });
  }
};
