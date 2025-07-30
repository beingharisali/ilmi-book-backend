const mongoose=require("mongoose")
const {Schema}=mongoose

const productSchema = new Schema({
    title: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      default: "English",
    },
    pages: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      default: "Self-Help",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    }
  }, {
    timestamps: true,
    versionKey: false,
  });
  

module.exports=mongoose.model('Product',productSchema)