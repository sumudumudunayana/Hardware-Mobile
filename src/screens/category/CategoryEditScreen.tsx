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

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/category/CategoryEditScreenStyles';

export default function CategoryEditScreen({route, navigation}: any) {
  const {category} = route.params;

  const [formData, setFormData] = useState({
    ...category,
  });

  const [loading, setLoading] = useState(false);

  /**
   * HANDLE INPUT CHANGE
   */
  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  /**
   * UPDATE CATEGORY
   */
  const handleUpdate = async () => {
    if (
      !formData.categoryName?.trim() ||
      !formData.categoryDescription?.trim()
    ) {
      Alert.alert('Validation Error', 'All fields are required');
      return;
    }

    if (formData.categoryName.trim().length < 3) {
      Alert.alert(
        'Validation Error',
        'Category name must be at least 3 characters',
      );
      return;
    }

    try {
      setLoading(true);

      await api.put(`/categories/${formData._id}`, {
        categoryName: formData.categoryName,
        categoryDescription: formData.categoryDescription,
      });

      Alert.alert('Success', 'Category updated successfully');

      navigation.goBack();
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Session Expired', 'Please login again');

        navigation.replace('Login');
        return;
      }

      Alert.alert(
        'Update Failed',
        error.response?.data?.message || 'Failed to update category',
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE CATEGORY
   */
  const handleDelete = () => {
    Alert.alert('Delete Category', 'This action cannot be undone', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            setLoading(true);

            await api.delete(`/categories/${formData._id}`);

            Alert.alert('Deleted', 'Category removed successfully');

            navigation.goBack();
          } catch (error: any) {
            Alert.alert(
              'Delete Failed',
              error.response?.data?.message || 'Failed to delete category',
            );
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Edit Category" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit Category</Text>

          {/* NAME */}
          <Text style={styles.label}>Category Name</Text>
          <TextInput
            style={styles.input}
            value={formData.categoryName}
            placeholder="Category Name"
            onChangeText={text => handleChange('categoryName', text)}
          />

          {/* DESCRIPTION */}
          <Text style={styles.label}>Category Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={formData.categoryDescription}
            placeholder="Category Description"
            onChangeText={text => handleChange('categoryDescription', text)}
          />

          {/* ACTIONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={handleUpdate}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.updateText}>Save Changes</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={handleDelete}
              disabled={loading}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
