import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";

const DietitianAddRecipePage = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    calories: "",
    ingredients: [],
    nutrition: {
      carbs: "",
      protein: "",
      fats: "",
    },
    preparation: [],
  });

  const [ingredient, setIngredient] = useState("");
  const [step, setStep] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "carbs" || name === "protein" || name === "fats") {
      setRecipe({
        ...recipe,
        nutrition: { ...recipe.nutrition, [name]: value },
      });
    } else {
      setRecipe({ ...recipe, [name]: value });
    }
  };

  const handleAddIngredient = () => {
    if (ingredient) {
      setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] });
      setIngredient("");
    }
  };

  const handleAddStep = () => {
    if (step) {
      setRecipe({ ...recipe, preparation: [...recipe.preparation, step] });
      setStep("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Log the recipe data (you can replace this with an API call to save it)
    console.log("Recipe Submitted:", recipe);
    // Reset the form after submission
    setRecipe({
      name: "",
      image: "",
      description: "",
      price: "",
      calories: "",
      ingredients: [],
      nutrition: {
        carbs: "",
        protein: "",
        fats: "",
      },
      preparation: [],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      {/* Fixed Header with High z-index */}
      <div className="fixed rounded-b-2xl font-serif bg-white top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
        <div className="flex gap-3 items-center m-2">
          <Link to={'/Home'}>
            <IoMdArrowRoundBack />
          </Link>
          <span>Add Meal</span>
        </div>
        <div className="flex gap-3 items-center m-2 text-black">
          <Link to={'/UserProfile'}>
            <CgProfile />
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-lg rounded-lg p-6 w-full my-15 mx-4">
        <h1 className="text-3xl font-extrabold text-[#234403] mb-4 text-center">
          Add New Recipe
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col xl:flex-row xl:justify-between xl:gap-10">
            <div className="xl:w-6/12">
              {/* Recipe Name */}
              <div>
                <label htmlFor="name" className="block text-lg font-medium mb-2">
                  Recipe Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={recipe.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Recipe Image */}
              <div>
                <label htmlFor="image" className="block text-lg font-medium mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={recipe.image}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-lg font-medium mb-2">
                  Recipe Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={recipe.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  rows="4"
                  required
                />
              </div>

              {/* Calories */}
              <div>
                <label htmlFor="calories" className="block text-lg font-medium mb-2">
                  Calories
                </label>
                <input
                  type="text"
                  id="calories"
                  name="calories"
                  value={recipe.calories}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  required
                />
              </div>

              {/* Ingredients */}
              <div>
                <label htmlFor="ingredient" className="block text-lg font-medium mb-2">
                  Add Ingredient
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="ingredient"
                    value={ingredient}
                    onChange={(e) => setIngredient(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="bg-green-700 text-white p-3 rounded-md"
                  >
                    Add
                  </button>
                </div>
                <ul className="list-disc list-inside mt-4 text-gray-700">
                  {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="xl:w-6/12">
              {/* Nutritional Facts */}
              <div>
                <h2 className="text-xl font-semibold text-[#234403] mb-4">Nutritional Facts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="carbs" className="block text-lg font-medium mb-2">
                      Carbs
                    </label>
                    <input
                      type="text"
                      id="carbs"
                      name="carbs"
                      value={recipe.nutrition.carbs}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="protein" className="block text-lg font-medium mb-2">
                      Protein
                    </label>
                    <input
                      type="text"
                      id="protein"
                      name="protein"
                      value={recipe.nutrition.protein}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div>
                    <label htmlFor="fats" className="block text-lg font-medium mb-2">
                      Fats
                    </label>
                    <input
                      type="text"
                      id="fats"
                      name="fats"
                      value={recipe.nutrition.fats}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>
              </div>

              {/* Preparation Steps */}
              <div>
                <label htmlFor="step" className="block text-lg font-medium mb-2">
                  Add Preparation Step
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="step"
                    value={step}
                    onChange={(e) => setStep(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                  />
                  <button
                    type="button"
                    onClick={handleAddStep}
                    className="bg-green-700 text-white p-3 rounded-md"
                  >
                    Add
                  </button>
                </div>
                <ol className="list-decimal list-inside mt-4 text-gray-700">
                  {recipe.preparation.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full p-3 bg- bg-green-700 text-white font-semibold rounded-md hover:bg-green-600"
            >
              Submit Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DietitianAddRecipePage;
