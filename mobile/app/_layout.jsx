import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <ThemeProvider>
        <Slot />
      </ThemeProvider>
    </ClerkProvider>
  );
}
