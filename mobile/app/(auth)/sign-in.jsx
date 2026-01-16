import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import {
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Image } from "expo-image";

const SignInScreen = () => {
  const router = useRouter();
    const { signIn, setActive, isLoaded } = useSignIn();
      const [email, setEmail] = useState("");
        const [showPassword, setShowPassword] = useState(false);