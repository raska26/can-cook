import { ClerkProvider } from '@clerk/clerk-expo';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <Slot />
    </ClerkProvider>
  );
}