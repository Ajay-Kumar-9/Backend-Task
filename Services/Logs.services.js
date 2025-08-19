import { logModel } from "../Models/Logs.model.js";
import { DeviceModel } from "../Models/Device.model.js";
import mongoose from "mongoose";

// Create a log
export const createLogService = async (deviceId, event, value) => {
  const device = await DeviceModel.findById(deviceId);
  if (!device) throw new Error("Device not found");

  const log = new logModel({
    device_id: deviceId,
    event,
    value,
    timestamp: new Date(), // Optional if schema already adds default
  });

  await log.save();
  return log;
};

// Fetch logs
export const getLogsService = async (deviceId, limit = 10) => {
  return await logModel
    .find({ device_id: deviceId })
    .sort({ timestamp: -1 })
    .limit(limit);
};


export const getDeviceUsageService = async (deviceId, hours = 24) => {
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);

  const usage = await logModel.aggregate([
    {
      $match: {
        device_id: new mongoose.Types.ObjectId(deviceId),
        event: "units_consumed",
        createdAt: { $gte: since },  // <-- Correct field here
      },
    },
    {
      $group: {
        _id: null,
        total_units: { $sum: "$value" },
      },
    },
  ]);

  return usage.length ? usage[0].total_units : 0;
};

