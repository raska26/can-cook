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