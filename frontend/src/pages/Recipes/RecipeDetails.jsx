import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiClock, FiBookmark, FiShare2 } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from 'axios';
import LoadingPage from "../auth/LoadingPage";
import ErrorPage from "../auth/ErrorPage.jsx";

export default function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipe/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        if (response.data.success) {
          setRecipe(response.data.recipe);
        }
      } catch (error) {
        setError(error.response?.data?.error || "Failed to fetch recipe details");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);



  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage message={error} />;
  if (!recipe) return <ErrorPage message="Recipe not found" />;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-700 hover:text-green-600"
          >
            <IoMdArrowRoundBack className="mr-2" />
            Back
          </button>
          <h1 className="text-xl font-semibold text-gray-800">Recipe Details</h1>
          <Link to="/profile" className="text-gray-700 hover:text-green-600">
            <CgProfile />
          </Link>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Recipe Image */}
          <div className="relative h-64 md:h-80 lg:h-96">
            <img
              src={recipe.image || '/default-recipe.jpg'}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <h1 className="text-3xl font-bold text-white">{recipe.name}</h1>
              <p className="text-gray-200">{recipe.description}</p>
            </div>
          </div>

          {/* Recipe Meta */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center text-gray-600">
                <FiClock className="mr-2" />
                <span>prep •  cook</span>
              </div>
              <div className="flex gap-3">
              
              </div>
            </div>
          </div>

          {/* Recipe Content */}
          <div className="grid md:grid-cols-2 gap-8 p-6">
            {/* Ingredients */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2"></span>
                      <span className="text-gray-700">{item.trim()}</span>
                    </li>
                  ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                Preparation Steps
              </h2>
              <ol className="space-y-4">
                {recipe.preparation.split('\n')
                  .filter(step => step.trim() !== '')
                  .map((step, index) => (
                    <li key={index} className="flex">
                      <span className="font-bold text-green-600 mr-2">{index + 1}.</span>
                      <span className="text-gray-700">{step.trim()}</span>
                    </li>
                  ))}
              </ol>
            </div>

            {/* Nutrition Facts */}
            <div className="md:col-span-2 bg-gray-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Nutrition Facts</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-xs text-center">
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="text-xl font-bold text-green-600">{recipe.calories}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-xs text-center">
                  <p className="text-sm text-gray-500">Protein</p>
                  <p className="text-xl font-bold text-green-600">{recipe.nutrition.protein}g</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-xs text-center">
                  <p className="text-sm text-gray-500">Carbs</p>
                  <p className="text-xl font-bold text-green-600">{recipe.nutrition.carbs}g</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-xs text-center">
                  <p className="text-sm text-gray-500">Fats</p>
                  <p className="text-xl font-bold text-green-600">{recipe.nutrition.fats}g</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}