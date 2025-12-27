import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },

    serviceId: { type: String, required: true },
    serviceName: { type: String, required: true },
    pricePerDay: { type: Number, required: true },

    duration: { type: Number, required: true }, // কত দিন
    totalCost: { type: Number, required: true }, // মোট খরচ

    location: {
      division: { type: String, required: true },
      district: { type: String, required: true },
      area: { type: String, required: true },
      address: { type: String, required: true },
    },

    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

// মডেল এক্সপোর্ট
export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);
