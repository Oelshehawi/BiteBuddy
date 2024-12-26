import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      Alert.alert('Error', 'Failed to sign out. Please try again.');
    }
  };

  return (
    <View className='flex-1 bg-background'>
      <StatusBar style='dark' />

      {/* Header Section */}
      <View className='bg-primary p-8 rounded-b-3xl shadow-md'>
        <View className='items-center'>
          <View className='w-24 h-24 bg-gray-200 rounded-full items-center justify-center mb-4'>
            <Ionicons name='person' size={50} color='#666' />
          </View>
          <Text className='text-white text-xl font-bold'>{user?.email}</Text>
          <Text className='text-white/80 mt-1'>
            Member since{' '}
            {user?.metadata.creationTime
              ? new Date(user.metadata.creationTime).toLocaleDateString()
              : 'N/A'}
          </Text>
        </View>
      </View>

      {/* Profile Options */}
      <View className='p-6 flex-1'>
        <TouchableOpacity className='flex-row items-center p-4 bg-white rounded-xl mb-4 shadow-sm'>
          <Ionicons name='person-outline' size={24} color='#666' />
          <Text className='ml-4 text-gray-800 font-medium'>Edit Profile</Text>
          <Ionicons
            name='chevron-forward'
            size={24}
            color='#666'
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        <TouchableOpacity className='flex-row items-center p-4 bg-white rounded-xl mb-4 shadow-sm'>
          <Ionicons name='settings-outline' size={24} color='#666' />
          <Text className='ml-4 text-gray-800 font-medium'>Settings</Text>
          <Ionicons
            name='chevron-forward'
            size={24}
            color='#666'
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>

        <TouchableOpacity className='flex-row items-center p-4 bg-white rounded-xl mb-4 shadow-sm'>
          <Ionicons name='help-circle-outline' size={24} color='#666' />
          <Text className='ml-4 text-gray-800 font-medium'>Help & Support</Text>
          <Ionicons
            name='chevron-forward'
            size={24}
            color='#666'
            style={{ marginLeft: 'auto' }}
          />
        </TouchableOpacity>
      </View>

      {/* Sign Out Button */}
      <View className='p-6'>
        <TouchableOpacity
          className='bg-red-500 rounded-xl p-4'
          onPress={handleLogout}
        >
          <Text className='text-white text-center font-semibold'>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
