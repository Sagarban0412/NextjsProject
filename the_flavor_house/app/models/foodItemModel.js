import mongoose from "mongoose";

const FoodItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    ref:"Category",
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const FoodItem =
  mongoose.models.FoodItem || mongoose.model("FoodItem", FoodItemSchema);
export default FoodItem;


