import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/customer/CustomerAddScreenStyles';

export default function CustomerAddScreen({navigation}: any) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerContactNumber: '',
    customerEmail: '',
  });

  const [loading, setLoading] = useState(false);

  //  HANDLE INPUT CHANGE
  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  /**
   * CREATE CUSTOMER
   */
  const handleSubmit = async () => {
    // Validation
    if (!formData.customerName.trim()) {
      Alert.alert('Validation Error', 'Customer name is required');
      return;
    }

    if (!formData.customerContactNumber.trim()) {
      Alert.alert('Validation Error', 'Contact number is required');
      return;
    }

    if (!formData.customerEmail.trim()) {
      Alert.alert('Validation Error', 'Email is required');
      return;
    }

    if (!/^\d{10}$/.test(formData.customerContactNumber)) {
      Alert.alert(
        'Validation Error',
        'Contact number must be exactly 10 digits',
      );
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.customerEmail)) {
      Alert.alert('Validation Error', 'Invalid email address');
      return;
    }

    try {
      setLoading(true);

      await api.post('/customers', {
        customerName: formData.customerName,
        customerContactNumber: formData.customerContactNumber,
        customerEmail: formData.customerEmail,
      });

      Alert.alert('Success', 'Customer added successfully');

      navigation.goBack();
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Session Expired', 'Please login again');

        navigation.replace('Login');
        return;
      }

      Alert.alert(
        'Add Failed',
        error.response?.data?.message || 'Failed to add customer',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Add Customer" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Add New Customer</Text>

            {/* NAME */}
            <TextInput
              placeholder="Customer Name"
              style={styles.input}
              value={formData.customerName}
              onChangeText={text => handleChange('customerName', text)}
            />

            {/* CONTACT */}
            <TextInput
              placeholder="Contact Number"
              style={styles.input}
              keyboardType="numeric"
              value={formData.customerContactNumber}
              onChangeText={text => handleChange('customerContactNumber', text)}
            />

            {/* EMAIL */}
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={formData.customerEmail}
              onChangeText={text => handleChange('customerEmail', text)}
            />

            {/* SUBMIT */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.buttonText}>Add Customer</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
