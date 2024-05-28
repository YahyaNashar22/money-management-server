import express from "express";
import {
  addSavingsController,
  deleteSavingsController,
  editSavingsController,
  getAllSavingsController,
  getSingleSavingsController,
} from "../controllers/savingsController.js";

const savingsRouter = express.Router();

savingsRouter.post("/add", addSavingsController);
savingsRouter.put("/edit/:id", editSavingsController);
savingsRouter.delete("/delete/:id", deleteSavingsController);
savingsRouter.get("/get-one/:id", getSingleSavingsController);
savingsRouter.get("/get", getAllSavingsController);

export default savingsRouter;
