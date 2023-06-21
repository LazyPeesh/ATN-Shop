import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  createProducts,
  updateProduct,
  deleteProduct,
  createdProductReview,
  getTopProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getProducts).post(protect, admin, createProducts);
router.get("/top", getTopProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, createdProductReview);

export default router;

