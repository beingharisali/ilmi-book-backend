// routes/Product.js
const express = require('express');
const router = express.Router();
const productController = require("../controllers/Product");

// Use cloudinary storage instead of local
const upload = require("../middleware/clodnry");

router
    .post("/", upload.single('image'), productController.create)
    .get("/", productController.getAll)
    .get("/:id", productController.getById)
    .patch("/:id", productController.updateById)
    .patch("/undelete/:id", productController.undeleteById)
    .delete("/:id", productController.deleteById);

module.exports = router;
