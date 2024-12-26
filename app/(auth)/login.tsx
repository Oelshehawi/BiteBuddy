import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await login(email, password);
    } catch (error) {
      // TODO: Show error message to user
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className='flex-1 bg-background p-6'>
      <StatusBar style='dark' />

      <View className='flex-1 justify-center'>
        <Image
          source={require('../../assets/images/logo.webp')}
          className='w-24 h-24 mb-8 self-center'
          resizeMode='contain'
        />

        <Text className='text-3xl font-bold mb-2'>Welcome Back</Text>
        <Text className='text-gray-600 mb-8'>
          Sign in to continue discovering great restaurants
        </Text>

        <View className='space-y-4 mb-6'>
          <View>
            <Text className='text-gray-700 mb-2'>Email</Text>
            <TextInput
              className='w-full bg-white border border-gray-300 rounded-lg p-4'
              placeholder='Enter your email'
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
              autoCapitalize='none'
            />
          </View>

          <View>
            <Text className='text-gray-700 mb-2'>Password</Text>
            <TextInput
              className='w-full bg-white border border-gray-300 rounded-lg p-4'
              placeholder='Enter your password'
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity
          className='w-full bg-primary rounded-full p-4 items-center mb-4'
          onPress={handleLogin}
          disabled={isLoading}
        >
          <Text className='text-white font-semibold text-lg'>
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='w-full bg-black rounded-full p-4 flex-row items-center justify-center mb-4'
          onPress={() => {
            /* TODO: Implement Apple Sign In */
          }}
        >
          <FontAwesome name='apple' size={24} color='white' />
          <Text className='text-white font-semibold ml-3'>
            Continue with Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='w-full bg-white border border-gray-300 rounded-full p-4 flex-row items-center justify-center'
          onPress={() => {
            /* TODO: Implement Google Sign In */
          }}
        >
          <FontAwesome name='google' size={24} color='#4285F4' />
          <Text className='text-black font-semibold ml-3'>
            Continue with Google
          </Text>
        </TouchableOpacity>

        <View className='flex-row justify-center mt-8'>
          <Text className='text-gray-600'>Don't have an account? </Text>
          <Link href='/register' className='text-primary font-semibold'>
            Sign Up
          </Link>
        </View>
      </View>
    </View>
  );
}
