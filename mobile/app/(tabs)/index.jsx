import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import { MealAPI } from "../../services/mealAPI";
import { homeStyles } from "../../assets/styles/home.styles";
import { Image } from "expo-image";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";

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

      const [apiCategories, featuredMeal] = await Promise.all([
        MealAPI.getCategories(),
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

      const transformedFeaturedMeal =
        MealAPI.TransformMealData(featuredMeal);

      setFeaturedRecipe(transformedFeaturedMeal);
    } catch (error) {
      console.log("Error loading data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={homeStyles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={() => {}}
        contentContainerStyle={homeStyles.scrollView}
      >
        {/* ANIMAL ICONS */}
        <View style={homeStyles.welcomeSection}>
          <Image
            source={require("../../assets/images/lamb.png")}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
          <Image
            source={require("../../assets/images/chicken.png")}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
          <Image
            source={require("../../assets/images/pork.png")}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
        </View>

        {/* FEATURED RECIPE */}
        {featuredRecipe && (
          <View style={homeStyles.featuredSection}>
            <TouchableOpacity
              style={homeStyles.featuredCard}
              activeOpacity={0.9}
              onPress={() =>
                router.push(`/recipe/${featuredRecipe.id}`)
              }
            >
              <View style={homeStyles.featuredImageContainer}>
                <Image
                  source={{ uri: featuredRecipe.image }}
                  style={homeStyles.featuredImage}
                  contentFit="cover"
                  transition={500}
                />
              </View>

              <View style={homeStyles.featuredOverlay}>
                <View style={homeStyles.featuredBadge}>
                  <Text style={homeStyles.featuredBadgeText}>
                    Featured
                  </Text>
                </View>

                <View style={homeStyles.featuredContent}>
                  <Text
                    style={homeStyles.featuredTitle}
                    numberOfLines={2}
                  >
                    {featuredRecipe.title}
                  </Text>

                  <View style={homeStyles.featuredMeta}>
                    <View style={homeStyles.metaItem}>
                      <Ionicons
                        name="time-outline"
                        size={16}
                        color={COLORS.white}
                      />
                      <Text style={homeStyles.metaText}>
                        {featuredRecipe.cookTime}
                      </Text>
                    </View>

                    <View style={homeStyles.metaItem}>
                      <Ionicons
                        name="people-outline"
                        size={16}
                        color={COLORS.white}
                      />
                      <Text style={homeStyles.metaText}>
                        {featuredRecipe.servings}
                      </Text>
                    </View>

                    {featuredRecipe.area && (
                      <View style={homeStyles.metaItem}>
                        <Ionicons
                          name="location-outline"
                          size={16}
                          color={COLORS.white}
                        />
                        <Text style={homeStyles.metaText}>
                          {featuredRecipe.area}
                        </Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen;
