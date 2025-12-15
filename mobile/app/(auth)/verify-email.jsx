import { useSignUp } from "@clerk/clerk-expo";
import { useState } from "react";
import { View, Text } from 'react-native'
import { authStyles } from "../../assets/styles/auth.styles";
const VerifyEmail = ({email, onBack}) => {
  const { isLoaded, signUp } = useSignUp();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerification = async () => {
    if (!isLoaded) return;

    setLoading(true)
    try {
      const signInAttempt = await signUp.attemptEmailAddressVerification({
      code})

      if(signInAttempt.status === "complete") {
        await setActive({session: signInAttempt.createdSessionId})
      } else {
        Alert.alert("Error", "vertification failed. Please try again.");
        console.error(JSON.stringify(signInAttempt, null, 2));
      }

    } catch (err) {
      Alert.alert("Error", err.errors?.[0]?.message || "vertification failed");
      console.error(JSON.stringify(err, null, 2));

    }finally {
      setLoading(false);

   }
 };


  return (
    <View style={authStyles.container}>
      <keyboardAvoidingView
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
              style={authStyles.Image}
              contentFit="contain"
            />
          </View>
      
         {/*  TITTLE */}
          <Text style={authStyles.tittle}>Vertify email</Text>
          <Text style={authStyles.subtittle}>We&apos;ve sent a verification code to {email}</Text>

          <View style={authStyles.fromContainer}>
            {/* vertification code input */}
          <View style={authStyles.inputContainer}>
            <TextInput
              style={authStyles.input}
              placeholder="Enter vertification code"
              placeholderTextColor={COLORS.textLight}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              autoCapitalize="none"
              />
          </View>

           {/* vertification button  */}
           <TouchbleOpacity
            style={[authStyles.button, loading && authStyles.
            buttondisabled]}
            onPress={handleVerification}
            disabled={loading}
            activeOpacity={0.8}
            >
              <Text style={authStyles.buttonText}>
                {loading ? "Verifying" : "vertify email"}
              </Text>
            </TouchbleOpacity>

            {/* back to sign in  */}
            <TouchbleOpacity
            style={authStyles.linkcontainerButton}
            onPress={onBack}
            >
              <Text style={authStyles.linktext}>
                 <Text style={authStyles.link}>Back to sign up</Text>
              </Text>
            </TouchbleOpacity>
        </View>
        </ScrollView>
      </keyboardAvoidingView>
      
      <Text>VerifyEmail</Text>
    </View>
  );
};

export default VerifyEmail;