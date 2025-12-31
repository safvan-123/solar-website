import mongoose from "mongoose";

const solarProductSchema = new mongoose.Schema(
  {
    badge: {
      type: String, // Popular | Best Value | Recommended
    },
    capacity: {
      type: String, // 5 kW, 10 kW
      required: true,
    },
    name: {
      type: String, // HomePower 5kW
      required: true,
    },
    subsidy: {
      type: Number, // 60000 | 78000
      required: true,
    },
    description: {
      type: String, // Ideal for 2-3 BHK homes
    },
    features: {
      type: [String], // bullet points
      required: true,
    },
    category: {
      type: String, // Residential / Commercial
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // show/hide product
    },
  },
  { timestamps: true }
);

export default mongoose.model("SolarProduct", solarProductSchema);
