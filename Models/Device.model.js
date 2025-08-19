//Device Model 

import mongoose from "mongoose";
import { Schema } from "mongoose";

const DeviceSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    status: {
      type: String,
    },

    last_active_at: {
      type: Date,
      default: null,
    },

    owner_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const DeviceModel = mongoose.model("Device", DeviceSchema);
