import mongoose from "mongoose";

const AccessSchema = new mongoose.Schema(
  {
    file: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "File",
      required: true,
    },
    sharedWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    permissions: {
      type: String,
      enum: ["read", "write"],
      default: "read",
    },
  },
  { timestamps: true }
);

export const Access = mongoose.model("Access", AccessSchema);
