import { View, ScrollView, FlatList, RefreshControl, Text } from "react-native";
import { useRouter } from "expo-router";
import { COLORS } from "../../constants/colors";
import { homeStyles } from "../../assets/styles/home.styles";
import { useHomeData } from "../../hooks/useHomeData";

import CategoryFilter from "../../components/CategoryFilter";
import RecipeCard from "../../components/RecipeCard";
import LoadingSpinner from "../../components/LoadingSpinner";   
import FeaturedRecipe from "../../hooks/FeaturedRecipe";

const HomeScreen = () => {
  const router = useRouter();

  const {
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
  } = useHomeData();

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  if (loading && !refreshing) {
    return <LoadingSpinner message="Loading delicious recipes..." />;
  }

  return (
    <View style={homeStyles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        <FeaturedRecipe
          recipe={featuredRecipe}
          onPress={() => router.push(`/recipe/${featuredRecipe.id}`)}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            loadCategoryData(cat);
          }}
        />

        <Text style={homeStyles.sectionTitle}>{selectedCategory}</Text>

        <FlatList
          data={recipes}
          renderItem={({ item }) => <RecipeCard recipe={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          scrollEnabled={false}
        />
      </ScrollView>
    </View>
  );
};

export default HomeScreen;
