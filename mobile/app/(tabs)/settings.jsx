import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../constants/colors";
import { authStyles } from "../../assets/styles/auth.styles";

const SettingsScreen = () => {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View style={[authStyles.container, { padding: 24 }]}>
      {/* Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color={COLORS.text} />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginLeft: 12,
            color: COLORS.text,
          }}
        >
          Settings
        </Text>
      </View>

      {/* Settings Card */}
      <View
        style={{
          backgroundColor: COLORS.card,
          borderRadius: 16,
          padding: 16,
        }}
      >
        {/* Dark Mode */}
        <SettingItem
          icon="moon-outline"
          label="Dark Mode"
          rightComponent={
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
            />
          }
        />

        {/* Account */}
        <SettingItem
          icon="person-outline"
          label="Account"
          onPress={() => {}}
        />

        {/* About */}
        <SettingItem
          icon="information-circle-outline"
          label="About App"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

// Komponen kecil biar rapi
const SettingItem = ({ icon, label, onPress, rightComponent }) => (
  <TouchableOpacity
    activeOpacity={0.7}
    onPress={onPress}
    disabled={!onPress}
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingVertical: 14,
    }}
  >
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Ionicons name={icon} size={20} color={COLORS.primary} />
      <Text
        style={{
          marginLeft: 12,
          fontSize: 16,
          color: COLORS.text,
        }}
      >
        {label}
      </Text>
    </View>

    {rightComponent || (
      <Ionicons
        name="chevron-forward-outline"
        size={18}
        color={COLORS.textLight}
      />
    )}
  </TouchableOpacity>
);
