import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message'; // ✅ ADD
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

  // HANDLE INPUT CHANGE
  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * CREATE CUSTOMER
   */
  const handleSubmit = async () => {
    // VALIDATION
    if (!formData.customerName.trim()) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Customer name is required',
      });
    }

    if (!formData.customerContactNumber.trim()) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Contact number is required',
      });
    }

    if (!formData.customerEmail.trim()) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Email is required',
      });
    }

    if (!/^\d{10}$/.test(formData.customerContactNumber)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Contact',
        text2: 'Contact number must be exactly 10 digits',
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.customerEmail)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
    }

    try {
      setLoading(true);

      await api.post('/customers', {
        customerName: formData.customerName,
        customerContactNumber: formData.customerContactNumber,
        customerEmail: formData.customerEmail,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Customer added successfully',
      });

      // small delay so user sees toast
      setTimeout(() => {
        navigation.goBack();
      }, 1000);

    } catch (error: any) {
      if (error.response?.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Session Expired',
          text2: 'Please login again',
        });

        navigation.replace('Login');
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Add Failed',
        text2:
          error.response?.data?.message ||
          'Failed to add customer',
      });
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
              placeholderTextColor="#64748b"
            />

            {/* CONTACT */}
            <TextInput
              placeholder="Contact Number"
              style={styles.input}
              keyboardType="numeric"
              value={formData.customerContactNumber}
              onChangeText={text =>
                handleChange(
                  'customerContactNumber',
                  text.replace(/[^0-9]/g, ''), // 🔥 numbers only
                )
              }
              placeholderTextColor="#64748b"
            />

            {/* EMAIL */}
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={formData.customerEmail}
              onChangeText={text => handleChange('customerEmail', text)}
              placeholderTextColor="#64748b"
            />

            {/* SUBMIT */}
            <TouchableOpacity
              style={[styles.button, loading && {opacity: 0.6}]}
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