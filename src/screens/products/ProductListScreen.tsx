import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/products/ProductListScreenStyles';

export default function ProductListScreen({navigation}: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * FETCH PRODUCTS
   */
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await api.get('/items');

      // Fetch FULL backend data
      const formatted = res.data.map((item: any) => ({
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

        // UI-friendly aliases
        name: item.itemName,
        price: Number(item.itemSellingPrice || 0),
        category: item.itemCategory,
        company: item.itemCompany,
        supplier: item.itemDistributor,
      }));

      setProducts(formatted);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Session Expired', 'Please login again');
        navigation.replace('Login');
        return;
      }

      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to fetch products',
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /**
   * DELETE PRODUCT
   */
  const handleDelete = (item: any) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${item.name}"?`,
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
              await api.delete(`/items/${item.id}`);

              Alert.alert('Success', 'Product deleted successfully');

              fetchProducts();
            } catch (error: any) {
              Alert.alert(
                'Delete Failed',
                error.response?.data?.message || 'Failed to delete product',
              );
            }
          },
        },
      ],
    );
  };

  /**
   * DASHBOARD VALUES
   */
  const totalProducts = products.length;

  const totalCategories = new Set(
    products.map(item => item.category).filter(Boolean),
  ).size;

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
            {/* PAGE HEADING */}
            <View style={styles.headingSection}>
              <Text style={styles.heading}>Inventory Overview</Text>
              <Text style={styles.subHeading}>
                Manage products and stock quickly
              </Text>
            </View>

            {/* SUMMARY CARDS */}
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

            {/* QUICK ACTION CARD */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('ProductAdd')}>
              <Text style={styles.quickActionTitle}>Quick Action</Text>

              <Text style={styles.quickActionText}>Add New Product</Text>

              <Text style={styles.quickActionSub}>
                Tap here to register new product
              </Text>
            </TouchableOpacity>

            {/* PRODUCT LIST */}
            <Text style={styles.sectionTitle}>Product List</Text>

            {products.map(item => (
              <View key={item.id} style={styles.card}>
                <Text style={styles.productName}>{item.name}</Text>

                <Text style={styles.productMeta}>Price: Rs. {item.price}</Text>

                <Text style={styles.productMeta}>
                  Category: {item.category}
                </Text>

                <View style={styles.buttonRow}>
                  {/* VIEW */}
                  <TouchableOpacity
                    style={[styles.btn, styles.viewBtn]}
                    onPress={() =>
                      navigation.navigate('ProductDetails', {item})
                    }>
                    <Text style={styles.btnText}>View</Text>
                  </TouchableOpacity>

                  {/* EDIT */}
                  <TouchableOpacity
                    style={[styles.btn, styles.editBtn]}
                    onPress={() => navigation.navigate('ProductEdit', {item})}>
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>

                  {/* DELETE */}
                  <TouchableOpacity
                    style={[styles.btn, styles.deleteBtn]}
                    onPress={() => handleDelete(item)}>
                    <Text style={styles.btnText}>Delete</Text>
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
