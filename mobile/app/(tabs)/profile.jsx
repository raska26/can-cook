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

  // Loading state
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

        <Text style={{ color: COLORS.textLight }}>
          {user?.primaryEmailAddress?.emailAddress}
        </Text>
      </View>

      {/* Info Card */}
      <View
        style={{
          backgroundColor: COLORS.card,
          borderRadius: 16,
          padding: 16,
          marginBottom: 24,
        }}
      >
        <ProfileItem icon="person-outline" label="User ID" value={user?.id} />
        <ProfileItem
          icon="mail-outline"
          label="Email"
          value={user?.primaryEmailAddress?.emailAddress}
        />
        <ProfileItem
          icon="calendar-outline"
          label="Bergabung"
          value={new Date(user?.createdAt).toLocaleDateString()}
        />
      </View>

      {/* Logout Button */}
        <TouchableOpacity
  onPress={handleLogout}
  activeOpacity={0.8}
  style={{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.danger,
    paddingVertical: 14,
    borderRadius: 30,
    marginTop: 12,
  }}
  >
  <Ionicons
    name="log-out-outline"
    size={20}
    color="#fff"
    style={{ marginRight: 8 }}
  />
</TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;


const ProfileItem = ({ icon, label, value }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
    }}
  >
    <Ionicons name={icon} size={20} color={COLORS.primary} />
    <View style={{ marginLeft: 12 }}>
      <Text style={{ color: COLORS.textLight, fontSize: 12 }}>{label}</Text>
      <Text style={{ color: COLORS.text }}>{value}</Text>
    </View>
  </View>
);
