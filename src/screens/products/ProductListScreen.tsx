import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import ConfirmDialog from '../../components/ConfirmDialog';
import styles from '../../styles/products/ProductListScreenStyles';
import {useFocusEffect} from '@react-navigation/native';

export default function ProductListScreen({navigation}: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showDialog, setShowDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  // ✅ NEW: search state
  const [searchQuery, setSearchQuery] = useState('');

  // FETCH PRODUCTS + CATEGORIES
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const [productsRes, categoriesRes] = await Promise.all([
        api.get('/items'),
        api.get('/categories'),
      ]);

      const formatted = productsRes.data.map((item: any) => ({
        id: item._id,
        itemId: item.itemId,
        itemName: item.itemName,
        itemDescription: item.itemDescription,
        itemCategory: item.itemCategory,
        itemCostPrice: item.itemCostPrice,
        itemSellingPrice: item.itemSellingPrice,
        itemLabeledPrice: item.itemLabeledPrice,
        itemCompany: item.itemCompany,
        itemDistributor: item.itemDistributor,

        // UI aliases
        name: item.itemName,
        price: Number(item.itemSellingPrice || 0),
        category: item.itemCategory,
        company: item.itemCompany,
        supplier: item.itemDistributor,
      }));

      setProducts(formatted);
      setCategories(categoriesRes.data);
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
          error.response?.data?.message || 'Failed to fetch data',
      });
    } finally {
      setLoading(false);
    }
  };

  // AUTO REFRESH ON FOCUS
  useFocusEffect(
    useCallback(() => {
      fetchProducts();
    }, [])
  );

  // OPEN DELETE DIALOG
  const openDeleteDialog = (item: any) => {
    setSelectedProduct(item);
    setShowDialog(true);
  };

  // DASHBOARD VALUES
  const totalProducts = products.length;
  const totalCategories = categories.length;

  // ✅ FILTERED PRODUCTS
  const filteredProducts = products.filter(item => {
    const query = searchQuery.toLowerCase();

    return (
      item.name?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query) ||
      item.company?.toLowerCase().includes(query)
    );
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Products" onBack={() => navigation.goBack()} />

        {loading ? (
          <ActivityIndicator size="large" color="#f59e0b" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            
            {/* HEADER */}
            <View style={styles.headingSection}>
              <Text style={styles.heading}>Inventory Overview</Text>
              <Text style={styles.subHeading}>
                Manage products and stock quickly
              </Text>
            </View>

            {/* SUMMARY */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Total Products</Text>
                <Text style={styles.summaryValue}>{totalProducts}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Categories</Text>
                <Text style={styles.summaryValue}>{totalCategories}</Text>
              </View>
            </View>

            {/* QUICK ACTION */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('ProductAdd')}>
              <Text style={styles.quickActionTitle}>Quick Action</Text>
              <Text style={styles.quickActionText}>Add New Product</Text>
              <Text style={styles.quickActionSub}>
                Tap here to register new product
              </Text>
            </TouchableOpacity>

            {/* LIST */}
            <Text style={styles.sectionTitle}>Product List</Text>

            {/* 🔍 SEARCH BAR */}
            <TextInput
              placeholder="Search by name, category, company..."
              style={{
                backgroundColor: '#fff',
                padding: 12,
                borderRadius: 10,
                marginBottom: 12,
                borderWidth: 1,
                borderColor: '#e2e8f0',
              }}
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#64748b"
            />

            {/* PRODUCTS */}
            {filteredProducts.map(item => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.productName}>{item.name}</Text>

                <Text style={styles.productMeta}>
                  Price: Rs. {item.price}
                </Text>

                <Text style={styles.productMeta}>
                  Category: {item.category}
                </Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.btn, styles.viewBtn]}
                    onPress={() =>
                      navigation.navigate('ProductDetails', {item})
                    }>
                    <Text style={styles.btnText}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.editBtn]}
                    onPress={() =>
                      navigation.navigate('ProductEdit', {item})
                    }>
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.deleteBtn]}
                    onPress={() => openDeleteDialog(item)}>
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            {/* EMPTY STATE */}
            {filteredProducts.length === 0 && (
              <Text style={{textAlign: 'center', marginTop: 20, color: '#64748b'}}>
                No products found
              </Text>
            )}
          </ScrollView>
        )}
      </View>

      {/* CONFIRM DIALOG */}
      <ConfirmDialog
        visible={showDialog}
        title="Delete Product"
        message={`Are you sure you want to delete "${selectedProduct?.name}"?`}
        onCancel={() => setShowDialog(false)}
        onConfirm={async () => {
          try {
            await api.delete(`/items/${selectedProduct.id}`);

            Toast.show({
              type: 'success',
              text1: 'Deleted',
              text2: 'Product deleted successfully',
            });

            setShowDialog(false);
            fetchProducts();
          } catch (error: any) {
            Toast.show({
              type: 'error',
              text1: 'Delete Failed',
              text2:
                error.response?.data?.message ||
                'Failed to delete product',
            });
          }
        }}
      />
    </SafeAreaView>
  );
}