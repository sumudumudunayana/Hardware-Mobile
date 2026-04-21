import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import {AuthContext} from '../context/AuthContext';
import styles from '../styles/dashboardScreenStyles';

export default function DashboardScreen({navigation}: any) {
  const {logout} = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  

  return (
    <View style={{flex: 1, backgroundColor: '#ffffffcd'}}>
      {/* GLOW BACKGROUND */}
      <View style={styles.dashboardGlowPrimary} />
      <View style={styles.dashboardGlowSecondary} />

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={{padding: 16, paddingBottom: 40}}
        showsVerticalScrollIndicator={false}>
        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.dashboardLogoutBtn}
          onPress={handleLogout}>
          <Text style={styles.dashboardLogoutText}>Logout</Text>
        </TouchableOpacity>

        {/* HEADER */}
        <View style={styles.dashboardHeader}>
          <View style={styles.dashboardBadge}>
            <Text style={styles.dashboardBadgeText}>CONTROL CENTER</Text>
          </View>

          <Text style={styles.dashboardTitle}>Management Dashboard</Text>

          <Text style={styles.dashboardSubtitle}>
            Manage your hardware system efficiently
          </Text>

          {/* STATS */}
          <View style={styles.dashboardStatsRow}>
            <View style={styles.dashboardStatCard}>
              <Text style={styles.dashboardStatTitle}>Modules</Text>
              <Text style={styles.dashboardStatValue}>08</Text>
            </View>

            <View style={styles.dashboardStatCard}>
              <Text style={styles.dashboardStatTitle}>Status</Text>
              <Text style={styles.dashboardStatValue}>Live</Text>
            </View>
          </View>
        </View>

        {/* MODULES */}
        <View style={styles.dashboardGrid}>
          {/* PRODUCTS */}
          <TouchableOpacity
            style={styles.dashboardCard}
            onPress={() => navigation.navigate('Products')}>
            <View style={styles.dashboardCardTop}>
              <Text style={styles.dashboardIcon}>📦</Text>
              <Text style={styles.dashboardStatus}>Inventory</Text>
            </View>
            <Text style={styles.dashboardCardTitle}>Product Management</Text>
            <Text style={styles.dashboardCardDesc}>
              Manage all hardware inventory
            </Text>
            <Text style={styles.dashboardLink}>Open →</Text>
          </TouchableOpacity>

          {/* CUSTOMERS */}
          <TouchableOpacity
            style={styles.dashboardCard}
            onPress={() => navigation.navigate('Customers')}>
            <View style={styles.dashboardCardTop}>
              <Text style={styles.dashboardIcon}>👥</Text>
              <Text style={styles.dashboardStatus}>Customers</Text>
            </View>
            <Text style={styles.dashboardCardTitle}>Customer Management</Text>
            <Text style={styles.dashboardCardDesc}>
              Manage customer profiles and records
            </Text>
            <Text style={styles.dashboardLink}>Open →</Text>
          </TouchableOpacity>

          {/* SALES */}
          <TouchableOpacity 
          style={styles.dashboardCard}
          onPress={() => navigation.navigate('Sales')}>
            <View style={styles.dashboardCardTop}>
              <Text style={styles.dashboardIcon}>🧾</Text>
              <Text style={styles.dashboardStatus}>Sales</Text>
            </View>
            <Text style={styles.dashboardCardTitle}>Sales Management</Text>
            <Text style={styles.dashboardCardDesc}>
              Track and manage transactions
            </Text>
            <Text style={styles.dashboardLink}>Open →</Text>
          </TouchableOpacity>

          {/* SUPPLIERS */}
          <TouchableOpacity 
          style={styles.dashboardCard}
          onPress={() => navigation.navigate('Distributors')}>
            <View style={styles.dashboardCardTop}>
              <Text style={styles.dashboardIcon}>🚚</Text>
              <Text style={styles.dashboardStatus}>Suppliers</Text>
            </View>
            <Text style={styles.dashboardCardTitle}>Supplier Management</Text>
            <Text style={styles.dashboardCardDesc}>
              Manage supplier details and deliveries
            </Text>
            <Text style={styles.dashboardLink}>Open →</Text>
          </TouchableOpacity>

          {/* STOCK */}
          <TouchableOpacity
           style={styles.dashboardCard}
           onPress={() => navigation.navigate('Stocks')}>
            <View style={styles.dashboardCardTop}>
              <Text style={styles.dashboardIcon}>📊</Text>
              <Text style={styles.dashboardStatus}>Stock</Text>
            </View>
            <Text style={styles.dashboardCardTitle}>Stock Management</Text>
            <Text style={styles.dashboardCardDesc}>
              Monitor stock levels and updates
            </Text>
            <Text style={styles.dashboardLink}>Open →</Text>
          </TouchableOpacity>

          {/* PROMOTIONS */}
          <TouchableOpacity 
          style={styles.dashboardCard}
          onPress={() => navigation.navigate('Promotions')}>
            <View style={styles.dashboardCardTop}>
              <Text style={styles.dashboardIcon}>🏷️</Text>
              <Text style={styles.dashboardStatus}>Promotions</Text>
            </View>
            <Text style={styles.dashboardCardTitle}>Promotion Management</Text>
            <Text style={styles.dashboardCardDesc}>
              Manage discounts and campaigns
            </Text>
            <Text style={styles.dashboardLink}>Open →</Text>
          </TouchableOpacity>

          {/* CATEGORY MANAGEMENT */}
          <TouchableOpacity 
          style={styles.dashboardCard}
          onPress={() => navigation.navigate('Categories')}>
            <View style={styles.dashboardCardTop}>
              <Text style={styles.dashboardIcon}>🗂️</Text>
              <Text style={styles.dashboardStatus}>Categories</Text>
            </View>

            <Text style={styles.dashboardCardTitle}>Category Management</Text>

            <Text style={styles.dashboardCardDesc}>
              Manage product categories and classifications
            </Text>

            <Text style={styles.dashboardLink}>Open →</Text>
          </TouchableOpacity>

          {/* COMPANY MANAGEMENT */}
          <TouchableOpacity 
          style={styles.dashboardCard}
          onPress={() => navigation.navigate('Companies')}>
            <View style={styles.dashboardCardTop}>
              <Text style={styles.dashboardIcon}>🏢</Text>
              <Text style={styles.dashboardStatus}>Companies</Text>
            </View>

            <Text style={styles.dashboardCardTitle}>Company Management</Text>

            <Text style={styles.dashboardCardDesc}>
              Manage company records and business details
            </Text>

            <Text style={styles.dashboardLink}>Open →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
