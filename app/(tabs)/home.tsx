import { View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-background p-6 items-center justify-center">
      <StatusBar style="dark" />
      <Text className="text-2xl font-bold">Home Screen</Text>
    </View>
  );
} 