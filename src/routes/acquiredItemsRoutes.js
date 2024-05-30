import express from "express";
import {
  addAcquiredItem,
  deleteAcquiredItem,
  editAcquiredItem,
  getAllAcquiredItem,
  getSingleAcquiredItem,
} from "../controllers/acquiredItemsController.js";
import upload from "../middlewares/multer.js";

const acquiredItemRouter = express.Router();

acquiredItemRouter.post("/add", upload.single("picture"), addAcquiredItem);
acquiredItemRouter.put("/edit/:id", upload.single("picture"), editAcquiredItem);
acquiredItemRouter.delete("/delete/:id", deleteAcquiredItem);
acquiredItemRouter.get("/get-one/:id", getSingleAcquiredItem);
acquiredItemRouter.get("/get", getAllAcquiredItem);

export default acquiredItemRouter;
