import { Router } from "express";
import {
  RegisterDevice,
  getDevices,
  UpdateDevice,
  DeleteDevice,
  Heartbeat,
} from "../Controllers/Device.Controllers.js";

import { ValidateDevice } from "../Middlewares/Validate.Device.js";
import { RegisterDeviceSchema } from "../Validations/Device.validation.js";

const router = Router();

router.post("/devices", ValidateDevice(RegisterDeviceSchema), RegisterDevice); //Register a new Device
router.get("/devices", getDevices); //Get all registered devices
router.patch("/devices/:id", UpdateDevice); //Update device details by id
router.delete("/devices/:id", DeleteDevice); // Delete a device by id
router.post("/devices/:id/heartbeat", Heartbeat); //Record device heartbeat

export default router;
