import { useEffect, useState } from "react";
import { MealAPI } from "../services/mealAPI";

export const useHomeData = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);

      const [apiCategories, randomMeals, featuredMeal] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getRandomMeals(12),
        MealAPI.getRandomMeal(),
      ]);

      const transformedCategories = apiCategories.map((cat, index) => ({
        id: index + 1,
        name: cat.strCategory,
        image: cat.strCategoryThumb,
        description: cat.strCategoryDescription,
      }));

      setCategories(transformedCategories);

      if (!selectedCategory) {
        setSelectedCategory(transformedCategories[0]?.name);
      }

      setRecipes(
        randomMeals
          .map((meal) => MealAPI.transformMealData(meal))
          .filter(Boolean)
      );

      setFeaturedRecipe(MealAPI.transformMealData(featuredMeal));
    } catch (e) {
      console.log("Error loading home data", e);
    } finally {
      setLoading(false);
    }
  };

  const loadCategoryData = async (category) => {
    try {
      const meals = await MealAPI.filterByCategory(category);
      setRecipes(
        meals.map(MealAPI.transformMealData).filter(Boolean)
      );
    } catch {
      setRecipes([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    selectedCategory,
    setSelectedCategory,
    recipes,
    categories,
    featuredRecipe,
    loading,
    refreshing,
    setRefreshing,
    loadData,
    loadCategoryData,
  };
};
