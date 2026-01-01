import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import productRoutes from "./routes/productroutes/productRoutes.js";
import productCategoryRoutes from "./routes/productroutes/productcategoryRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import path from "path";

dotenv.config();
connectDB();

const app = express();
// app.use(cors());
app.use(
  cors({
    origin: [
      "https://solar-website-topaz.vercel.app/",
      "https://solar-website-ecogreen.vercel.app/",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
// app.use("/uploads", express.static("uploads"));

// app.use("/api/admin", adminRoutes);
// app.use("/api/home", homeRoutes);
// app.use("/api/about", aboutRoutes);
app.use("/api/products", productRoutes);
app.use("/api/productcategories", productCategoryRoutes);
app.use("/api/admin", adminRoutes);
// app.use("/api/projects", projectRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/contacts", contactRoutes);

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
