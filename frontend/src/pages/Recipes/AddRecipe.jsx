import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Select from "react-select";
import "leaflet/dist/leaflet.css";

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

  const [ingredient, setIngredient] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["carbs", "protein", "fats"].includes(name)) {
      setRecipe({ ...recipe, nutrition: { ...recipe.nutrition, [name]: value } });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleAddIngredient = () => {
    if (ingredient.trim()) {
      setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] });
      setIngredient("");
    }
  };

  const Options = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
    { value: "Snack", label: "Snack" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Recipe Submitted:", recipe);
    setRecipe({
      name: "",
      image: "",
      description: "",
      calories: "",
      categories: [],
      ingredients: [],
      nutrition: { carbs: "", protein: "", fats: "" },
      preparation: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-10 flex justify-center">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-2 text-green-700 font-semibold text-lg">
          <Link to="/Home" className="text-2xl"><IoMdArrowRoundBack /></Link>
          <span>Add Meal</span>
        </div>
        <Link to="/UserProfile" className="text-2xl text-green-700"><CgProfile /></Link>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">Create a New Recipe</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-5">
            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Recipe Name</label>
              <input type="text" name="name" value={recipe.name} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500" required />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Categories</label>
              <Select isMulti options={Options} onChange={(selected) => setRecipe({ ...recipe, categories: selected })} />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    // Validate type (must start with image/)
                    if (!file.type.startsWith("image/")) {
                      alert("Please upload a valid image file (jpg, png, etc).");
                      return;
                    }

                    // Validate size (less than 1MB = 1 * 1024 * 1024 bytes)
                    if (file.size > 1024 * 1024) {
                      alert("Image must be less than 1MB in size.");
                      return;
                    }

                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setRecipe({ ...recipe, image: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
              {recipe.image && (
                <div className="mt-3">
                  <img
                    src={recipe.image}
                    alt="Preview"
                    className="w-full max-h-64 object-cover rounded-xl border"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <input type="text"
                className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500" />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Calories</label>
              <input type="text" name="calories" value={recipe.calories} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500" required />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Add Ingredient</label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => setIngredient(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddIngredient();
                    }
                  }}
                  className="flex-1 p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
                />
                <button
                  type="button"
                  onClick={handleAddIngredient}
                  className="bg-green-600 text-white px-4 rounded-lg hover:bg-green-500 transition"
                >
                  Add
                </button>
              </div>

              <ul className="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                {recipe.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>{ing}</span>
                    <button
                      type="button"
                      onClick={() =>
                        setRecipe({
                          ...recipe,
                          ingredients: recipe.ingredients.filter((_, i) => i !== idx),
                        })
                      }
                      className="text-red-500 hover:text-red-700 text-xs"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-green-800 mb-2">Nutritional Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["carbs", "protein", "fats"].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 text-sm font-medium capitalize text-gray-700">{field}</label>
                    <input type="text" name={field} value={recipe.nutrition[field]} onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Add Preparation Step</label>
              <div className="flex space-x-2">
                <textarea name="preparation" value={recipe.preparation} onChange={handleChange} rows="4"
                  className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500" required />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-4">
            <button type="submit"
              className="w-full py-3 bg-green-700 text-white rounded-xl text-lg font-semibold hover:bg-green-600 transition">
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipes;
