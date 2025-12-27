import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    nid: {
      type: String,
      required: [true, "NID is required"],
    },
    role: {
      type: String,
      default: "user", // ভবিষ্যতে admin রোল দেওয়ার জন্য কাজে লাগবে
    },
  },
  { timestamps: true }
);

// মডেলটি যদি আগে থেকে থাকে তবে সেটিই ব্যবহার করো, না থাকলে নতুন বানাও
export const User = mongoose.models.User || mongoose.model("User", UserSchema);
