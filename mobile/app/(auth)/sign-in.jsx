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
        const [loading, setLoading] = useState(false);

         const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
     if (!isLoaded) return;

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
      

