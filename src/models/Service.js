import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true, 
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    features: {
      type: [String], 
    },
  },
  { timestamps: true }
);

const Service =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);

export default Service;
