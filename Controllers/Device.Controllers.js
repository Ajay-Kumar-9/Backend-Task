import * as DeviceService from "../Services/Device.Services.js";

// Register New Device
export const RegisterDevice = async (req, res) => {
  try {
    const device = await DeviceService.registerDevice(req.body);
    res.status(201).json({
      message: "Device Registered Successfully",
      success: true,
      device,
    });
  } catch (error) {
    console.log("Error While Registering new Device", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Get Devices by type or status
export const getDevices = async (req, res) => {
  try {
  
    const { type, status } = req.query || {};

    const devices = await DeviceService.getDevices({ type, status });

    res.status(200).json({
      message: "Devices Fetched Successfully",
      success: true,
      device: devices,
    });
  } catch (error) {
    console.log("Error while Fetching Devices", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
// Update Device
export const UpdateDevice = async (req, res) => {
  try {
    const updatedDevice = await DeviceService.updateDevice(
      req.params.id,
      req.body
    );
    if (!updatedDevice) {
      return res
        .status(404)
        .json({ message: "Device not found", success: false });
    }
    res.status(200).json({
      message: "Device Updated Successfully",
      success: true,
      device: updatedDevice,
    });
  } catch (error) {
    console.log("Error while Updating Device", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Delete Device
export const DeleteDevice = async (req, res) => {
  try {
    const deleted = await DeviceService.deleteDevice(req.params.id);
    if (!deleted) {
      return res
        .status(404)
        .json({ message: "Device not found", success: false });
    }
    res
      .status(200)
      .json({ message: "Device Deleted Successfully", success: true });
  } catch (error) {
    console.log("Error while deleting Device", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};

// Record Heartbeat
export const Heartbeat = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await DeviceService.recordHeartbeat(id, status);
    if (!result) {
      return res
        .status(404)
        .json({ message: "Device not found", success: false });
    }
    res.status(200).json({
      message: "Device Heartbeat Recorded",
      success: true,
      last_active_at: result.last_active_at,
    });
  } catch (error) {
    console.log("Error while Recording Heartbeat", error.message);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
};
