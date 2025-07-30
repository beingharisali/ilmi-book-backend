const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  customerInfo: {
    firstName: { type: String, required: false},
    lastName: { type: String, required: false },
    address: { type: String, required: false },
    apartment: { type: String },
    city: { type: String, required: false },
    country: { type: String, required: false },
    phone: { type: String, required: false},
  },
  items: [
    {
      bookId: { type: Schema.Types.ObjectId, ref: "Book", required: false },
      bookname:{type:String},
      quantity: { type: Number, required: false },
      price: { type: Number, required: false },
    },
  ],
  subtotal: { type: Number, required: false },
  shippingCost: { type: Number, required: false },
  total: { type: Number, required: false },
  date: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Processing", "Pending", "Dispatched", "Out for delivery", "Cancelled"],
    default: "Processing",
  },
  paymentMode: {
    type: String,
    enum: ["COD", "UPI", "CARD"],
    required: false,
  },
}, { versionKey: false });

module.exports = mongoose.model("Order", orderSchema);
