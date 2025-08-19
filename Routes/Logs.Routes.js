import { Router } from "express";
import {
  createLogs,
  getLogs,
  getDeviceUsage,
} from "../Controllers/Logs.Controllers.js";

const router = Router();

router.post("/devices/:id/logs", createLogs); //create logs
router.get("/devices/:id/logs", getLogs); //get logs
router.get("/devices/:id/usage", getDeviceUsage); //get device usage

export default router;