import mongoose from "mongoose";

const careerApplicationSchema = new mongoose.Schema(
  {
    jobTitle: {
      type: String, // Solar Installation Engineer
      required: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    coverLetter: {
      type: String,
    },
    resume: {
      type: String, // file path or file URL
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Selected", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("CareerApplication", careerApplicationSchema);
