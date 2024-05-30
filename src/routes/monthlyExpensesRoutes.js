import express from "express";
import {
  addMonthlyExpenseController,
  deleteMonthlyExpenseController,
  editMonthlyExpenseController,
  getAllMonthlyExpenseController,
  getSingleMonthlyExpenseController,
} from "../controllers/monthlyExpenseController.js";

const monthlyExpenseRouter = express.Router();

monthlyExpenseRouter.post("/add", addMonthlyExpenseController);
monthlyExpenseRouter.put("/edit/:id", editMonthlyExpenseController);
monthlyExpenseRouter.delete("/delete/:id", deleteMonthlyExpenseController);
monthlyExpenseRouter.get("/get-one/:id", getSingleMonthlyExpenseController);
monthlyExpenseRouter.get("/get", getAllMonthlyExpenseController);

export default monthlyExpenseRouter;
