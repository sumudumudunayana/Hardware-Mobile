import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Screens
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';

// (we’ll create these next)
import ProductListScreen from '../screens/products/ProductListScreen';
import ProductDetailsScreen from '../screens/products/ProductDetailsScreen';
import ProductEditScreen from '../screens/products/ProductEditScreen';

// TYPES
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();
const ProductStack = createNativeStackNavigator();

/**
 * 🧩 PRODUCT STACK (inside tab)
 */
function ProductStackScreen() {
  return (
    <ProductStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductStack.Screen name="ProductList" component={ProductListScreen} />
      <ProductStack.Screen name="ProductDetails" component={ProductDetailsScreen} />
      <ProductStack.Screen name="ProductEdit" component={ProductEditScreen} />
    </ProductStack.Navigator>
  );
}

/**
 * 📱 BOTTOM TABS
 */
function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Dashboard" component={DashboardScreen} />

      <Tab.Screen name="Products" component={ProductStackScreen} />

      {/* temporary placeholders */}
      <Tab.Screen name="Sales" component={DashboardScreen} />
      <Tab.Screen name="More" component={DashboardScreen} />
    </Tab.Navigator>
  );
}

/**
 * 🔐 ROOT NAVIGATION
 */
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* Auth */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

        {/* Main App */}
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
