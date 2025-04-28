import { Link } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IoMdSearch } from "react-icons/io";
import RecipeCard from "../../components/RecipeCard.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../auth/LoadingPage";

export default function ManageRecipes() {
    const [recLoading, setRecipeLoading] = useState(false);
    const role = JSON.parse(localStorage.getItem("user")).role;
    const [recipes, setRecipes] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
    });

    useEffect(() => {
        const fetchRecipes = async () => {
            setRecipeLoading(true);
            try {

                const response = await axios.get('http://localhost:5000/api/recipe', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    const categorizedRecipes = {
                        breakfast: [],
                        lunch: [],
                        dinner: [],
                        snacks: [],
                    };

                    response.data.recipes.forEach((rec) => {
                        // for example: if recipe has categories ["Breakfast"]
                        rec.categories.forEach((cat) => {
                            if (categorizedRecipes[cat.toLowerCase()]) {
                                categorizedRecipes[cat.toLowerCase()].push(rec);
                            }
                        });
                    });

                    setRecipes(categorizedRecipes);
                }
            } catch (error) {
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setRecipeLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    return (
        <>
            {recLoading ? (
                <LoadingPage />
            ) : (
                <div className="min-h-screen flex flex-row bg-gray-100 p-6 font-serif">
                    {/* Header */}
                    <div className="fixed bg-white rounded-b-2xl font-serif top-0 right-0 left-0 flex justify-between p-3 border-t-2 border-gray-300 text-2xl h-16 z-20 shadow-md">
                        <div className="flex gap-3 items-center m-2">
                            {role == "admin" &&
                                <Link to={'/AdminDashboard'}>
                                    <IoMdArrowRoundBack />
                                </Link>
                            }
                            {role == "client" &&
                                <Link to={'/ClientDashboard'}>
                                    <IoMdArrowRoundBack />
                                </Link>
                            }
                            {role == "dietitian" &&
                                <Link to={'/DietitianDashboard'}>
                                    <IoMdArrowRoundBack />
                                </Link>
                            }
                            <span>Meals</span>
                        </div>
                        <div className="flex gap-3 items-center m-2 text-black">
                            <IoMdSearch />
                            <Link to={'/UserProfile'}>
                                <CgProfile />
                            </Link>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col mt-12 items-start px-3 pt-3 space-y-4 w-full overflow-hidden">
                        {(role == "admin" || role == "dietitian") &&
                            <Link
                                to="/add-recipes"
                                className="inline-block px-6 py-3 text-white font-semibold bg-green-600 rounded-2xl shadow-md hover:bg-green-700 transition duration-200"
                            >
                                Add Meal
                            </Link>
                        }

                        <div className="flex flex-col space-x-3 overflow-auto max-w-full">
                            {Object.entries(recipes).map(([category, items]) => (
                                <div key={category} className="mb-8">
                                    <h2 className="text-2xl text-[#234403] font-semibold capitalize mb-4">{category}</h2>
                                    <div className="flex flex-row space-x-3 overflow-auto max-w-full">
                                        {items.length > 0 ? (
                                            items.map((item) => (
                                                <div key={item._id} className="min-w-70">
                                                    <RecipeCard recipe={item} role={role} />
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-gray-500">No recipes found.</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
