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

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/distributor/DistributorAddScreenStyles';

export default function DistributorAddScreen({navigation}: any) {
  const [formData, setFormData] = useState({
    distributorName: '',
    distributorDescription: '',
    distributorContactNumber: '',
    distributorEmail: '',
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
   * CREATE DISTRIBUTOR
   */
  const handleSubmit = async () => {
    if (
      !formData.distributorName.trim() ||
      !formData.distributorDescription.trim() ||
      !formData.distributorContactNumber.trim() ||
      !formData.distributorEmail.trim()
    ) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'All fields are required',
      });
    }

    if (formData.distributorName.trim().length < 2) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Name',
        text2: 'Supplier name must be at least 2 characters',
      });
    }

    if (!/^\d{10}$/.test(formData.distributorContactNumber)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Contact',
        text2: 'Contact number must be exactly 10 digits',
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.distributorEmail)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
    }

    try {
      setLoading(true);

      await api.post('/distributors', {
        distributorName: formData.distributorName,
        distributorDescription: formData.distributorDescription,
        distributorContactNumber: formData.distributorContactNumber,
        distributorEmail: formData.distributorEmail,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Supplier added successfully',
      });

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
          'Failed to add supplier',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Add Supplier" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Add New Supplier</Text>

            {/* NAME */}
            <TextInput
              placeholder="Supplier Name"
              style={styles.input}
              value={formData.distributorName}
              onChangeText={text =>
                handleChange('distributorName', text)
              }
              placeholderTextColor="#64748b"
            />

            {/* DESCRIPTION */}
            <TextInput
              placeholder="Supplier Description"
              style={[styles.input, styles.textArea]}
              multiline
              value={formData.distributorDescription}
              onChangeText={text =>
                handleChange('distributorDescription', text)
              }
              placeholderTextColor="#64748b"
            />

            {/* CONTACT */}
            <TextInput
              placeholder="Contact Number"
              style={styles.input}
              keyboardType="numeric"
              value={formData.distributorContactNumber}
              onChangeText={text =>
                handleChange(
                  'distributorContactNumber',
                  text.replace(/[^0-9]/g, ''), // ✅ numbers only
                )
              }
              placeholderTextColor="#64748b"
            />

            {/* EMAIL */}
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.distributorEmail}
              onChangeText={text =>
                handleChange('distributorEmail', text)
              }
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
                <Text style={styles.buttonText}>Add Supplier</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}