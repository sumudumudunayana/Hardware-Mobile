import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/category/CategoryListScreenStyles';

export default function CategoryListScreen({navigation}: any) {
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  /**
   * FETCH CATEGORIES
   */
  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await api.get('/categories');

      setCategories(res.data);
      setFilteredCategories(res.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Session Expired', 'Please login again');

        navigation.replace('Login');
        return;
      }

      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to fetch categories',
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * SEARCH
   */
  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = categories.filter(category =>
      category.categoryName?.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredCategories(filtered);
  };

  /**
   * DELETE
   */
  const handleDelete = (category: any) => {
    Alert.alert(
      'Delete Category',
      `Are you sure you want to delete "${category.categoryName}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/categories/${category._id}`);

              Alert.alert('Success', 'Category deleted successfully');

              fetchCategories();
            } catch (error: any) {
              Alert.alert(
                'Delete Failed',
                error.response?.data?.message || 'Failed to delete category',
              );
            }
          },
        },
      ],
    );
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Categories" onBack={() => navigation.goBack()} />

        {/* SEARCH */}
        <TextInput
          placeholder="Search by category name..."
          placeholderTextColor="#64748b"
          style={styles.searchInput}
          value={search}
          onChangeText={handleSearch}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#f59e0b" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {filteredCategories.map(category => (
              <View key={category._id} style={styles.card}>
                <Text style={styles.categoryName}>{category.categoryName}</Text>

                <Text style={styles.categoryMeta}>
                  ID: {category.categoryId}
                </Text>

                <Text style={styles.categoryMeta}>
                  Description: {category.categoryDescription}
                </Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.btn, styles.viewBtn]}
                    onPress={() =>
                      navigation.navigate('CategoryDetails', {category})
                    }>
                    <Text style={styles.btnText}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.editBtn]}
                    onPress={() =>
                      navigation.navigate('CategoryEdit', {category})
                    }>
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.deleteBtn]}
                    onPress={() => handleDelete(category)}>
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* FAB */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('CategoryAdd')}>
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
