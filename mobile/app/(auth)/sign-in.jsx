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
        } else {
        Alert.alert("Error", "Sign in failed. Please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
       } catch (err) {
      Alert.alert("Error", err.errors?.[0]?.message || "Sign in failed");
      console.error(JSON.stringify(err, null, 2));
       } finally {
      setLoading(false);
    }
  };

    return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      ></KeyboardAvoidingView>
      <ScrollView
          contentContainerStyle={authStyles.scrollContent}
          showsVerticalScrollIndicator={false}
        >

