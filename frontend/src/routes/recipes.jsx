import AddRecipes from "../pages/Recipes/AddRecipe";
import EditRecipes from "../pages/Recipes/EditRecipe";
import ManageRecipes from "../pages/Recipes/ManageRecipes";
import RecipeDetails from "../pages/Recipes/RecipeDetails";
import PrivateRoutes from "../utils/PrivateRoutes";
import RoleBaseRoutes from "../utils/RoleBaseRoutes";

export const recipesRoute = [
    {
        path: '/add-recipes', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin", "dietitian"]}>
                    <AddRecipes />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
    {
        path: '/edit-recipes/:id', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin", "dietitian"]}>
                    <EditRecipes />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
    {
        path: '/recipes', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin", "dietitian"]}>
                    <ManageRecipes />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
    {
        path: '/recipe/:id', element:
            <PrivateRoutes>
                <RoleBaseRoutes requiredRole={["admin", "dietitian" , "client"]}>
                    <RecipeDetails />
                </RoleBaseRoutes>
            </PrivateRoutes>
    },
];
