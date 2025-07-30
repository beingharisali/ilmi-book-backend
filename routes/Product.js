const express=require('express')
const productController=require("../controllers/Product")
const router=express.Router()
const multer=require("multer")
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Make sure this folder exists
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Unique file name
    }
});

// Initialize Multer with the storage configuration
const upload = multer({ storage });
router
    .post("/", upload.single('image'),productController.create)
    .get("/",express.static('uploads'),productController.getAll)
    .get("/:id",productController.getById)
    .patch("/:id",productController.updateById)
    .patch("/undelete/:id",productController.undeleteById)
    .delete("/:id",productController.deleteById)

module.exports=router