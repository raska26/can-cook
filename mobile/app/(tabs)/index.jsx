import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { MealAPI } from "../../services/mealAPI";

const HomeScreen = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);

      const [apiCategories, randomMeals, featuredMeal] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getMealsByIds(12),
        MealAPI.getRandomMeal(),
      ]);

      const transformedCategories = apiCategories.map((category, index) => ({
        id: index + 1,
        name: category.strCategory,
        image: category.strCategoryThumb,
        thumbnail: category.strCategoryThumb,
        description: category.strCategoryDescription,
      }));

      setCategories(transformedCategories);

      const transformedMeals = randomMeals
        .map((meal) => MealAPI.TransformMealData(meal))
        .filter((meal) => meal !== null);

      setRecipes(transformedMeals);

      const transformedFeaturedMeal =
        MealAPI.TransformMealData(featuredMeal);

      setFeaturedRecipe(transformedFeaturedMeal);
    } catch (error) {
      console.log("Error loading the data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;
