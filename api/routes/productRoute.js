const express = require("express");
const {
  handleImageUpload,
  addProduct,
  getProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductBySlug,
} = require("../services/productService");
const { upload } = require("../utils/cloudinary");
const {
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
  getProductValidator,
} = require("../utils/validator/productValidator");

const router = express.Router();

router.route("/").post(createProductValidator, addProduct).get(getAllProducts);
router.route("/slug/:slug").get(getProductBySlug);
router
  .route("/:id")
  .get(getProductValidator, getProduct)
  .put(updateProductValidator, updateProduct)
  .delete(deleteProductValidator, deleteProduct);
router.post("/upload-image", upload.single("file"), handleImageUpload);

module.exports = router;
