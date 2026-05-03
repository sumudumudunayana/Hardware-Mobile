import React, {useContext} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message'; // ✅ ADD

import AppHeader from '../components/AppHeader';
import {AuthContext} from '../context/AuthContext';
import styles from '../styles/SettingsScreenStyles';

export default function SettingsScreen({navigation}: any) {
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
          try {
            await logout();

            // ✅ SUCCESS TOAST
            Toast.show({
              type: 'success',
              text1: 'Logged Out',
              text2: 'You have been logged out successfully',
            });
          } catch (error) {
            // ❌ ERROR TOAST
            Toast.show({
              type: 'error',
              text1: 'Logout Failed',
              text2: 'Something went wrong',
            });
          }
        },
      },
    ]);
  };

  const showComingSoon = (title: string) => {
    // ✅ TOAST INSTEAD OF ALERT
    Toast.show({
      type: 'info',
      text1: title,
      text2: 'This feature will be added soon',
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Settings"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          
          {/* PROFILE CARD */}
          <View style={styles.profileCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>S</Text>
            </View>

            <Text style={styles.name}>Sumudu</Text>

            <Text style={styles.role}>Admin</Text>

            <Text style={styles.email}>
              hardwaremanagement@gmail.com
            </Text>
          </View>

          {/* ACCOUNT SETTINGS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Account</Text>

            <TouchableOpacity
              style={styles.item}
              onPress={() => showComingSoon('Edit Profile')}>
              <Text style={styles.itemText}>👤 Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => showComingSoon('Change Password')}>
              <Text style={styles.itemText}>🔒 Change Password</Text>
            </TouchableOpacity>
          </View>

          {/* APP SETTINGS */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Preferences</Text>

            <TouchableOpacity
              style={styles.item}
              onPress={() => showComingSoon('Notifications')}>
              <Text style={styles.itemText}>🔔 Notifications</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.item}
              onPress={() => showComingSoon('Dark Mode')}>
              <Text style={styles.itemText}>🌙 Dark Mode</Text>
            </TouchableOpacity>
          </View>

          {/* ABOUT */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>About System</Text>

            <Text style={styles.infoText}>
              Hardware Management System
            </Text>

            <Text style={styles.infoText}>Version 1.0</Text>

            <Text style={styles.infoText}>
              Developed by Sumudu
            </Text>
          </View>

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutBtn}
            onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}