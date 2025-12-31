import express from "express";
import { loginAdmin } from "../controllers/adminController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get("/profile", protect, (req, res) => {
  res.json({
    _id: req.admin._id,
    email: req.admin.email,
    name: req.admin.email.split("@")[0],
    createdAt: req.admin.createdAt,
  });
});

export default router;
