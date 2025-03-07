import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import image from '../../assets/headerpicture.jpg';

// Sample Recipe Data
const recipes = [
  {
    id: 1,
    title: "Healthy Avocado Toast",
    description: "A delicious and nutritious breakfast option.",
    image: "",
    category: "Breakfast",
    calories: 250,
    ingredients: ["1 Avocado", "2 Slices of Bread", "Salt", "Pepper"],
    instructions: "Mash avocado and spread on toast, season with salt and pepper."
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    description: "A light and healthy lunch option.",
    image: "https://example.com/chicken-salad.jpg",
    category: "Lunch",
    calories: 350,
    ingredients: ["Chicken Breast", "Mixed Greens", "Olive Oil", "Lemon"],
    instructions: "Grill the chicken, mix with greens and dress with olive oil and lemon."
  },
  {
    id: 2,
    title: "Grilled Chicken Salad",
    description: "A light and healthy lunch option.",
    image: "https://example.com/chicken-salad.jpg",
    category: "Lunch",
    calories: 350,
    ingredients: ["Chicken Breast", "Mixed Greens", "Olive Oil", "Lemon"],
    instructions: "Grill the chicken, mix with greens and dress with olive oil and lemon."
  },  {
    id: 2,
    title: "Grilled Chicken Salad",
    description: "A light and healthy lunch option.",
    image: "https://example.com/chicken-salad.jpg",
    category: "Lunch",
    calories: 350,
    ingredients: ["Chicken Breast", "Mixed Greens", "Olive Oil", "Lemon"],
    instructions: "Grill the chicken, mix with greens and dress with olive oil and lemon."
  },
  // Add more recipes as needed
];

export default function RecipeSection() {
  const [filter, setFilter] = useState("All");

  const filteredRecipes = filter === "All" ? recipes : recipes.filter(recipe => recipe.category === filter);

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className=" py-12 px-6 w-full"
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-green-700">Explore Recipes</h2>
        <div className="mt-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border p-2 rounded-md"
          >
            <option value="All">All</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredRecipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <img src={image} alt={recipe.title} className="w-full h-48 object-cover rounded-lg mb-4" />
            <h3 className="text-xl font-bold text-green-700 mb-2">{recipe.title}</h3>
            <p className="text-gray-600 mb-4">{recipe.description}</p>
            <Link to={`/recipes/${recipe.id}`}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
              >
                View Recipe
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
