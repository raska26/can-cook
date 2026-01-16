import { View, Text, TouchableOpacity, Switch } from "react-native";
import { useRouter } from "expo-router"; //Untuk navigasi (kembali ke halaman sebelumnya).
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/Theme";
import { authStyles } from "../../assets/styles/auth.styles";

const SettingsScreen = () => {
  const router = useRouter();
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <View style={[authStyles.container(theme), { padding: 24 }]}>
      {/* Header */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 24 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-outline" size={24} color={theme.text} />
        </TouchableOpacity>

        <Text style={{ fontSize: 20, fontWeight: "600", marginLeft: 12, color: theme.text }}>
          Settings
        </Text>
      </View>

      {/* Card */}
      <View style={{ backgroundColor: theme.card, borderRadius: 16, padding: 16 }}>
        <SettingItem
          icon="moon-outline"
          label="Dark Mode"
          theme={theme}
          rightComponent={
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: "#D1C4E9", true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          }
        />

        <SettingItem
          icon="person-outline"
          label="Account"
          theme={theme}
          onPress={() => {}}
        />

        <SettingItem
          icon="information-circle-outline"
          label="About App"
          theme={theme}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default SettingsScreen;

const SettingItem = ({ icon, label, onPress, rightComponent, theme }) => (
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
      <Ionicons name={icon} size={20} color={theme.primary} />
      <Text style={{ marginLeft: 12, fontSize: 16, color: theme.text }}>
        {label}
      </Text>
    </View>

    {rightComponent || (
      <Ionicons
        name="chevron-forward-outline"
        size={18}
        color={theme.textLight}
      />
    )}
  </TouchableOpacity>
);
