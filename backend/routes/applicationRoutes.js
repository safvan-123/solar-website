import express from "express";
import {
  submitApplication,
  getApplications,
  updateApplicationStatus,
  deleteApplication,
} from "../controllers/applicationController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Public
router.post("/", upload.single("resume"), submitApplication);

// Admin
router.get("/", getApplications);
router.put("/:id", updateApplicationStatus);
router.delete("/:id", deleteApplication);

export default router;
