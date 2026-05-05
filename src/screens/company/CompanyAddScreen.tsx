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
import styles from '../../styles/company/CompanyAddScreenStyles';

export default function CompanyAddScreen({navigation}: any) {
  const [formData, setFormData] = useState({
    companyName: '',
    companyDescription: '',
    companyAddress: '',
    companyContactNumber: '',
    companyEmail: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // CREATE COMPANY
  const handleSubmit = async () => {
    if (
      !formData.companyName.trim() ||
      !formData.companyDescription.trim() ||
      !formData.companyAddress.trim() ||
      !formData.companyContactNumber.trim() ||
      !formData.companyEmail.trim()
    ) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'All fields are required',
      });
    }

    if (!/^\d{10}$/.test(formData.companyContactNumber)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Contact',
        text2: 'Contact number must be exactly 10 digits',
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.companyEmail)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
    }

    try {
      setLoading(true);

      await api.post('/companies', {
        companyName: formData.companyName,
        companyDescription: formData.companyDescription,
        companyAddress: formData.companyAddress,
        companyContactNumber: formData.companyContactNumber,
        companyEmail: formData.companyEmail,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Company added successfully',
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
          error.response?.data?.message || 'Failed to add company',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Add Company" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Add New Company</Text>

            {/* NAME */}
            <TextInput
              placeholder="Company Name"
              style={styles.input}
              value={formData.companyName}
              onChangeText={text => handleChange('companyName', text)}
              placeholderTextColor="#64748b"
            />

            {/* DESCRIPTION */}
            <TextInput
              placeholder="Company Description"
              style={[styles.input, styles.textArea]}
              multiline
              value={formData.companyDescription}
              onChangeText={text =>
                handleChange('companyDescription', text)
              }
              placeholderTextColor="#64748b"
            />

            {/* ADDRESS */}
            <TextInput
              placeholder="Company Address"
              style={styles.input}
              value={formData.companyAddress}
              onChangeText={text =>
                handleChange('companyAddress', text)
              }
              placeholderTextColor="#64748b"
            />

            {/* CONTACT */}
            <TextInput
              placeholder="Contact Number"
              style={styles.input}
              keyboardType="numeric"
              value={formData.companyContactNumber}
              onChangeText={text =>
                handleChange(
                  'companyContactNumber',
                  text.replace(/[^0-9]/g, ''), // only numbers
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
              value={formData.companyEmail}
              onChangeText={text =>
                handleChange('companyEmail', text)
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
                <Text style={styles.buttonText}>Add Company</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}