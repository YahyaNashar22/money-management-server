import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import { dbConnection } from "./configs/dbConnection.js";

import savingsRouter from "./routes/savingsRoutes.js";
import paymentRecordsRouter from "./routes/paymentRecordsRoutes.js";

dotenv.config();

// Declarations
const uri = process.env.MONGO_URI;
const port = process.env.PORT;
const app = express();

// CORS policies
app.use(cors());

// Essential middlewares
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("images"));

// Routes
app.use("/savings", savingsRouter);
app.use("/payment-records", paymentRecordsRouter);

dbConnection(uri, port, app);
