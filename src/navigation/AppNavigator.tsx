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

// AUTH + MAIN SCREENS
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import DashboardScreen from "../screens/DashboardScreen";

// PRODUCT SCREENS
import ProductListScreen from "../screens/products/ProductListScreen";
import ProductDetailsScreen from "../screens/products/ProductDetailsScreen";
import ProductEditScreen from "../screens/products/ProductEditScreen";
import ProductAddScreen from "../screens/products/ProductAddScreen";

// CUSTOMER SCREENS
import CustomerListScreen from "../screens/customer/CustomerListScreen";
import CustomerDetailsScreen from "../screens/customer/CustomerDetailsScreen";
import CustomerEditScreen from "../screens/customer/CustomerEditScreen";
import CustomerAddScreen from "../screens/customer/CustomerAddScreen";

// COMPANY SCREENS
import CompanyListScreen from "../screens/company/CompanyListScreen";
import CompanyDetailsScreen from "../screens/company/CompanyDetailsScreen";
import CompanyEditScreen from "../screens/company/CompanyEditScreen";
import CompanyAddScreen from "../screens/company/CompanyAddScreen";

// ROOT STACK TYPES
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

const Stack =
  createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const ProductStack =
  createNativeStackNavigator();

const CustomerStack =
  createNativeStackNavigator();

const CompanyStack =
  createNativeStackNavigator();

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
 * CUSTOMER STACK
 */
function CustomerStackScreen() {
  return (
    <CustomerStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <CustomerStack.Screen
        name="CustomerList"
        component={CustomerListScreen}
      />
      <CustomerStack.Screen
        name="CustomerDetails"
        component={CustomerDetailsScreen}
      />
      <CustomerStack.Screen
        name="CustomerEdit"
        component={CustomerEditScreen}
      />
      <CustomerStack.Screen
        name="CustomerAdd"
        component={CustomerAddScreen}
      />
    </CustomerStack.Navigator>
  );
}

/**
 * COMPANY STACK
 */
function CompanyStackScreen() {
  return (
    <CompanyStack.Navigator
      screenOptions={{ headerShown: false }}
    >
      <CompanyStack.Screen
        name="CompanyList"
        component={CompanyListScreen}
      />
      <CompanyStack.Screen
        name="CompanyDetails"
        component={CompanyDetailsScreen}
      />
      <CompanyStack.Screen
        name="CompanyEdit"
        component={CompanyEditScreen}
      />
      <CompanyStack.Screen
        name="CompanyAdd"
        component={CompanyAddScreen}
      />
    </CompanyStack.Navigator>
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

      <Tab.Screen
        name="Customers"
        component={CustomerStackScreen}
      />

      <Tab.Screen
        name="Companies"
        component={CompanyStackScreen}
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
          <Stack.Screen
            name="Main"
            component={MainTabs}
          />
        ) : (
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