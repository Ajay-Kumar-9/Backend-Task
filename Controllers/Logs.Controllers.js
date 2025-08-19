import {
  createLogService,
  getLogsService,
  getDeviceUsageService,
} from "../Services/Logs.services.js";

// Create Log
export const createLogs = async (req, res) => {
  try {
    const { id } = req.params;
    const { event, value } = req.body;

    if (!event || typeof value !== "number") {
      return res.status(400).json({
        message: "Event and numeric value are required",
        success: false,
      });
    }

    const log = await createLogService(id, event, value);

    res.status(201).json({
      message: "Log Created",
      log,
      success: true,
    });
  } catch (error) {
    console.log("Error while creating log:", error.message);
    res.status(500).json({ message: error.message, success: false });
  }
};

// Get Logs
export const getLogs = async (req, res) => {
  try {
    const { id } = req.params;
    const limit = parseInt(req.query.limit) || 10;

    const logs = await getLogsService(id, limit);

    if (!logs.length) {
      return res
        .status(404)
        .json({ message: "Logs not found", success: false });
    }

    res.status(200).json({
      message: "Logs fetched successfully",
      success: true,
      logs,
    });
  } catch (error) {
    console.log("Error while fetching logs:", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Get Device Usage
export const getDeviceUsage = async (req, res) => {
  try {
    const { id } = req.params;
    const range = req.query.range || "24h";

    let hours = 24;
    if (range.endsWith("h")) {
      hours = parseInt(range.replace("h", ""));
    }

    const usage = await getDeviceUsageService(id, hours);

    res.status(200).json({
      message: "Usage fetched successfully",
      success: true,
      range: `${hours}h`,
      usage,
    });
  } catch (error) {
    console.log("Error fetching usage data:", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
