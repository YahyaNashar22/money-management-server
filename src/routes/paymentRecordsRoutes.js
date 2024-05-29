import express from "express";
import {
  addPaymentRecordController,
  deletePaymentRecordController,
  editPaymentRecordController,
  getAllPaymentRecordController,
  getSinglePaymentRecordController,
} from "../controllers/paymentRecordsController.js";

const paymentRecordsRouter = express.Router();

paymentRecordsRouter.post("/add", addPaymentRecordController);
paymentRecordsRouter.put("/edit/:id", editPaymentRecordController);
paymentRecordsRouter.delete("/delete/:id", deletePaymentRecordController);
paymentRecordsRouter.get("/get-one/:id", getSinglePaymentRecordController);
paymentRecordsRouter.get("/get", getAllPaymentRecordController);

export default paymentRecordsRouter;
