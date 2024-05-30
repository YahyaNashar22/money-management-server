import express from "express";
import {
  deleteUserController,
  editUserController,
  getAllUsersController,
  getSingleUserByTokenIDController,
  getSingleUserController,
  login,
  logout,
  signup,
} from "../controllers/userController.js";
import upload from "../middlewares/multer.js";

const userRoutes = express.Router();

userRoutes.post("/sign-up", upload.single("picture"), signup);
userRoutes.post("/log-in", login);
userRoutes.get("/log-out", logout);
userRoutes.get("/get-one-token/:id", getSingleUserByTokenIDController);
userRoutes.get("/get-one/:id", getSingleUserController);
userRoutes.get("/get", getAllUsersController);
userRoutes.put("/edit/:id", upload.single("picture"), editUserController);
userRoutes.delete("/delete/:id", deleteUserController);

export default userRoutes;
