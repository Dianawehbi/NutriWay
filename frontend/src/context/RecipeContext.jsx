// src/context/RecipeContext.js
import React, { createContext, useState, useContext } from 'react';

const RecipeContext = createContext();

export const useRecipe = () => {
  return useContext(RecipeContext);
};

export const RecipeProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);

  const addRecipe = (recipe) => {
    setRecipes((prevRecipes) => [...prevRecipes, recipe]);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) =>
        recipe.id === updatedRecipe.id ? updatedRecipe : recipe
      )
    );
  };

  const deleteRecipe = (recipeId) => {
    setRecipes((prevRecipes) =>
      prevRecipes.filter((recipe) => recipe.id !== recipeId)
    );
  };

  return (
    <RecipeContext.Provider value={{ recipes, addRecipe, updateRecipe, deleteRecipe }}>
      {children}
    </RecipeContext.Provider>
  );
};
