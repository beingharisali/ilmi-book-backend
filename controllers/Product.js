const { Schema, default: mongoose } = require("mongoose")
const Product = require("../models/Product")

exports.create = async (req, res) => {
  try {
    console.log("Incoming body:", req.body);
    const image = req.file ? req.file.filename : null;
    const {
      title,
      originalPrice,
      salePrice,
      description,
      publisher,
      language,
      pages,
      stock,
      category,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !originalPrice ||
      !salePrice ||
      !image ||
      !description ||
      !publisher ||
      !pages ||
      !stock
    ) {
      return res.status(400).json({
        message:
          "All fields (title, originalPrice, salePrice, image, description, publisher, pages, stock) are required",
      });
    }

    const created = new Product({
      title,
      originalPrice,
      salePrice,
      image,
      description,
      publisher,
      language: language || "English",
      pages,
      stock,
      category: category || "Self-Help",
    });

    await created.save();
    res.status(201).json(created);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Error adding product, please try again later",
    });
  }
};
// exports.getAll = async (req, res) => {
//     try {
//         const filter={}
//         const sort={}
//         let skip=0
//         let limit=0

//         if(req.query.brand){
//             filter.brand={$in:req.query.brand}
//         }

//         if(req.query.category){
//             filter.category={$in:req.query.category}
//         }

//         if(req.query.user){
//             filter['isDeleted']=false
//         }

//         if(req.query.sort){
//             sort[req.query.sort]=req.query.order?req.query.order==='asc'?1:-1:1
//         }

//         if(req.query.page && req.query.limit){

//             const pageSize=req.query.limit
//             const page=req.query.page

//             skip=pageSize*(page-1)
//             limit=pageSize
//         }

//         const totalDocs=await Product.find(filter).sort(sort).populate("brand").countDocuments().exec()
//         const results=await Product.find(filter).sort(sort).populate("brand").skip(skip).limit(limit).exec()

//         res.set("X-Total-Count",totalDocs)

//         res.status(200).json(results)

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message:'Error fetching products, please try again later'})
//     }
// };

exports.getAll = async (req, res) => {
  try {
    const filter = {};
    const sort = {};
    let skip = 0;
    let limit = 0;

    if (req.query.user) {
      filter.isDeleted = false;
    }

    if (req.query.sort) {
      sort[req.query.sort] = req.query.order === "desc" ? -1 : 1;
    }

    if (req.query.page) {
      const pageSize = parseInt(req.query.limit) || 12; // Default limit = 12
      const page = parseInt(req.query.page);

      skip = pageSize * (page - 1);
      limit = pageSize;
    }

    const totalDocs = await Product.find(filter).sort(sort).countDocuments().exec();
    const results = await Product.find(filter).sort(sort).skip(skip).limit(limit).exec();

    res.set("X-Total-Count", totalDocs);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products, please try again later" });
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.params
    const result = await Product.findById(id)
    res.status(200).json(result)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error getting product details, please try again later' })
  }
}
exports.updateById = async (req, res) => {
  try {
    const { id } = req.params
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true })
    res.status(200).json(updated)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating product, please try again later' })
  }
}
exports.undeleteById = async (req, res) => {
  try {
    const { id } = req.params
    const unDeleted = await Product.findByIdAndUpdate(id, { isDeleted: false }, { new: true }).populate('brand')
    res.status(200).json(unDeleted)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error restoring product, please try again later' })
  }
}

exports.deleteById = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product permanently deleted",
      deletedProduct: deleted,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error deleting product, please try again later" });
  }
};
