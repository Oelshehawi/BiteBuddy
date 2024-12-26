import { View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      // TODO: Show error message to user
      console.error('Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      await register(email, password);
    } catch (error) {
      // TODO: Show error message to user
      console.error('Registration failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <StatusBar style="dark" />
      
      <View className="p-6 pt-12">
        <Text className="text-3xl font-bold mb-2">Create Account</Text>
        <Text className="text-gray-600 mb-8">
          Join BiteBuddy to discover and share great restaurants
        </Text>

        <View className="space-y-4">
          <View>
            <Text className="text-gray-700 mb-2">Email</Text>
            <TextInput
              className="w-full bg-white border border-gray-300 rounded-lg p-4"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2">Password</Text>
            <TextInput
              className="w-full bg-white border border-gray-300 rounded-lg p-4"
              placeholder="Create a password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2">Confirm Password</Text>
            <TextInput
              className="w-full bg-white border border-gray-300 rounded-lg p-4"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity 
          className="w-full bg-primary rounded-full p-4 items-center mt-8"
          onPress={handleRegister}
          disabled={isLoading}
        >
          <Text className="text-white font-semibold text-lg">
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Already have an account? </Text>
          <Link href="/login" className="text-primary font-semibold">
            Sign In
          </Link>
        </View>
      </View>
    </ScrollView>
  );
} 