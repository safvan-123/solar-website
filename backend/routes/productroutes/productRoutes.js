import express from "express";
import {
  createSolarProduct,
  getSolarProducts,
  updateSolarProduct,
  deleteSolarProduct,
} from "../../controllers/productcontroller/productController.js";

const router = express.Router();

// Create + Get all solar products
router.route("/").post(createSolarProduct).get(getSolarProducts);

// Update + Delete solar product by ID
router.route("/:id").put(updateSolarProduct).delete(deleteSolarProduct);

export default router;
