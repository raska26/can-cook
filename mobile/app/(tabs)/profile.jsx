import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Redirect } from "expo-router";
import { useUser, useAuth } from "@clerk/clerk-expo";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { authStyles } from "../../assets/styles/auth.styles";

const ProfileScreen = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { signOut } = useAuth();

   if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

   if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Apakah kamu yakin ingin keluar?",
      [
        { text: "Batal", style: "cancel" },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            await signOut();
          },
        },
      ]
    );
  };

      
