import Recipe from "../models/Recipies.model.js";

const addRecipe = async (req, res) => {
    try {
        const { name, image, description, calories, categories, ingredients,
            nutrition, preparation } = req.body;
        const newRecipe = new Recipe({
            name,
            image,
            description,
            calories,
            categories,
            ingredients,
            nutrition,
            preparation
        })

        await newRecipe.save()
        return res.status(200).json({ success: true, recipe: newRecipe })
    } catch (error) {
        return res.status(500).json({ success: false, error: "add recipe server error" })
    }
}

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find()
        return res.status(200).json({ success: true, recipes })

    } catch (error) {
        return res.status(500).json({ success: false, error: "Get Recipes server error" })
    }
}

const getRecipeById = async (req, res) => {
    const { id } = req.params;
    try {
        const recipe = await Recipe.findById(id);

        if (!recipe) {
            return res.status(404).json({ success: false, error: "Recipe not found" });
        }
        return res.status(200).json({ success: true, recipe });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: "Server error while fetching recipe" });
    }
};

const updateRecipe = async (req, res) => {
    const { id } = req.params;
    const newRecipeData = req.body;

    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            newRecipeData,
            { new: true } // to return the updated document
        );

        if (!updatedRecipe) {
            return res.status(404).json({ success: false, message: "Recipe not found" });
        }

        res.status(200).json({ success: true, recipe: updatedRecipe });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


const deleteRecipe = async (req, res) => {
    try {
        const recipes = await Recipe.findByIdAndDelete(req.params.id);
        return res.status(200).json({ success: true, recipes })
    } catch (error) {
        return res.status(500).json({ success: false, error: "Delete Recipe server error" })
    }
}

export { addRecipe, getRecipes, deleteRecipe, getRecipeById ,updateRecipe}

