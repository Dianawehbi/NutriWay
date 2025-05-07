import { Link } from "react-router-dom";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../auth/LoadingPage";
import RecipeCard from "../../components/RecipeCard";
import AdminNavBar from "../../components/Admin/AdminNavBar";
import DietitianNavBar from "../../components/Dietitian/NavBar";
import ClientNavbar from "../../components/Client/NavBar";
import EmptyState from "../../components/EmptyState";

export default function ManageRecipes() {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const [recipes, setRecipes] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
    });
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/recipe', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.success) {
                    const categorizedRecipes = {
                        breakfast: [],
                        lunch: [],
                        dinner: [],
                        snack: [],
                    };

                    response.data.recipes.forEach((recipe) => {
                        recipe.categories.forEach((category) => {
                            const lowerCategory = category.toLowerCase();
                            if (categorizedRecipes[lowerCategory]) {
                                categorizedRecipes[lowerCategory].push(recipe);
                            }
                        });
                    });

                    setRecipes(categorizedRecipes);
                }
            } catch (error) {
                console.error("Error fetching recipes:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const filterRecipes = (category) => {
        const categoryRecipes = category === "all" 
            ? Object.values(recipes).flat() 
            : recipes[category] || [];

        return searchTerm 
            ? categoryRecipes.filter(recipe =>
                recipe.name.toLowerCase().includes(searchTerm.toLowerCase()))
            : categoryRecipes;
    };

    const categories = [
        { id: "all", name: "All Recipes" },
        { id: "breakfast", name: "Breakfast" },
        { id: "lunch", name: "Lunch" },
        { id: "dinner", name: "Dinner" },
        { id: "snack", name: "Snacks" }
    ];

    const renderNavBar = () => {
        switch (user?.role) {
            case "admin": return <AdminNavBar />;
            case "dietitian": return <DietitianNavBar />;
            case "client": return <ClientNavbar />;
            default: return null;
        }
    };

    const canAddRecipes = ["admin", "dietitian"].includes(user?.role);
    const filteredRecipes = filterRecipes(activeCategory);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {renderNavBar()}

            <main className="flex-1 p-6 md:p-8 pt-20">
                {loading ? (
                    <LoadingPage />
                ) : (
                    <div className="space-y-6">
                        {/* Header Section */}
                        <div className="flex mt-18 flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Recipe Management</h1>
                                <p className="text-gray-600">Browse and manage nutrition recipes</p>
                            </div>

                            {canAddRecipes && (
                                <Link
                                    to="/add-recipes"
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-sm"
                                >
                                    <FiPlus className="text-lg" />
                                    <span>Add Recipe</span>
                                </Link>
                            )}
                        </div>

                        {/* Search and Filter Section */}
                        <div className="space-y-4">
                            <div className="relative">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search recipes..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                />
                            </div>

                            <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-hide">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                            activeCategory === category.id
                                                ? "bg-green-600 text-white shadow-md"
                                                : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recipes Grid */}
                        <div className="space-y-6">
                            {filteredRecipes.length === 0 ? (
                                <EmptyState
                                    title="No recipes found"
                                    description={searchTerm 
                                        ? "Try a different search term" 
                                        : "No recipes available in this category"}
                                />
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredRecipes.map((recipe) => (
                                        <RecipeCard 
                                            key={recipe._id} 
                                            recipe={recipe} 
                                            role={user?.role} 
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}