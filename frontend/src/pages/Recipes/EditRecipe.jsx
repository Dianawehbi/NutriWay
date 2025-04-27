import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Select from "react-select";
import axios from 'axios';

const EditRecipes = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    image: "",
    description: "",
    calories: "",
    categories: [],
    ingredients: "",
    nutrition: { carbs: "", protein: "", fats: "" },
    preparation: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // get recipe id from URL
  const [error, setError] = useState('');

  const Options = [
    { value: "Breakfast", label: "Breakfast" },
    { value: "Lunch", label: "Lunch" },
    { value: "Dinner", label: "Dinner" },
    { value: "Snacks", label: "Snack" },
  ];

  useEffect(() => {
    // Fetch the recipe to edit
    const fetchRecipe = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipe/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.recipe) {
          const fetchedRecipe = response.data.recipe;
          setRecipe({
            ...fetchedRecipe,
            categories: fetchedRecipe.categories || [],
            nutrition: fetchedRecipe.nutrition || { carbs: "", protein: "", fats: "" },
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load recipe.");
      }
    };
    fetchRecipe();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["carbs", "protein", "fats"].includes(name)) {
      setRecipe({ ...recipe, nutrition: { ...recipe.nutrition, [name]: value } });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/api/recipe/update/${id}`, recipe, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data.success) {
        setError('');
        navigate("/recipes");
      }
    } catch (error) {
      if (error.response && !error.response.data.success) {
        alert(error.response.data.error);
      } else {
        setError(error.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 pt-24 pb-10 flex justify-center">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm h-16 flex items-center justify-between px-6">
        <div className="flex items-center space-x-2 text-green-700 font-semibold text-lg">
          <Link to="/recipes" className="text-2xl"><IoMdArrowRoundBack /></Link>
          <span>Edit Meal</span>
        </div>
        <Link to="/UserProfile" className="text-2xl text-green-700"><CgProfile /></Link>
      </div>

      {/* Main Form Card */}
      <div className="w-full max-w-6xl bg-white shadow-md rounded-3xl p-8">
        <h1 className="text-3xl font-bold text-center text-green-800 mb-6">Edit Your Recipe</h1>

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
              <label className="block mb-1 text-sm font-medium text-gray-700">Description</label>
              <input type="text" name="description" value={recipe.description}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500" required
                onChange={handleChange} />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Calories</label>
              <input type="number" name="calories" value={recipe.calories} onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500" required />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Add Ingredient</label>
              <input type="text" name="ingredients" value={recipe.ingredients} onChange={handleChange} required
                placeholder="tomato - cucumber - bread"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Add Preparation Step</label>
              <textarea name="preparation" value={recipe.preparation} onChange={handleChange} rows="4"
                placeholder="1 - Add two cups of rice 2 - Put them..."
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500" required />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-green-800 mb-2">Nutritional Info</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {["carbs", "protein", "fats"].map((field) => (
                  <div key={field}>
                    <label className="block mb-1 text-sm font-medium capitalize text-gray-700">{field} / gram</label>
                    <input type="number" min={0} name={field} value={recipe.nutrition[field]} onChange={handleChange} required
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-green-500 focus:border-green-500" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium text-gray-700">Upload Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    if (!file.type.startsWith("image/")) {
                      alert("Please upload a valid image file.");
                      return;
                    }
                    if (file.size > 1024 * 1024 * 3) { // 3MB
                      alert("Image must be less than 3MB in size.");
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
          </div>

          {/* Submit Button */}
          <div className="col-span-1 md:col-span-2 mt-1">
            <div className="text-red-600 pb-3">{error}</div>
            <button type="submit"
              className="w-full py-3 bg-green-700 text-white rounded-xl text-lg font-semibold hover:bg-green-600 transition">
              Update Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditRecipes;
