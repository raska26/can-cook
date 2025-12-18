import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { MealAPI } from "../../services/mealAPI";
import { homeStyles } from "../../assets/styles/home.styles";
import { Image } from "expo-image";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import CategoryFilter from "../../components/CategoryFilter";
import RecipeCard from "../../components/RecipeCard";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const HomeScreen = () => {
  const router = useRouter();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [featuredRecipe, setFeaturedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const loadMealsByCategory = async (category) => {
    try {
      setIsLoading(true);

      const meals = await MealAPI.getMealsByCategory(category);

      const transformedMeals = meals
        .map((meal) => MealAPI.TransformMealData(meal))
        .filter(Boolean);

      setRecipes(transformedMeals);
    } catch (error) {
      console.log("Error loading meals:", error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const loadData = async () => {
    try {
      setIsLoading(true);

      const [apiCategories, featuredMeal] = await Promise.all([
        MealAPI.getCategories(),
        MealAPI.getRandomMeal(),
      ]);

      const transformedCategories = apiCategories.map((cat, index) => ({
        id: index + 1,
        name: cat.strCategory,
        image: cat.strCategoryThumb,
        description: cat.strCategoryDescription,
      }));

      setCategories(transformedCategories);

      if (transformedCategories.length > 0) {
        const defaultCategory = transformedCategories[0].name;
        setSelectedCategory(defaultCategory);
        await loadMealsByCategory(defaultCategory);
      }

      setFeaturedRecipe(
        MealAPI.TransformMealData(featuredMeal)
      );
    } catch (error) {
      console.log("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };


  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    await loadMealsByCategory(category);
  };


  const onRefresh = async () => {
    setRefreshing(true);
    await sleep(2000);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={homeStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
        contentContainerStyle={homeStyles.scrollView}
      >
        {/* ICONS */}
        <View style={homeStyles.welcomeSection}>
          <Image source={require("../../assets/images/lamb.png")} style={{ width: 100, height: 100 }} />
          <Image source={require("../../assets/images/chicken.png")} style={{ width: 100, height: 100 }} />
          <Image source={require("../../assets/images/pork.png")} style={{ width: 100, height: 100 }} />
        </View>

        {/* FEATURED */}
        {featuredRecipe && (
          <TouchableOpacity
            style={homeStyles.featuredCard}
            onPress={() => router.push(`/recipe/${featuredRecipe.id}`)}
          >
            <Image
              source={{ uri: featuredRecipe.image }}
              style={homeStyles.featuredImage}
            />
            <Text style={homeStyles.featuredTitle}>
              {featuredRecipe.title}
            </Text>
          </TouchableOpacity>
        )}

        {/* CATEGORY */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        {/* RECIPES */}
        {recipes.length > 0 ? (
          <FlatList
            data={recipes}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={homeStyles.row}
            scrollEnabled={false}
          />
        ) : (
          <View style={homeStyles.noRecipesContainer}>
            <Ionicons name="restaurant-outline" size={64} color={COLORS.textLight} />
            <Text style={homeStyles.emptyTitle}>No recipes found</Text>
            <Text style={homeStyles.emptyDescription}>Try a different category</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
