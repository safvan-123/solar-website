import express from "express";
import {
  submitContactMessage,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
} from "../controllers/contactController.js";

const router = express.Router();

// Public
router.post("/", submitContactMessage);

// Admin
router.get("/", getContactMessages);
router.put("/:id", updateContactStatus);
router.delete("/:id", deleteContactMessage);

export default router;
