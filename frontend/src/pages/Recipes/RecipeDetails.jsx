import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import img from '../../assets/avocado.jpg'
export default function RecipeDetails() {
  const meal = {
    name: 'Grilled Chicken Salad',
    image: 'path/to/meal.jpg',
    description: 'A healthy grilled chicken salad with fresh greens, cherry tomatoes, and a light vinaigrette.',
    price: '$12',
    calories: '450 kcal',
    ingredients: [
      'Grilled Chicken Breast',
      'Lettuce',
      'Cherry Tomatoes',
      'Cucumber',
      'Olive Oil',
      'Lemon Juice',
      'Salt & Pepper',
    ],
    nutrition: {
      carbs: '30g',
      protein: '40g',
      fats: '10g',
    },
    preparation: [
      'Grill the chicken breast until fully cooked.',
      'Chop the lettuce, tomatoes, and cucumber.',
      'Mix all the vegetables in a bowl.',
      'Slice the grilled chicken and add to the salad.',
      'Drizzle with olive oil and lemon juice.',
      'Season with salt and pepper.',
    ],
  };

  return (
    <div className="min-h-screen flex flex-row bg-gray-100 p-6 font-serif">

      {/* Fixed Header with High z-index */}
      <div className="fixed bg-white rounded-b-2xl font-serif  top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
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
          <img src={img} alt={meal.name} className="w-full max-w-2xl h-60 lg:h-80 object-cover rounded-md mb-4" />
          <h2 className="text-3xl text-[#234403] font-semibold  capitalize mb-4">{meal.name}</h2>
          <p className="text-gray-700">{meal.description}</p>

          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800">🛒 Ingredients:</h2>
            <ul className="list-disc list-inside text-gray-700">
              {meal.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-5">
        <div className="mt-4">
            <h2 className="text-xl lg:text-2xl font-semibold text-[#234403]"> Preparation Steps:</h2>
            <ol className="list-decimal list-inside text-gray-700">
              {meal.preparation.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          <div className="mt-4">
            <h2 className="text-xl lg:text-2xl  font-semibold text-[#234403]"> Nutritional Facts:</h2>
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
