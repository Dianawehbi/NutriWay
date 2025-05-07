import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiPlus, FiX } from "react-icons/fi";
import Select from "react-select";
import axios from 'axios';
import { handleImageUpload } from "../../utils/imageUtils";

const AddRecipes = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    image: "",
    description: "",
    calories: "",
    categories: [],
    ingredients: [],
    nutrition: { carbs: "", protein: "", fats: "" },
    preparation: "",
  });

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["carbs", "protein", "fats"].includes(name)) {
      setRecipe({ ...recipe, nutrition: { ...recipe.nutrition, [name]: value } });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const Options = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
    { value: "Snack", label: "Snack" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/recipe/add', recipe, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        navigate("/recipes");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Something went wrong");
    }
  };

  const onImageChange = async (e) => {
    const resizedImage = await handleImageUpload(e.target.files);
    if (resizedImage) {
      setRecipe({ ...recipe, image: resizedImage });
    }
  };

  const addIngredient = () => {
    if (currentIngredient.trim() === "") return;
    
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, currentIngredient.trim()]
    });
    
    setCurrentIngredient("");
  };

  const removeIngredient = (index) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients.splice(index, 1);
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-10 flex justify-center">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-2 text-green-700 font-semibold text-lg">
          <Link to="/recipes" className="text-2xl"><IoMdArrowRoundBack /></Link>
          <span>Add Meal</span>
        </div>
        <Link to="/UserProfile" className="text-2xl text-green-700"><CgProfile /></Link>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-3xl bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center text-green-800 mb-6">Create New Recipe</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Recipe Name*</label>
              <input
                type="text"
                name="name"
                value={recipe.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Categories</label>
              <Select
                isMulti
                options={Options}
                value={Options.filter((option) => recipe.categories.includes(option.value))}
                onChange={(selected) =>
                  setRecipe({ ...recipe, categories: selected.map((option) => option.value) })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Description*</label>
              <textarea
                name="description"
                value={recipe.description}
                onChange={handleChange}
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          {/* Ingredients */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Ingredients*</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={currentIngredient}
                onChange={(e) => setCurrentIngredient(e.target.value)}
                placeholder="Add ingredient (e.g. 2 cups flour)"
                className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                onKeyPress={(e) => e.key === 'Enter' && addIngredient()}
              />
              <button
                type="button"
                onClick={addIngredient}
                className="px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                <FiPlus className="text-xl" />
              </button>
            </div>
            
            <div className="border rounded-lg divide-y">
              {recipe.ingredients.length > 0 ? (
                recipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="p-3 flex justify-between items-center">
                    <span>{ingredient}</span>
                    <button
                      type="button"
                      onClick={() => removeIngredient(index)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <FiX />
                    </button>
                  </div>
                ))
              ) : (
                <div className="p-3 text-gray-400 text-center">
                  No ingredients added yet
                </div>
              )}
            </div>
          </div>

          {/* Nutrition */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Calories*</label>
              <input
                type="number"
                name="calories"
                value={recipe.calories}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Carbs (g)*</label>
              <input
                type="number"
                name="carbs"
                value={recipe.nutrition.carbs}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Protein (g)*</label>
              <input
                type="number"
                name="protein"
                value={recipe.nutrition.protein}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Fats (g)*</label>
              <input
                type="number"
                name="fats"
                value={recipe.nutrition.fats}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>
          </div>

          {/* Preparation */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Preparation Steps*</label>
            <textarea
              name="preparation"
              value={recipe.preparation}
              onChange={handleChange}
              rows="5"
              placeholder="1. First step...\n2. Second step..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Recipe Image*</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={onImageChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
            {recipe.image && (
              <div className="mt-3">
                <img
                  src={recipe.image}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
          >
            Save Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipes;