import mongoose from "mongoose";
import { Schema } from "mongoose";

const LogSchema = new Schema(
  {
    device_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Device",
      required: true,
    },
    event: {
      type: String,
      required: true,
    },

    value: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const logModel = mongoose.model("log", LogSchema);
