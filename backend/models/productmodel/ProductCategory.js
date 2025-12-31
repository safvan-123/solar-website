import mongoose from "mongoose";

const productCategorySchema = new mongoose.Schema(
  {
    icon: {
      type: String, //
      required: true,
    },
    title: {
      type: String, // Power Your Home
      required: true,
      trim: true,
    },
    subtitle: {
      type: String, // Residential Solar
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true, // enable / disable from admin
    },
  },
  { timestamps: true }
);

export default mongoose.model("ProductCategory", productCategorySchema);
