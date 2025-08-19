import { DeviceModel } from "../Models/Device.model.js";

// Register new device
export const registerDevice = async ({ name, type, status }) => {
  const device = new DeviceModel({
    name,
    type,
    status,
    owner_id: "a1", // TODO: Replace with real user ID from auth
  });
  await device.save();

  return {
    id: device._id,
    name: device.name,
    type: device.type,
    status: device.status,
    last_active_at: device.last_active_at,
    owner_id: device.owner_id,
  };
};

// Get devices by type/status
export const getDevices = async ({ type, status }) => {
  const filter = {};
  if (type) filter.type = type;
  if (status) filter.status = status;

  return await DeviceModel.find(filter);
};

// Update device
export const updateDevice = async (id, newData) => {
  return await DeviceModel.findByIdAndUpdate(id, newData, { new: true });
};

// Delete device
export const deleteDevice = async (id) => {
  return await DeviceModel.findByIdAndDelete(id);
};

// Record heartbeat
export const recordHeartbeat = async (id, status) => {
  const device = await DeviceModel.findById(id);
  if (!device) return null;

  device.last_active_at = new Date();
  if (status) {
    device.status = status;
  }

  await device.save();
  return device;
};
