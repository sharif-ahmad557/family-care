import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    userEmail: {
      type: String,
      required: true,
    },
    serviceId: {
      type: String,
      required: true,
    },
    serviceTitle: {
      type: String,
      required: true,
    },
    pricePerDay: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, // কত দিনের জন্য
      required: true,
      min: 1,
    },
    totalCost: {
      type: Number, // duration * pricePerDay
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    address: {
      division: String,
      district: String,
      area: String,
      details: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Booking =
  mongoose.models.Booking || mongoose.model("Booking", BookingSchema);

export default Booking;
