import { Slot, useRouter, useSegments } from 'expo-router';
import { useAuth } from '../hooks/useAuth';
import { View, ActivityIndicator, Text } from 'react-native';
import { useEffect } from 'react';
import '../global.css';

export default function RootLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log('Current segments:', segments);
    if (!loading) {
      // Check if user is on an auth screen
      const inAuthGroup = segments[0] === '(auth)';

      if (!user && !inAuthGroup) {
        // If no user and not on auth screen, redirect to login
        router.replace('/(auth)/login');
      } else if (user && inAuthGroup) {
        // If user is logged in and on auth screen, redirect to home
        router.replace('/(tabs)/home');
      }
    }
  }, [user, loading, segments]);

  if (loading) {
    return (
      <View className='flex-1 justify-center items-center bg-white'>
        <ActivityIndicator size='large' color='#FF6B6B' />
        <Text className='mt-4'>Loading...</Text>
      </View>
    );
  }

  return <Slot />;
}
