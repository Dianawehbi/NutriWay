import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import axios from 'axios';
import LoadingPage from "../auth/LoadingPage";

export default function RecipeDetails() {
  const { id } = useParams(); // Get the id from the URL
  const [meal, setMeal] = useState(null); // State to store meal data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate()

  useEffect(() => {
    // Fetch meal details from API based on ID
    const fetchMealDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/recipe/${id}`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.success) {
          setMeal(response.data.recipe);
          setLoading(false);
        }
      } catch (error) {
        if (error.response && !error.response.data.success) {
          setError("Failed to fetch meal details ||" + error);
        }
        setMeal(null);
        setLoading(true);
        navigate('/recipes');
      }
    };
    fetchMealDetails();
  }, [id]);

  if (loading) {
    return <LoadingPage />;
  }


  return (
    <div className="min-h-screen flex flex-row bg-gray-100 p-6 font-serif">

      {/* Fixed Header with High z-index */}
      <div className="fixed bg-white rounded-b-2xl font-serif top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
        <div className="flex gap-3 items-center m-2">
          <Link to={'/MealsPage'}>
            <IoMdArrowRoundBack />
          </Link>
          <span>Meal Details</span>
        </div>
        <div className="flex gap-3 items-center m-2 text-black">
          <Link to={'/UserProfile'}>
            <CgProfile />
          </Link>
        </div>
      </div>

      <div className="bg-white mt-15 shadow-lg flex flex-col lg:flex-row lg:justify-around rounded-lg p-6 w-full ">
        <div>
          {/* Dynamic Image */}
          <img
            src={meal.image}  // Use the meal image from API or fallback to static image
            alt={meal.name}
            className="w-full max-w-2xl h-60 lg:h-80 object-cover rounded-md mb-4"
          />
          <h2 className="text-3xl text-[#234403] font-semibold capitalize mb-4">{meal.name}</h2>
          <p className="text-gray-700">{meal.description}</p>
          
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800">🛒 Ingredients:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {meal.ingredients.split('-' || '_').map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-5">
          <div className="mt-4">
            <h2 className="text-xl lg:text-2xl font-semibold text-[#234403]"> Preparation Steps:</h2>
            <ol className="list-decimal list-inside text-gray-700">
              {meal.preparation
                .split('\n') // Split by new line
                .filter(step => step.trim() !== "") // Remove empty lines
                .map((step, index) => (
                  <li key={index}>{step.trim()}</li> // Trim spaces
                ))}
            </ol>

          </div>
          <div className="mt-4">
            <h2 className="text-xl lg:text-2xl font-semibold text-[#234403]"> Nutritional Facts:</h2>
            <p>🍞 Carbs: {meal.nutrition.carbs}</p>
            <p>🥩 Protein: {meal.nutrition.protein}</p>
            <p>🛢️ Fats: {meal.nutrition.fats}</p>
            <p>🔥 Calories: {meal.calories}</p>
          </div>
        </div>

      </div>
    </div>
  );
}
