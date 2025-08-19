import cron from "node-cron";
import { DeviceModel } from "../Models/Device.model.js";

export const autoDeactivateJob = async () => {
  cron.schedule("0 * * * * ", async () => {
    console.log("Device deactivation start");

    const cuttOffTime = new Date(Date.now() - 24 * 60 * 60 * 1000);

    try {
      const result = await DeviceModel.updateMany(
        {
          status: "active",
          last_active_at: { $lt: cuttOffTime },
        },

        {
          $set: { status: "inactive" },
        }
      );

      console.log("Device Auto Deactivated");
    } catch (error) {
      console.log("Error in Auto Deativation Job", error.message);
    }
  });
};
