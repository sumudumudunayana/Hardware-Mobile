import React, {useEffect, useState, useCallback} from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Alert,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {useNavigation, useFocusEffect} from '@react-navigation/native';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/sales/NewSaleScreenStyles';

export default function NewSaleScreen() {
  const navigation = useNavigation<any>();

  const [products, setProducts] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const [cart, setCart] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);

  /**
   * LOAD ITEMS ONCE
   */
  useEffect(() => {
    loadItems();
  }, []);

  /**
   * RELOAD CART EVERY TIME SCREEN FOCUSES
   */
  useFocusEffect(
    useCallback(() => {
      loadCart();
    }, []),
  );

  /**
   * LOAD ITEMS + STOCK
   */
  const loadItems = async () => {
    try {
      const [itemRes, stockRes] = await Promise.all([
        api.get('/items'),
        api.get('/stocks'),
      ]);

      const stockMap: {
        [key: string]: number;
      } = {};

      stockRes.data.forEach((stock: any) => {
        const id = stock.itemId?._id || stock.itemId;

        if (!stockMap[id]) {
          stockMap[id] = 0;
        }

        stockMap[id] += Number(stock.quantity || 0);
      });

      const mergedProducts = itemRes.data.map((item: any) => ({
        ...item,
        quantity: stockMap[item._id] || 0,
      }));

      setProducts(mergedProducts);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to load items');
    }
  };

  /**
   * LOAD CART
   */
  const loadCart = async () => {
    try {
      const res = await api.get('/cart');
      const items = res.data.items || [];

      setCart(items);

      const totalCount = items.reduce(
        (sum: number, item: any) => sum + Number(item.quantity || 0),
        0,
      );

      setCartCount(totalCount);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to load cart');
    }
  };

  /**
   * ADD TO CART
   */
  const handleAdd = async (product: any) => {
    const cartItem = cart.find((c: any) => c.itemId === product._id);

    const currentQty = cartItem ? Number(cartItem.quantity) : 0;

    if (currentQty >= product.quantity) {
      Alert.alert('Warning', 'Stock limit reached');
      return;
    }

    try {
      await api.post('/cart/add', {
        itemId: product._id,
        name: product.itemName,
        price: product.itemSellingPrice,
      });

      await loadCart();

      Alert.alert('Success', 'Item added to cart');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to add item');
    }
  };

  /**
   * CATEGORY FILTER
   */
  const categories = [
    'All',
    ...new Set(products.map((p: any) => p.itemCategory)),
  ];

  const filteredProducts = products.filter((product: any) =>
    selectedCategory === 'All'
      ? true
      : product.itemCategory === selectedCategory,
  );

  /**
   * TOTAL PRICE
   */
  const totalPrice = cart.reduce(
    (total: number, item: any) =>
      total + Number(item.price) * Number(item.quantity),
    0,
  );

  /**
   * PRODUCT CARD
   */
  const renderProduct = ({item}: any) => (
    <View style={styles.card}>
      <Text style={styles.productName}>{item.itemName}</Text>

      <Text style={styles.price}>
        Rs. {Number(item.itemSellingPrice).toLocaleString()}
      </Text>

      <View style={styles.tag}>
        <Text style={styles.tagText}>{item.itemCategory}</Text>
      </View>

      <Text style={[styles.qty, item.quantity === 0 && styles.outStock]}>
        Qty: {item.quantity}
      </Text>

      {item.quantity > 0 && item.quantity <= 5 && (
        <Text style={styles.lowStock}>Low stock</Text>
      )}

      <TouchableOpacity
        style={[styles.addBtn, item.quantity === 0 && styles.disabledBtn]}
        disabled={item.quantity === 0}
        onPress={() => handleAdd(item)}>
        <Text style={styles.addBtnText}>
          {item.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="New Sale" onBack={() => navigation.goBack()} />

        {/* CATEGORY FILTER */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}>
          {categories.map((category: string) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryBtn,
                selectedCategory === category && styles.activeCategory,
              ]}
              onPress={() => setSelectedCategory(category)}>
              <Text style={styles.categoryText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Add Order Items</Text>

          <TouchableOpacity
            style={styles.cartBtn}
            onPress={() => navigation.navigate('CartScreen')}>
            <Text style={styles.cartText}>🛒 ({cartCount})</Text>
          </TouchableOpacity>
        </View>

        {/* TOTAL */}
        <Text style={styles.total}>
          Total: Rs. {totalPrice.toLocaleString()}
        </Text>

        {/* PRODUCT LIST */}
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item: any) => item._id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
}
