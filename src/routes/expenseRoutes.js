import express from "express";
import {
  addExpenseController,
  deleteExpenseController,
  editExpenseController,
  getAllExpenseController,
  getSingleExpenseController,
} from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.post("/add", addExpenseController);
expenseRouter.put("/edit/:id", editExpenseController);
expenseRouter.delete("/delete/:id", deleteExpenseController);
expenseRouter.get("/get-one/:id", getSingleExpenseController);
expenseRouter.get("/get", getAllExpenseController);

export default expenseRouter;
