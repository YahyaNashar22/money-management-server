import express from "express";
import {
  addGoalController,
  deleteGoalController,
  editGoalController,
  getAllGoalController,
  getSingleGoalController,
} from "../controllers/goalController.js";
import upload from "../middlewares/multer.js";

const goalRouter = express.Router();

goalRouter.post("/add", upload.single("picture"), addGoalController);
goalRouter.put("/edit/:id", upload.single("picture"), editGoalController);
goalRouter.delete("/delete/:id", deleteGoalController);
goalRouter.get("/get-one/:id", getSingleGoalController);
goalRouter.get("/get", getAllGoalController);

export default goalRouter;
