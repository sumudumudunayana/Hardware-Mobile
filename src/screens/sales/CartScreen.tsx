import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/sales/CartScreenStyles';

export default function CartScreen() {
  const navigation = useNavigation<any>();

  const [cart, setCart] = useState<any[]>([]);
  const [promotions, setPromotions] = useState<any[]>([]);
  const [appliedPromotions, setAppliedPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCart();
    loadPromotions();
  }, []);

  useEffect(() => {
    applyPromotions();
  }, [cart, promotions]);

  // LOAD CART
  const loadCart = async () => {
    try {
      const res = await api.get('/cart');
      setCart(res.data.items || []);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to load cart');
    }
  };

  // LOAD PROMOTIONS
  const loadPromotions = async () => {
    try {
      const res = await api.get('/promotions');
      setPromotions(res.data || []);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to load promotions');
    }
  };

  // APPLY PROMOTIONS
  const applyPromotions = () => {
    if (!cart.length || !promotions.length) {
      setAppliedPromotions([]);
      return;
    }

    const now = new Date();

    const subtotal = cart.reduce(
      (sum, item) =>
        sum + Number(item.price) * Number(item.quantity),
      0,
    );

    let runningTotal = subtotal;
    let applied: any[] = [];

    const activePromotions = promotions.filter(
      (p: any) =>
        p.status === 'active' &&
        new Date(p.startDate) <= now &&
        new Date(p.endDate) >= now,
    );

    const percentagePromos = activePromotions.filter(
      (p: any) => p.discountType === 'percentage',
    );

    const fixedPromos = activePromotions.filter(
      (p: any) => p.discountType === 'fixed',
    );

    // percentage first
    percentagePromos.forEach((promo: any) => {
      const amount =
        (runningTotal * Number(promo.discountValue)) / 100;

      if (amount > 0) {
        runningTotal -= amount;

        applied.push({
          ...promo,
          amount,
        });
      }
    });

    // fixed after percentage
    fixedPromos.forEach((promo: any) => {
      let amount = Number(promo.discountValue);

      if (amount > runningTotal) {
        amount = runningTotal;
      }

      if (amount > 0) {
        runningTotal -= amount;

        applied.push({
          ...promo,
          amount,
        });
      }
    });

    setAppliedPromotions(applied);
  };

  // INCREASE QTY
  const increaseQty = async (item: any) => {
    try {
      await api.put('/cart/update', {
        itemId: item.itemId,
        quantity: Number(item.quantity) + 1,
      });

      loadCart();
    } catch {
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  // DECREASE QTY
  const decreaseQty = async (item: any) => {
    try {
      const newQty = Number(item.quantity) - 1;

      if (newQty <= 0) {
        await api.delete(`/cart/remove/${item.itemId}`);
      } else {
        await api.put('/cart/update', {
          itemId: item.itemId,
          quantity: newQty,
        });
      }

      loadCart();
    } catch {
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  // TYPE INPUT
  const updateQtyInput = (item: any, value: string) => {
    if (value === '') {
      setCart(prev =>
        prev.map(i =>
          i.itemId === item.itemId
            ? {...i, quantity: ''}
            : i,
        ),
      );
      return;
    }

    const qty = Number(value);

    if (isNaN(qty) || qty < 0) {
      return;
    }

    setCart(prev =>
      prev.map(i =>
        i.itemId === item.itemId
          ? {...i, quantity: value}
          : i,
      ),
    );
  };

  // SAVE INPUT
  const saveQtyInput = async (item: any) => {
    const qty = Number(item.quantity);

    if (isNaN(qty) || qty <= 0) {
      Alert.alert(
        'Error',
        'Quantity must be greater than 0',
      );
      loadCart();
      return;
    }

    try {
      await api.put('/cart/update', {
        itemId: item.itemId,
        quantity: qty,
      });

      loadCart();
    } catch {
      Alert.alert('Error', 'Failed to update quantity');
    }
  };

  // CALCULATIONS
  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price) * Number(item.quantity),
      0,
    );
  }, [cart]);

  const totalDiscount = useMemo(() => {
    return appliedPromotions.reduce(
      (sum, promo) => sum + Number(promo.amount),
      0,
    );
  }, [appliedPromotions]);

  const finalTotal = Math.max(
    subtotal - totalDiscount,
    0,
  );

  // COMPLETE SALE
  const generateInvoice = async () => {
    if (cart.length === 0) {
      Alert.alert('Warning', 'Cart is empty');
      return;
    }

    if (loading) return;

    setLoading(true);

    try {
      const payload = {
        items: cart.map(item => ({
          itemId: item.itemId || item._id,
          quantity: Number(item.quantity),
          price: Number(item.price),
        })),
        subtotal,
        discount: totalDiscount,
        total: finalTotal,
      };

      const res = await api.post('/sales', payload);

      await api.delete('/cart/clear');

      const id = res.data._id || res.data.saleId;

      if (!id) {
        Alert.alert(
          'Error',
          'Sale created but ID missing',
        );
        return;
      }

      Alert.alert('Success', 'Sale completed');

      navigation.navigate('InvoiceScreen', {
        id,
      });
    } catch (error: any) {
      console.log(error);

      Alert.alert(
        'Error',
        error.response?.data?.message ||
          'Sale failed',
      );
    }

    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Shopping Cart"
          onBack={() => navigation.goBack()}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {cart.length === 0 ? (
            <Text style={styles.empty}>
              Your cart is empty
            </Text>
          ) : (
            <>
              {cart.map((item: any) => (
                <View
                  key={item.itemId}
                  style={styles.card}>
                  <Text style={styles.name}>
                    {item.name}
                  </Text>

                  <View style={styles.qtyRow}>
                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() =>
                        decreaseQty(item)
                      }>
                      <Text>-</Text>
                    </TouchableOpacity>

                    <TextInput
                      style={styles.qtyInput}
                      keyboardType="numeric"
                      value={String(item.quantity)}
                      onChangeText={text =>
                        updateQtyInput(item, text)
                      }
                      onBlur={() =>
                        saveQtyInput(item)
                      }
                    />

                    <TouchableOpacity
                      style={styles.qtyBtn}
                      onPress={() =>
                        increaseQty(item)
                      }>
                      <Text>+</Text>
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.price}>
                    Rs.{' '}
                    {(
                      Number(item.price) *
                      Number(item.quantity)
                    ).toLocaleString()}
                  </Text>
                </View>
              ))}

              <View style={styles.summary}>
                <Text style={styles.summaryText}>
                  Subtotal: Rs.{' '}
                  {subtotal.toLocaleString()}
                </Text>

                {appliedPromotions.map(
                  (promo: any, index: number) => (
                    <Text
                      key={index}
                      style={styles.discount}>
                      {promo.promotionName} :
                      - Rs.{' '}
                      {Number(
                        promo.amount,
                      ).toLocaleString()}
                    </Text>
                  ),
                )}

                <Text style={styles.total}>
                  Total: Rs.{' '}
                  {finalTotal.toLocaleString()}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.primaryBtn}
                onPress={generateInvoice}>
                <Text style={styles.primaryText}>
                  {loading
                    ? 'Processing...'
                    : 'Complete Sale'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.secondaryBtn}
                onPress={() =>
                  navigation.goBack()
                }>
                <Text style={styles.secondaryText}>
                  Continue Shopping
                </Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}