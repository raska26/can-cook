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

  return (
    <View style={[authStyles.container, { padding: 24 }]}>
            {/* Avatar */}
            <View style={{ alignItems: "center", marginBottom: 24 }}>
              <Image
                source={{ uri: user?.imageUrl }}
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 50,
                  backgroundColor: COLORS.border,
                }}
              />
           <Text
          style={{
            marginTop: 12,
            fontSize: 20,
            fontWeight: "600",
            color: COLORS.text,
          }}
        >
          {user?.fullName || "User"}
        </Text>
        );
      };
      
      export default ProfileScreen;


      
