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
      category.categoryName
        ?.toLowerCase()
        .includes(text.toLowerCase()),
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
              await api.delete(
                `/categories/${category._id}`,
              );

              Alert.alert(
                'Success',
                'Category deleted successfully',
              );

              fetchCategories();
            } catch (error: any) {
              Alert.alert(
                'Delete Failed',
                error.response?.data?.message ||
                  'Failed to delete category',
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

  /**
   * DASHBOARD VALUES
   */
  const totalCategories = categories.length;

  const categoriesWithDescription = categories.filter(
    item => item.categoryDescription,
  ).length;

  const activeCategories = categories.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Categories"
          onBack={() => navigation.goBack()}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#f59e0b"
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            
            {/* HEADING */}
            <View style={styles.headingSection}>
              <Text style={styles.heading}>
                Category Overview
              </Text>
              <Text style={styles.subHeading}>
                Manage product categories and records
              </Text>
            </View>

            {/* SUMMARY CARDS */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  Total Categories
                </Text>
                <Text style={styles.summaryValue}>
                  {totalCategories}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  Active Categories
                </Text>
                <Text style={styles.summaryValue}>
                  {activeCategories}
                </Text>
              </View>
            </View>


            {/* QUICK ACTION */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() =>
                navigation.navigate('CategoryAdd')
              }>
              <Text style={styles.quickActionTitle}>
                Quick Action
              </Text>
              <Text style={styles.quickActionText}>
                Add New Category
              </Text>
              <Text style={styles.quickActionSub}>
                Tap here to create new product categories
              </Text>
            </TouchableOpacity>

           

            <Text style={styles.sectionTitle}>
              Category List
            </Text>

             {/* SEARCH */}
            <TextInput
              placeholder="Search by category name..."
              placeholderTextColor="#64748b"
              style={styles.searchInput}
              value={search}
              onChangeText={handleSearch}
            />

            {/* CATEGORY LIST */}
            {filteredCategories.map(category => (
              <View
                key={category._id}
                style={styles.card}>
                <Text style={styles.categoryName}>
                  {category.categoryName}
                </Text>

                

                <Text style={styles.categoryMeta}>
                  Description: {category.categoryDescription}
                </Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      styles.viewBtn,
                    ]}
                    onPress={() =>
                      navigation.navigate(
                        'CategoryDetails',
                        {category},
                      )
                    }>
                    <Text style={styles.btnText}>
                      View
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.btn,
                      styles.editBtn,
                    ]}
                    onPress={() =>
                      navigation.navigate(
                        'CategoryEdit',
                        {category},
                      )
                    }>
                    <Text style={styles.btnText}>
                      Edit
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.btn,
                      styles.deleteBtn,
                    ]}
                    onPress={() =>
                      handleDelete(category)
                    }>
                    <Text style={styles.btnText}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}