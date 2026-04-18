import React, { useContext } from "react";
import {
  NavigationContainer,
} from "@react-navigation/native";
import {
  createNativeStackNavigator,
} from "@react-navigation/native-stack";
import {
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  View,
  ActivityIndicator,
} from "react-native";

import { AuthContext } from "../context/AuthContext";

// Screens
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";

import ProductListScreen from "../screens/products/ProductListScreen";
import ProductDetailsScreen from "../screens/products/ProductDetailsScreen";
import ProductEditScreen from "../screens/products/ProductEditScreen";
import ProductAddScreen from "../screens/products/ProductAddScreen";

// ROOT STACK TYPES
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();
const ProductStack = createNativeStackNavigator();

/**
 * PRODUCT STACK
 */
function ProductStackScreen() {
  return (
    <ProductStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <ProductStack.Screen
        name="ProductList"
        component={ProductListScreen}
      />

      <ProductStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />

      <ProductStack.Screen
        name="ProductEdit"
        component={ProductEditScreen}
      />

      <ProductStack.Screen
        name="ProductAdd"
        component={ProductAddScreen}
      />
    </ProductStack.Navigator>
  );
}

/**
 * MAIN TABS
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="Products"
        component={ProductStackScreen}
      />

      {/* Temporary placeholders */}
      <Tab.Screen
        name="Sales"
        component={DashboardScreen}
      />

      <Tab.Screen
        name="More"
        component={DashboardScreen}
      />
    </Tab.Navigator>
  );
}

/**
 * ROOT NAVIGATION
 */
function AppNavigator() {
  const { userToken, loading } =
    useContext(AuthContext);

  // Loading while checking AsyncStorage
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator
          size="large"
          color="#f59e0b"
        />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
      >
        {userToken ? (
          // Logged In
          <Stack.Screen
            name="Main"
            component={MainTabs}
          />
        ) : (
          // Not Logged In
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
            />

            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;