import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, ActivityIndicator} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {AuthContext} from '../context/AuthContext';

// Settings Screen
import SettingsScreen from '../screens/SettingsScreen';

// AUTH + MAIN SCREENS
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import DashboardScreen from '../screens/DashboardScreen';

// PRODUCT SCREENS
import ProductListScreen from '../screens/products/ProductListScreen';
import ProductDetailsScreen from '../screens/products/ProductDetailsScreen';
import ProductEditScreen from '../screens/products/ProductEditScreen';
import ProductAddScreen from '../screens/products/ProductAddScreen';

// CUSTOMER SCREENS
import CustomerListScreen from '../screens/customer/CustomerListScreen';
import CustomerDetailsScreen from '../screens/customer/CustomerDetailsScreen';
import CustomerEditScreen from '../screens/customer/CustomerEditScreen';
import CustomerAddScreen from '../screens/customer/CustomerAddScreen';

// COMPANY SCREENS
import CompanyListScreen from '../screens/company/CompanyListScreen';
import CompanyDetailsScreen from '../screens/company/CompanyDetailsScreen';
import CompanyEditScreen from '../screens/company/CompanyEditScreen';
import CompanyAddScreen from '../screens/company/CompanyAddScreen';

// CATEGORY SCREENS
import CategoryListScreen from '../screens/category/CategoryListScreen';
import CategoryDetailsScreen from '../screens/category/CategoryDetailsScreen';
import CategoryEditScreen from '../screens/category/CategoryEditScreen';
import CategoryAddScreen from '../screens/category/CategoryAddScreen';

// DISTRIBUTOR SCREENS
import DistributorListScreen from '../screens/distributor/DistributorListScreen';
import DistributorDetailsScreen from '../screens/distributor/DistributorDetailsScreen';
import DistributorEditScreen from '../screens/distributor/DistributorEditScreen';
import DistributorAddScreen from '../screens/distributor/DistributorAddScreen';

// STOCK SCREENS
import StockListScreen from '../screens/stock/StockListScreen';
import StockDetailsScreen from '../screens/stock/StockDetailsScreen';
import StockEditScreen from '../screens/stock/StockEditScreen';
import StockAddScreen from '../screens/stock/StockAddScreen';

// PROMOTION SCREENS
import PromotionListScreen from '../screens/promotion/PromotionListScreen';
import PromotionDetailsScreen from '../screens/promotion/PromotionDetailsScreen';
import PromotionEditScreen from '../screens/promotion/PromotionEditScreen';
import PromotionAddScreen from '../screens/promotion/PromotionAddScreen';

// SALES SCREENS
import SalesListScreen from '../screens/sales/SalesListScreen';
import NewSaleScreen from '../screens/sales/NewSaleScreen';
import CartScreen from '../screens/sales/CartScreen';
import InvoiceScreen from '../screens/sales/InvoiceScreen';
import SalesHistoryScreen from '../screens/sales/SalesHistoryScreen';
import SalesDetailsScreen from '../screens/sales/SalesDetailsScreen';

// ROOT STACK TYPES
export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator();

const ProductStack = createNativeStackNavigator();

const CustomerStack = createNativeStackNavigator();

const CompanyStack = createNativeStackNavigator();

const CategoryStack = createNativeStackNavigator();

const DistributorStack = createNativeStackNavigator();

const StockStack = createNativeStackNavigator();

const PromotionStack = createNativeStackNavigator();

const SalesStack = createNativeStackNavigator();

/**
 * PRODUCT STACK
 */
function ProductStackScreen() {
  return (
    <ProductStack.Navigator screenOptions={{headerShown: false}}>
      <ProductStack.Screen name="ProductList" component={ProductListScreen} />
      <ProductStack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
      />
      <ProductStack.Screen name="ProductEdit" component={ProductEditScreen} />
      <ProductStack.Screen name="ProductAdd" component={ProductAddScreen} />
    </ProductStack.Navigator>
  );
}

/**
 * CUSTOMER STACK
 */
function CustomerStackScreen() {
  return (
    <CustomerStack.Navigator screenOptions={{headerShown: false}}>
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
      <CustomerStack.Screen name="CustomerAdd" component={CustomerAddScreen} />
    </CustomerStack.Navigator>
  );
}

/**
 * COMPANY STACK
 */
function CompanyStackScreen() {
  return (
    <CompanyStack.Navigator screenOptions={{headerShown: false}}>
      <CompanyStack.Screen name="CompanyList" component={CompanyListScreen} />
      <CompanyStack.Screen
        name="CompanyDetails"
        component={CompanyDetailsScreen}
      />
      <CompanyStack.Screen name="CompanyEdit" component={CompanyEditScreen} />
      <CompanyStack.Screen name="CompanyAdd" component={CompanyAddScreen} />
    </CompanyStack.Navigator>
  );
}

/**
 * CATEGORY STACK
 */
function CategoryStackScreen() {
  return (
    <CategoryStack.Navigator screenOptions={{headerShown: false}}>
      <CategoryStack.Screen
        name="CategoryList"
        component={CategoryListScreen}
      />
      <CategoryStack.Screen
        name="CategoryDetails"
        component={CategoryDetailsScreen}
      />
      <CategoryStack.Screen
        name="CategoryEdit"
        component={CategoryEditScreen}
      />
      <CategoryStack.Screen name="CategoryAdd" component={CategoryAddScreen} />
    </CategoryStack.Navigator>
  );
}

/**
 * DISTRIBUTOR STACK
 */
function DistributorStackScreen() {
  return (
    <DistributorStack.Navigator screenOptions={{headerShown: false}}>
      <DistributorStack.Screen
        name="DistributorList"
        component={DistributorListScreen}
      />
      <DistributorStack.Screen
        name="DistributorDetails"
        component={DistributorDetailsScreen}
      />
      <DistributorStack.Screen
        name="DistributorEdit"
        component={DistributorEditScreen}
      />
      <DistributorStack.Screen
        name="DistributorAdd"
        component={DistributorAddScreen}
      />
    </DistributorStack.Navigator>
  );
}

/**
 * STOCK STACK
 */
function StockStackScreen() {
  return (
    <StockStack.Navigator screenOptions={{headerShown: false}}>
      <StockStack.Screen name="StockList" component={StockListScreen} />
      <StockStack.Screen name="StockDetails" component={StockDetailsScreen} />
      <StockStack.Screen name="StockEdit" component={StockEditScreen} />
      <StockStack.Screen name="StockAdd" component={StockAddScreen} />
    </StockStack.Navigator>
  );
}

/**
 * PROMOTION STACK
 */
function PromotionStackScreen() {
  return (
    <PromotionStack.Navigator screenOptions={{headerShown: false}}>
      <PromotionStack.Screen
        name="PromotionList"
        component={PromotionListScreen}
      />
      <PromotionStack.Screen
        name="PromotionDetails"
        component={PromotionDetailsScreen}
      />
      <PromotionStack.Screen
        name="PromotionEdit"
        component={PromotionEditScreen}
      />
      <PromotionStack.Screen
        name="PromotionAdd"
        component={PromotionAddScreen}
      />
    </PromotionStack.Navigator>
  );
}

/**
 * SALES STACK
 */
function SalesStackScreen() {
  return (
    <SalesStack.Navigator screenOptions={{headerShown: false}}>
      <SalesStack.Screen name="SalesList" component={SalesListScreen} />
      <SalesStack.Screen name="NewSaleScreen" component={NewSaleScreen} />
      <SalesStack.Screen name="CartScreen" component={CartScreen} />
      <SalesStack.Screen name="InvoiceScreen" component={InvoiceScreen} />
      <SalesStack.Screen
        name="SalesHistoryScreen"
        component={SalesHistoryScreen}
      />
      <SalesStack.Screen
        name="SalesDetailsScreen"
        component={SalesDetailsScreen}
      />
    </SalesStack.Navigator>
  );
}

/**
 * HOME STACK
 * Keeps bottom tabs visible while navigating
 */
const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      {/* DASHBOARD */}
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} />

      {/* MANAGEMENT MODULES */}
      <HomeStack.Screen name="Products" component={ProductStackScreen} />

      <HomeStack.Screen name="Customers" component={CustomerStackScreen} />

      <HomeStack.Screen name="Companies" component={CompanyStackScreen} />

      <HomeStack.Screen name="Categories" component={CategoryStackScreen} />

      <HomeStack.Screen
        name="Distributors"
        component={DistributorStackScreen}
      />

      <HomeStack.Screen name="Stocks" component={StockStackScreen} />

      <HomeStack.Screen name="Promotions" component={PromotionStackScreen} />

      <HomeStack.Screen name="Sales" component={SalesStackScreen} />
    </HomeStack.Navigator>
  );
}

/**
 * MAIN TABS
 * Only Home + Settings
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarActiveTintColor: '#f59e0b',

        tabBarInactiveTintColor: '#64748b',

        tabBarStyle: {
          height: 65,

          paddingBottom: 8,

          paddingTop: 8,
        },

        tabBarIcon: ({color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = 'home';
          }

          if (route.name === 'Settings') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={22} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeStackScreen} />

      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

 // ROOT NAVIGATION
function AppNavigator() {
  const {userToken, loading} = useContext(AuthContext);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#f59e0b" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {userToken ? (
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />

            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
