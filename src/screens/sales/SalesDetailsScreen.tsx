import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/sales/SalesDetailsScreenStyles';

export default function SalesDetailsScreen({route, navigation}: any) {
  const {id} = route.params;

  const [sale, setSale] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSaleDetails();
  }, []);

  const loadSaleDetails = async () => {
    try {
      setLoading(true);

      const res = await api.get(`/sales/${id}`);
      setSale(res.data);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load sale details',
      });
    } finally {
      setLoading(false);
    }
  };

  // LOADING SPINNER
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader
          title="Sale Details"
          onBack={() => navigation.goBack()}
        />

        <View style={styles.center}>
          <ActivityIndicator size="large" color="#f59e0b" />
        </View>
      </SafeAreaView>
    );
  }

  // NOT FOUND
  if (!sale) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader
          title="Sale Details"
          onBack={() => navigation.goBack()}
        />

        <View style={styles.center}>
          <Text>Sale not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const subtotal =
    sale.items?.reduce(
      (sum: number, item: any) =>
        sum +
        Number(item.unitPrice || item.price || 0) *
          Number(item.quantity || 0),
      0,
    ) || 0;

  const totalDiscount = Number(sale.discountTotal || 0);

  const finalTotal =
    Number(sale.finalTotal) ||
    Number(sale.totalAmount) ||
    subtotal - totalDiscount;

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        title="Sale Details"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.badge}>SALE DETAILS</Text>
          <Text style={styles.title}>Order Summary</Text>
          <Text style={styles.subtitle}>
            Admin sales management view
          </Text>
        </View>

        {/* SALE INFO */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sale Information</Text>

          <Text style={styles.infoText}>
            Invoice No: {sale.invoiceNumber || '-'}
          </Text>

          <Text style={styles.infoText}>
            Date:{' '}
            {sale.createdAt
              ? new Date(sale.createdAt).toLocaleString()
              : '-'}
          </Text>

          <Text style={styles.infoText}>
            Sale ID: {sale.saleId || '-'}
          </Text>
        </View>

        {/* ITEMS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Purchased Items</Text>

          {sale.items?.map((item: any, index: number) => {
            const price = Number(item.unitPrice || item.price || 0);
            const qty = Number(item.quantity || 0);
            const itemSubtotal = price * qty;

            return (
              <View key={index} style={styles.itemBox}>
                <Text style={styles.itemName}>
                  {item.itemId?.itemName || 'Item'}
                </Text>

                <Text style={styles.itemText}>Qty: {qty}</Text>

                <Text style={styles.itemText}>
                  Unit Price: Rs. {price.toLocaleString()}
                </Text>

                <Text style={styles.itemSubtotal}>
                  Subtotal: Rs. {itemSubtotal.toLocaleString()}
                </Text>
              </View>
            );
          })}
        </View>

        {/* PROMOTIONS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Applied Promotions</Text>

          {sale.promotions?.length > 0 ? (
            sale.promotions.map((promo: any, index: number) => (
              <View key={index} style={styles.promoBox}>
                <Text style={styles.promoName}>{promo.name}</Text>

                <Text style={styles.promoText}>
                  Type:{' '}
                  {promo.discountType === 'percentage'
                    ? `${promo.discountValue}%`
                    : `Rs. ${promo.discountValue}`}
                </Text>

                <Text style={styles.discountText}>
                  Discount: - Rs.{' '}
                  {Number(promo.amount).toLocaleString()}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noPromo}>
              No promotions applied
            </Text>
          )}
        </View>

        {/* TOTAL */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Summary</Text>

          <Text style={styles.summaryText}>
            Subtotal: Rs. {subtotal.toLocaleString()}
          </Text>

          <Text style={styles.discountText}>
            Total Discount: - Rs.{' '}
            {totalDiscount.toLocaleString()}
          </Text>

          <Text style={styles.finalTotal}>
            Final Total: Rs. {finalTotal.toLocaleString()}
          </Text>
        </View>

        {/* ACTION */}
        <TouchableOpacity
          style={styles.invoiceBtn}
          onPress={() => {
            Toast.show({
              type: 'success',
              text1: 'Opening Invoice',
              text2: 'Redirecting to invoice screen',
            });

            navigation.navigate('InvoiceScreen', {
              id: sale._id,
            });
          }}>
          <Text style={styles.invoiceBtnText}>
            View Invoice
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}