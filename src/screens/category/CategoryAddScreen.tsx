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
import styles from '../../styles/category/CategoryAddScreenStyles';

export default function CategoryAddScreen({navigation}: any) {
  const [formData, setFormData] = useState({
    categoryName: '',
    categoryDescription: '',
  });

  const [loading, setLoading] = useState(false);

  // HANDLE INPUT CHANGE
  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  // CREATE CATEGORY
  const handleSubmit = async () => {
    if (!formData.categoryName.trim() || !formData.categoryDescription.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'All fields are required',
      });
      return;
    }

    if (formData.categoryName.trim().length < 3) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Category name must be at least 3 characters',
      });
      return;
    }

    try {
      setLoading(true);

      await api.post('/categories', {
        categoryName: formData.categoryName,
        categoryDescription: formData.categoryDescription,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Category added successfully',
      });

      // small delay for better UX
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
        text2: error.response?.data?.message || 'Failed to add category',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Add Category" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Add New Category</Text>

            {/* NAME */}
            <TextInput
              placeholder="Category Name"
              style={styles.input}
              value={formData.categoryName}
              onChangeText={text => handleChange('categoryName', text)}
              placeholderTextColor="#64748b"
            />

            {/* DESCRIPTION */}
            <TextInput
              placeholder="Category Description"
              style={[styles.input, styles.textArea]}
              multiline
              value={formData.categoryDescription}
              onChangeText={text => handleChange('categoryDescription', text)}
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
                <Text style={styles.buttonText}>Add Category</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
