import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import api from '../../api/api';
import styles from '../../styles/sales/SalesDetailsScreenStyles';

export default function SalesDetailsScreen({
  route,
  navigation,
}: any) {
  const {id} = route.params;

  const [sale, setSale] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSaleDetails();
  }, []);

  const loadSaleDetails = async () => {
    try {
      const res = await api.get(`/sales/${id}`);
      setSale(res.data);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Error',
        'Failed to load sale details',
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading sale details...</Text>
      </View>
    );
  }

  if (!sale) {
    return (
      <View style={styles.center}>
        <Text>Sale not found</Text>
      </View>
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

  const totalDiscount = Number(
    sale.discountTotal || 0,
  );

  const finalTotal =
    Number(sale.finalTotal) ||
    Number(sale.totalAmount) ||
    subtotal - totalDiscount;

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.badge}>
          SALE DETAILS
        </Text>

        <Text style={styles.title}>
          Order Summary
        </Text>

        <Text style={styles.subtitle}>
          Admin sales management view
        </Text>
      </View>

      {/* SALE INFO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Sale Information
        </Text>

        <Text style={styles.infoText}>
          Invoice No: {sale.invoiceNumber || '-'}
        </Text>

        <Text style={styles.infoText}>
          Date:{' '}
          {sale.createdAt
            ? new Date(
                sale.createdAt,
              ).toLocaleString()
            : '-'}
        </Text>

        <Text style={styles.infoText}>
          Sale ID: {sale.saleId || '-'}
        </Text>
      </View>

      {/* ITEMS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Purchased Items
        </Text>

        {sale.items?.map(
          (item: any, index: number) => {
            const price = Number(
              item.unitPrice || item.price || 0,
            );

            const qty = Number(item.quantity || 0);

            const itemSubtotal =
              price * qty;

            return (
              <View
                key={index}
                style={styles.itemBox}>
                <Text style={styles.itemName}>
                  {item.itemId?.itemName ||
                    'Item'}
                </Text>

                <Text style={styles.itemText}>
                  Qty: {qty}
                </Text>

                <Text style={styles.itemText}>
                  Unit Price: Rs.{' '}
                  {price.toLocaleString()}
                </Text>

                <Text
                  style={styles.itemSubtotal}>
                  Subtotal: Rs.{' '}
                  {itemSubtotal.toLocaleString()}
                </Text>
              </View>
            );
          },
        )}
      </View>

      {/* PROMOTIONS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Applied Promotions
        </Text>

        {sale.promotions?.length > 0 ? (
          sale.promotions.map(
            (promo: any, index: number) => (
              <View
                key={index}
                style={styles.promoBox}>
                <Text style={styles.promoName}>
                  {promo.name}
                </Text>

                <Text style={styles.promoText}>
                  Type:{' '}
                  {promo.discountType ===
                  'percentage'
                    ? `${promo.discountValue}%`
                    : `Rs. ${promo.discountValue}`}
                </Text>

                <Text
                  style={styles.discountText}>
                  Discount: - Rs.{' '}
                  {Number(
                    promo.amount,
                  ).toLocaleString()}
                </Text>
              </View>
            ),
          )
        ) : (
          <Text style={styles.noPromo}>
            No promotions applied
          </Text>
        )}
      </View>

      {/* TOTAL SUMMARY */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Payment Summary
        </Text>

        <Text style={styles.summaryText}>
          Subtotal: Rs.{' '}
          {subtotal.toLocaleString()}
        </Text>

        <Text style={styles.discountText}>
          Total Discount: - Rs.{' '}
          {totalDiscount.toLocaleString()}
        </Text>

        <Text style={styles.finalTotal}>
          Final Total: Rs.{' '}
          {finalTotal.toLocaleString()}
        </Text>
      </View>

      {/* ACTION */}
      <TouchableOpacity
        style={styles.invoiceBtn}
        onPress={() =>
          navigation.navigate(
            'InvoiceScreen',
            {
              id: sale._id,
            },
          )
        }>
        <Text style={styles.invoiceBtnText}>
          View Invoice
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}