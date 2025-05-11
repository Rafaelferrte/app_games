// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { theme } from './src/styles/theme';


// Telas
import LoginScreen from './src/screens/Login';
import RegisterScreen from './src/screens/Register';
import HomeScreen from './src/screens/Home';
import FeedScreen from './src/screens/Feed';
import GameDetails from './src/screens/GameDetails';

// Criação dos navegadores
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const FeedStack = createNativeStackNavigator();

function FeedStackScreen() {
  return (
    <FeedStack.Navigator screenOptions={{ 
      headerShown: false,
      headerTitleStyle: theme.headerTitle,
      headerStyle: {
        backgroundColor: theme.colors.primary,
      },
      headerTintColor: theme.colors.onPrimary,
    }}>
      <FeedStack.Screen name="FeedMain" component={FeedScreen} options={{ title: 'Notícias' }} />
      <FeedStack.Screen name="GameDetails" component={GameDetails} options={{ title: 'Detalhes do Jogo' }} />
    </FeedStack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'HomeTab') iconName = 'home';
          else if (route.name === 'FeedTab') iconName = 'rss-feed';
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.textDisabled,
        tabBarStyle: {
          backgroundColor: theme.colors.surface,
          borderTopWidth: 0,
          ...theme.elevation.medium,
        },
        headerShown: true,
        
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Início' }} />
      <Tab.Screen name="FeedTab" component={FeedStackScreen} options={{ title: 'Notícias' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerTitleStyle: theme.headerTitle,
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: theme.colors.onPrimary,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Criar Conta' }} />
        <Stack.Screen name="MainApp" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}