import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: false,
      required: false,
    },
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    bloodType: {
      type: String,
      required: true,
    },
    donationDate: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);

const User = mongoose.model("User", userSchema);

export default User;
