import { View, Text, Alert, ScrollView, TouchableOpacity, FlatList } from "react-native";
import { useClerk, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants/api";
import { favoriteStyles } from "../../assets/styles/favorites.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import RecipeCard from "../../components/RecipeCard";
import NoFavoritesFound from "../../components/NoFavoritesFound";
import LoadingSpinner from "../../components/LoadingSpinner";

const FavoritesScreen = () => {
  const { signOut } = useClerk();
  const { user } = useUser();

  const [favoritesRecipes, setFavoritesRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const loadFavorites = async () => {
      try {
        const response = await fetch(`${API_URL}/favorites/${user.id}`);
        if (!response.ok) throw new Error("Network response was not ok");

        const favorites = await response.json();

        const transformedFavorites = favorites.map((favorite) => ({
          ...favorite,
          id: favorite.id,
        }));

        setFavoritesRecipes(transformedFavorites);
      } catch (error) {
        console.log("Error loading favorites", error);
        Alert.alert("Error", "Failed to load favorite recipes.");
      } finally {
        setIsLoading(false);
      }
    };

    loadFavorites();
  }, [user]);

  const handleSignOut = () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", style: "destructive", onPress: signOut },
    ]);
  };

  if (isLoading) {
    return <LoadingSpinner message="Loading favorites..." />;
  }

  return (
    <View style={favoriteStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={favoriteStyles.header}>
          <Text style={favoriteStyles.title}>Favorites</Text>

          <TouchableOpacity
            style={favoriteStyles.signOutButton}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={favoriteStyles.recipeSection}>
          <FlatList
            data={favoritesRecipes}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={favoriteStyles.row}
            contentContainerStyle={favoriteStyles.recipeGrid}
            scrollEnabled={false}
            ListEmptyComponent={<NoFavoritesFound />}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default FavoritesScreen;
