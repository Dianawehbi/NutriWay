import mongoose from "mongoose";

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String },
  description: { type: String },
  calories: { type: Number },
  categories: [{ type: String }],
  ingredients: { type: String },
  nutrition: {
    carbs: Number,
    protein: Number,
    fats: Number
  },
  preparation: { type: String },
  createdAt: { type: Date, default: Date.now }
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
export default Recipe;