import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { ConnectDB } from "./Config/db.js";
import AuthRoutes from "./Routes/Auth.Routes.js";
import DeviceRoutes from "./Routes/Device.Routes.js";
import LogsRoutes from "./Routes/Logs.Routes.js";
import rateLimit from "express-rate-limit";
import {autoDeactivateJob} from './Jobs/Device.Deactivate.js';

dotenv.config();

const app = express();

app.use(express.json()); // bodyParser middleware
app.use(morgan("dev"));
app.use(
  cors({
    origin: "*",
  })
);

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Too many request pls try again after a min",
});

app.use(limiter);


const PORT = process.env.PORT || 8080;

ConnectDB(); //fn responsible for db connection

app.get("/", (req, res) => {
  res.send({
    Status: "Active",
    Message: "Server Working well",
  });
});

app.use("/api", AuthRoutes); // middleware for auth routes
app.use("/api", DeviceRoutes); // middleware for Device routes
app.use("/api", LogsRoutes); // middleware for Logs routes

autoDeactivateJob();


app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
);
