import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

import Toast from 'react-native-toast-message';

import {AuthContext} from '../context/AuthContext';
import ConfirmDialog from '../components/ConfirmDialog'; // 👈 IMPORT

import styles from '../styles/dashboardScreenStyles';

export default function DashboardScreen({navigation}: any) {
  const {logout} = useContext(AuthContext);

  const [showConfirm, setShowConfirm] = useState(false); // 👈 STATE

  const handleLogout = async () => {
    try {
      await logout();

      Toast.show({
        type: 'success',
        text1: 'Logged Out',
        text2: 'You have been logged out successfully',
      });
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Logout Failed',
        text2: 'Something went wrong',
      });
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: '#ffffffcd'}}>
      {/* GLOW BACKGROUND */}
      <View style={styles.dashboardGlowPrimary} />
      <View style={styles.dashboardGlowSecondary} />

      {/* CONTENT */}
      <ScrollView
        contentContainerStyle={{padding: 16, paddingBottom: 40}}
        showsVerticalScrollIndicator={false}
      >
        {/* LOGOUT */}
        <TouchableOpacity
          style={styles.dashboardLogoutBtn}
          onPress={() => setShowConfirm(true)} // 👈 OPEN DIALOG
        >
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

        {/* AI CARD */}
        <TouchableOpacity
          style={styles.aiCard}
          onPress={() => navigation.navigate('AIInsights')}
        >
          <View style={styles.aiGlow} />

          <View style={styles.aiContent}>
            <View style={styles.aiTopRow}>
              <Text style={styles.aiIcon}>🤖</Text>
              <Text style={styles.aiBadge}>SMART AI</Text>
            </View>

            <Text style={styles.aiTitle}>AI Insights & Forecasting</Text>

            <Text style={styles.aiDesc}>
              Predict demand, optimize stock, and increase revenue with
              intelligent analytics
            </Text>

            <Text style={styles.aiAction}>View Insights →</Text>
          </View>
        </TouchableOpacity>

        {/* MODULES */}
        <View style={styles.dashboardGrid}>
          {/* Products */}
          <TouchableOpacity
            style={styles.dashboardCard}
            onPress={() => navigation.navigate('Products')}
          >
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

          {/* Customers */}
          <TouchableOpacity
            style={styles.dashboardCard}
            onPress={() => navigation.navigate('Customers')}
          >
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

          {/* Sales */}
          <TouchableOpacity
            style={styles.dashboardCard}
            onPress={() => navigation.navigate('Sales')}
          >
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

          {/* Suppliers */}
          <TouchableOpacity
            style={styles.dashboardCard}
            onPress={() => navigation.navigate('Distributors')}
          >
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

          {/* Stock */}
          <TouchableOpacity
            style={styles.dashboardCard}
            onPress={() => navigation.navigate('Stocks')}
          >
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

          {/* Promotions */}
          <TouchableOpacity
            style={styles.dashboardCard}
            onPress={() => navigation.navigate('Promotions')}
          >
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

          {/* Categories */}
          <TouchableOpacity
            style={styles.dashboardCard}
            onPress={() => navigation.navigate('Categories')}
          >
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

          {/* Companies */}
          <TouchableOpacity
            style={styles.dashboardCard}
            onPress={() => navigation.navigate('Companies')}
          >
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

      {/* 🔥 CONFIRM DIALOG */}
      <ConfirmDialog
        visible={showConfirm}
        title="Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        onCancel={() => setShowConfirm(false)}
        onConfirm={() => {
          setShowConfirm(false);
          handleLogout();
        }}
      />
    </View>
  );
}