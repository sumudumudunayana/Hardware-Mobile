import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import ConfirmDialog from '../../components/ConfirmDialog';
import styles from '../../styles/category/CategoryListScreenStyles';

export default function CategoryListScreen({navigation}: any) {
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const [showDialog, setShowDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);

      const res = await api.get('/categories');

      setCategories(res.data);
      setFilteredCategories(res.data);
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
        text1: 'Error',
        text2:
          error.response?.data?.message ||
          'Failed to fetch categories',
      });
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCategories();
    }, []),
  );

  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = categories.filter(category =>
      category.categoryName
        ?.toLowerCase()
        .includes(text.toLowerCase()),
    );

    setFilteredCategories(filtered);
  };

  const openDeleteDialog = (category: any) => {
    setSelectedCategory(category);
    setShowDialog(true);
  };

  const totalCategories = categories.length;
  const activeCategories = categories.length;

  return (
    <View style={{flex: 1, backgroundColor: '#ffffffcd'}}>
      
      {/* ✅ GLOW BACKGROUND */}
      <View style={styles.glowPrimary} />
      <View style={styles.glowSecondary} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <AppHeader title="Categories" onBack={() => navigation.goBack()} />

          {loading ? (
            <View style={{marginTop: 40}}>
              <ActivityIndicator size="large" color="#f59e0b" />
            </View>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}>
              
              {/* HEADER */}
              <View style={styles.headingSection}>
                <Text style={styles.heading}>Category Overview</Text>
                <Text style={styles.subHeading}>
                  Manage product categories and records
                </Text>
              </View>

              {/* SUMMARY */}
              <View style={styles.summaryRow}>
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryLabel}>Total Categories</Text>
                  <Text style={styles.summaryValue}>{totalCategories}</Text>
                </View>

                <View style={styles.summaryCard}>
                  <Text style={styles.summaryLabel}>Active Categories</Text>
                  <Text style={styles.summaryValue}>{activeCategories}</Text>
                </View>
              </View>

              {/* QUICK ACTION */}
              <TouchableOpacity
                style={styles.quickActionCard}
                onPress={() => navigation.navigate('CategoryAdd')}>
                <Text style={styles.quickActionTitle}>Quick Action</Text>
                <Text style={styles.quickActionText}>Add New Category</Text>
                <Text style={styles.quickActionSub}>
                  Tap here to create new product categories
                </Text>
              </TouchableOpacity>

              <Text style={styles.sectionTitle}>Category List</Text>

              {/* SEARCH */}
              <TextInput
                placeholder="Search by category name..."
                placeholderTextColor="#64748b"
                style={styles.searchInput}
                value={search}
                onChangeText={handleSearch}
              />

              {/* LIST */}
              {filteredCategories.map(category => (
                <View key={category._id} style={styles.card}>
                  <Text style={styles.categoryName}>
                    {category.categoryName}
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
                      onPress={() => openDeleteDialog(category)}>
                      <Text style={styles.btnText}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </ScrollView>
          )}
        </View>

        {/* CONFIRM DIALOG */}
        <ConfirmDialog
          visible={showDialog}
          title="Delete Category"
          message={`This will permanently delete "${selectedCategory?.categoryName}".\n\nThis action cannot be undone.`}
          onCancel={() => setShowDialog(false)}
          onConfirm={async () => {
            try {
              await api.delete(`/categories/${selectedCategory._id}`);

              Toast.show({
                type: 'success',
                text1: 'Category Deleted',
                text2: 'Category removed successfully',
              });

              setShowDialog(false);
              fetchCategories();
            } catch (error: any) {
              Toast.show({
                type: 'error',
                text1: 'Delete Failed',
                text2:
                  error.response?.data?.message ||
                  'Failed to delete category',
              });
            }
          }}
        />
      </SafeAreaView>
    </View>
  );
}