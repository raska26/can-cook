import { View, Text, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const HeaderLocation = ({ city }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 12,
      }}
    >
      {/* LEFT - LOCATION */}
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Ionicons name="location-outline" size={18} color="#FF5A5F" />
        <Text style={{ marginLeft: 6, fontWeight: "600" }}>
          {city || "Your location"}
        </Text>
      </View>

      {/* CENTER - LOGO */}
      <Text style={{ fontSize: 20, fontWeight: "700", color: "#FF5A5F" }}>
        CanCook
      </Text>

      {/* RIGHT - PROFILE */}
      <TouchableOpacity>
        <Ionicons name="person-circle-outline" size={28} color="#333" />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderLocation;
