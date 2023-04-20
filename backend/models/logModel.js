import mongoose from "mongoose";

const logSchema = mongoose.Schema(
  {
    timestamp: {
      type: Date,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
    TransactionDescription: {
      type: String,
    },
    bloodType: {
      type: String,
    },
    bloodAmount: {
      type: String,
    },
    bloodAmountRequested: {
      type: Number,
    },
    response: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Log = mongoose.model("Log", logSchema);

export default Log;
