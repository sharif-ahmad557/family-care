import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number"],
    },
    nid: {
      type: String,
      required: [true, "Please provide NID number"],
    },
    role: {
      type: String,
      default: "user",
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
