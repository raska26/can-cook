import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { API_URL } from "../../constants/api";
import { MealAPI } from "../../services/mealAPI";

const RecipeDetailScreen = () => {
  const { id: recipeId } = useLocalSearchParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const { user } = useUser();
  const userId = user?.id;

  useEffect(() => {
    const checkIfSaved = async () => {
      try {
        const response = await fetch(
          `${API_URL}/favorites/check?userId=${userId}`
        );
        const data = await response.json();
        setIsSaved(data.isSaved);
      } catch (error) {
        console.error("Error checking if recipe is saved:", error);
      }
    };

    const loadRecipe = async () => {
      setLoading(true);
      try {
        const mealData = await MealAPI.getMealById(recipeId);
        if (mealData) {
          const transformedRecipe =
            MealAPI.transformMealData(mealData);

          const recipeWithVideo = {
            ...transformedRecipe,
            videoUrl: mealData.strYoutube || null,
          };

          setRecipe(recipeWithVideo);
        }
      } catch (error) {
        console.error("Error loading recipe:", error);
      } finally {
        setLoading(false);
      }
    };

    checkIfSaved();
    loadRecipe();
  }, [recipeId, userId]);

  const getYoutubeVideoId = (url) => {
    // nanti diisi
  };

  return (
    <View>
      <Text>Recipe Details Screen</Text>
    </View>
  );
};

export default RecipeDetailScreen;
