import { useSignUp, useAuth } from "@clerk/clerk-expo";
import { useState } from "react";
import {
  View,
  Text,
  Alert,
  ScrollView,
  Platform,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";

import { authStyles } from "../../assets/styles/auth.styles";
import { COLORS } from "../../constants/colors";

const VerifyEmail = ({ email, onBack }) => {
  const { isLoaded, signUp } = useSignUp();
  const { setActive } = useAuth();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerification = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const signInAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signInAttempt.status === "complete") {
        // set session aktif setelah verifikasi email berhasil
        await setActive({
          session: signInAttempt.createdSessionId,
        });
      } else {
        Alert.alert("Error", "Verification failed. Please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      Alert.alert(
        "Error",
        err?.errors?.[0]?.message || "Verification failed"
      );
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={authStyles.container}>
      <KeyboardAvoidingView
        // eslint-disable-next-line react/no-unknown-property
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={authStyles.container}
      >
        <ScrollView
          contentContainerStyle={authStyles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* IMAGE CONTAINER */}
          <View style={authStyles.logoContainer}>
            <Image
              source={require("../../assets/images/I3.png")}
              style={authStyles.image}
              resizeMode="contain"
            />
          </View>

          {/*  TITLE */}
          <Text style={authStyles.title}>Verify Email</Text>
          <Text style={authStyles.subtitle}>
            We&apos;ve sent a verification code to {email}
          </Text>

          <View style={authStyles.formContainer}>
            {/* VERIFICATION CODE INPUT */}
            <View style={authStyles.inputContainer}>
              <TextInput
                style={authStyles.input}
                placeholder="Enter verification code"
                placeholderTextColor={COLORS.textLight}
                value={code}
                onChangeText={setCode}
                keyboardType="number-pad"
                autoCapitalize="none"
              />
            </View>

            {/* VERIFICATION BUTTON */}
            <TouchableOpacity
              style={[
                authStyles.button,
                loading && authStyles.buttonDisabled,
              ]}
              onPress={handleVerification}
              disabled={loading}
              activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>
                {loading ? "Verifying..." : "Verify Email"}
              </Text>
            </TouchableOpacity>

            {/* BACK TO SIGN UP */}
            <TouchableOpacity
              style={authStyles.linkContainerButton}
              onPress={onBack}
            >
              <Text style={authStyles.link}>Back to sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

export default VerifyEmail;
