import { Link } from 'react-router-dom'
import { FaTrashAlt, FaUserEdit } from "react-icons/fa"; // Icons for delete and edit actions
import { useEffect } from 'react';
import axios from 'axios';

export default function RecipeCard(item) {
    const recipe = item.recipe

    const handleDeletRecipe = async (id) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/recipe/delete/${id}`);
            if (response.data.success) {
                window.location.reload(); // Refresh after delete
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col">
            <Link to={`/recipe/${recipe._id}`}>

                <img src={recipe.image} alt={recipe.name} className="w-full h-40 object-cover rounded-md mb-3" />
            </Link>

            <div className="flex flex-row justify-between items-start">
                <Link to={`/recipe/${recipe._id}`}>

                    <div>
                        <h3 className="text-lg font-medium text-gray-900">{recipe.name}</h3>
                        <p className="text-gray-600">{recipe.calories}</p>
                    </div>

                </Link>

                <div className="flex flex-row items-center space-x-3">
                    {/* Edit Button */}
                    <Link to={`/edit-recipes/${recipe._id}`} className="p-2 rounded-full bg-gray-500 hover:bg-gray-600 text-white transition duration-200">
                        <FaUserEdit className="w-5 h-5" recipe={recipe} />
                    </Link>

                    {/* Delete Button */}
                    <button
                        onClick={() => handleDeletRecipe(recipe._id)}
                        className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition duration-200"
                    >
                        <FaTrashAlt className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>


    )
}