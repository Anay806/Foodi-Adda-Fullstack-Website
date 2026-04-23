import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true

  }, items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "{roduct",
        required: true
      },
      quentity: {
        types: Number,
        required: true,
        default: 1
      },
      Price: {
        type: Number,
        required: true
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  }
}, { timestamps: true })

export const Cart = mongoose.model("Cart")

