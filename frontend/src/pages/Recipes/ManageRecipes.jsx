import { Link } from "react-router-dom";
import { FiPlus, FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingPage from "../auth/LoadingPage";
import RecipeCard from "../../components/RecipeCard.jsx";
import AdminNavBar from "../../components/Admin/AdminNavBar.jsx";
import DietitianNavBar from "../../components/Dietitian/NavBar.jsx";
import ClientNavbar from "../../components/Client/NavBar.jsx";
import EmptyState from "../../components/EmptyState.jsx";

export default function ManageRecipes() {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [activeCategory, setActiveCategory] = useState("all");
    const user = JSON.parse(localStorage.getItem("user"));
    const [recipes, setRecipes] = useState({
        breakfast: [],
        lunch: [],
        dinner: [],
        snacks: [],
    });

    useEffect(() => {
        const fetchRecipes = async () => {
            setLoading(true);
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
                alert(error.response?.data?.error || "Failed to load recipes");
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    const filteredRecipes = (category) => {
        if (searchTerm) {
            return recipes[category]?.filter(recipe => 
                recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
            ) || [];
        }
        return recipes[category] || [];
    };

    const allRecipes = Object.values(recipes).flat();

    const categories = [
        { id: "all", name: "All Recipes" },
        { id: "breakfast", name: "Breakfast" },
        { id: "lunch", name: "Lunch" },
        { id: "dinner", name: "Dinner" },
        { id: "snacks", name: "Snacks" }
    ];

    const renderNavBar = () => {
        switch(user?.role) {
            case "admin": return <AdminNavBar />;
            case "dietitian": return <DietitianNavBar />;
            case "client": return <ClientNavbar />;
            default: return null;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {renderNavBar()}
            
            <main className="flex-1 p-6 md:p-8 mt-17">
                {loading ? (
                    <LoadingPage />
                ) : (
                    <div className="space-y-8">
                        {/* Header and Actions */}
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">Recipe Management</h1>
                                <p className="text-gray-600">Manage and organize your nutrition recipes</p>
                            </div>
                            
                            {(user?.role === "admin" || user?.role === "dietitian") && (
                                <Link
                                    to="/add-recipes"
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
                                >
                                    <FiPlus /> Add New Recipe
                                </Link>
                            )}
                        </div>

                        {/* Search and Filter */}
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="relative flex-1">
                                <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search recipes..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            
                            <div className="flex overflow-x-auto scrollbar-hide gap-2 pb-2">
                                {categories.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => setActiveCategory(category.id)}
                                        className={`px-4 py-2 whitespace-nowrap rounded-full text-sm font-medium transition-colors ${
                                            activeCategory === category.id
                                                ? "bg-green-600 text-white"
                                                : "bg-white text-gray-700 hover:bg-gray-100"
                                        }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Recipe Categories */}
                        {activeCategory === "all" ? (
                            <div className="space-y-8">
                                {allRecipes.length === 0 ? (
                                    <EmptyState 
                                        title="No recipes found"
                                        description="Try adding a new recipe or adjusting your search"
                                    />
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                        {allRecipes.map((recipe) => (
                                            <RecipeCard key={recipe._id} recipe={recipe} role={user?.role} />
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {Object.entries(recipes).map(([category, items]) => {
                                    const filteredItems = filteredRecipes(category);
                                    return filteredItems.length > 0 && (
                                        <div key={category} className="space-y-4">
                                            <h2 className="text-xl font-semibold text-gray-800 capitalize">{category}</h2>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                                {filteredItems.map((recipe) => (
                                                    <RecipeCard key={recipe._id} recipe={recipe} role={user?.role} />
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}