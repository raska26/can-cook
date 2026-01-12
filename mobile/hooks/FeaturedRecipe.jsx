import { View, Text, TouchableOpacity } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/colors";
import { homeStyles } from "../assets/styles/home.styles";

const FeaturedRecipe = ({ recipe, onPress }) => {
  if (!recipe) return null;

  return (
    <View style={homeStyles.featuredSection}>
      <TouchableOpacity
        style={homeStyles.featuredCard}
        activeOpacity={0.9}
        onPress={onPress}
      >
        <View style={homeStyles.featuredImageContainer}>
          <Image
            source={{ uri: recipe.image }}
            style={homeStyles.featuredImage}
            contentFit="cover"
          />

          <View style={homeStyles.featuredOverlay}>
            <View style={homeStyles.featuredBadge}>
              <Text style={homeStyles.featuredBadgeText}>Featured</Text>
            </View>

            <View style={homeStyles.featuredContent}>
              <Text style={homeStyles.featuredTitle} numberOfLines={2}>
                {recipe.title}
              </Text>

              <View style={homeStyles.featuredMeta}>
                <View style={homeStyles.metaItem}>
                  <Ionicons name="time-outline" size={16} color={COLORS.white} />
                  <Text style={homeStyles.metaText}>{recipe.cookTime}</Text>
                </View>

                {recipe.area && (
                  <View style={homeStyles.metaItem}>
                    <Ionicons name="location-outline" size={16} color={COLORS.white} />
                    <Text style={homeStyles.metaText}>{recipe.area}</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FeaturedRecipe;
