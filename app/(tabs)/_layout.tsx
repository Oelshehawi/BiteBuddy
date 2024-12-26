import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      <Tabs.Screen
        name='onboarding'
        options={{
          href: null, // Hide from tab bar
        }}
      />
      <Tabs.Screen
        name='home'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='home' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='discover'
        options={{
          title: 'Discover',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='compass' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='groups'
        options={{
          title: 'Groups',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='users' size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <FontAwesome name='user' size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
