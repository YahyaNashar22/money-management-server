import express from "express";
import {
  addMessageController,
  deleteMessageController,
  editMessageController,
  getAllMessageController,
  getSingleMessageController,
} from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.post("/add", addMessageController);
messageRouter.put("/edit/:id", editMessageController);
messageRouter.delete("/delete/:id", deleteMessageController);
messageRouter.get("/get-one/:id", getSingleMessageController);
messageRouter.get("/get", getAllMessageController);

export default messageRouter;
