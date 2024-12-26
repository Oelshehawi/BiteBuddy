import { View, Text, TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useUserStore } from '../../store/userStore';

const CUISINES = ['Italian', 'Japanese', 'Mexican', 'Indian', 'Chinese', 'Thai', 'American', 'Mediterranean'];
const DIETARY_PREFERENCES = ['Vegetarian', 'Vegan', 'Gluten-Free', 'Halal', 'Kosher', 'None'];

export default function Onboarding() {
  const { user, updateProfile } = useUserStore();
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [profileImage, setProfileImage] = useState(user?.profileImage || '');
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>(user?.favoriteCuisines || []);
  const [selectedDietary, setSelectedDietary] = useState<string[]>(user?.dietaryPreferences || []);
  const [isLoading, setIsLoading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const toggleCuisine = (cuisine: string) => {
    setSelectedCuisines(prev => 
      prev.includes(cuisine)
        ? prev.filter(c => c !== cuisine)
        : [...prev, cuisine]
    );
  };

  const toggleDietary = (preference: string) => {
    setSelectedDietary(prev =>
      prev.includes(preference)
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const handleComplete = async () => {
    try {
      setIsLoading(true);
      // TODO: Upload profile image to storage and get URL
      await updateProfile({
        name,
        bio,
        profileImage,
        favoriteCuisines: selectedCuisines,
        dietaryPreferences: selectedDietary,
      });
      router.replace('/(tabs)/home');
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-background">
      <StatusBar style="dark" />
      
      <View className="p-6">
        <Text className="text-3xl font-bold mb-2">Complete Your Profile</Text>
        <Text className="text-gray-600 mb-8">
          Help us personalize your restaurant recommendations
        </Text>

        <TouchableOpacity 
          onPress={pickImage}
          className="w-32 h-32 rounded-full bg-gray-200 self-center mb-8 items-center justify-center overflow-hidden"
        >
          {profileImage ? (
            <Image 
              source={{ uri: profileImage }} 
              className="w-32 h-32"
            />
          ) : (
            <FontAwesome name="camera" size={32} color="#666" />
          )}
        </TouchableOpacity>

        <View className="space-y-4 mb-8">
          <View>
            <Text className="text-gray-700 mb-2">Name</Text>
            <TextInput
              className="w-full bg-white border border-gray-300 rounded-lg p-4"
              placeholder="Enter your name"
              value={name}
              onChangeText={setName}
            />
          </View>

          <View>
            <Text className="text-gray-700 mb-2">Bio</Text>
            <TextInput
              className="w-full bg-white border border-gray-300 rounded-lg p-4"
              placeholder="Tell us about yourself"
              value={bio}
              onChangeText={setBio}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <Text className="text-xl font-semibold mb-4">Favorite Cuisines</Text>
        <View className="flex-row flex-wrap gap-2 mb-8">
          {CUISINES.map(cuisine => (
            <TouchableOpacity
              key={cuisine}
              onPress={() => toggleCuisine(cuisine)}
              className={`px-4 py-2 rounded-full border ${
                selectedCuisines.includes(cuisine)
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-300'
              }`}
            >
              <Text
                className={`${
                  selectedCuisines.includes(cuisine)
                    ? 'text-white'
                    : 'text-gray-700'
                }`}
              >
                {cuisine}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text className="text-xl font-semibold mb-4">Dietary Preferences</Text>
        <View className="flex-row flex-wrap gap-2 mb-8">
          {DIETARY_PREFERENCES.map(preference => (
            <TouchableOpacity
              key={preference}
              onPress={() => toggleDietary(preference)}
              className={`px-4 py-2 rounded-full border ${
                selectedDietary.includes(preference)
                  ? 'bg-primary border-primary'
                  : 'bg-white border-gray-300'
              }`}
            >
              <Text
                className={`${
                  selectedDietary.includes(preference)
                    ? 'text-white'
                    : 'text-gray-700'
                }`}
              >
                {preference}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          className="w-full bg-primary rounded-full p-4 items-center mt-4"
          onPress={handleComplete}
          disabled={isLoading}
        >
          <Text className="text-white font-semibold text-lg">
            {isLoading ? 'Saving Profile...' : 'Complete Setup'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
} 