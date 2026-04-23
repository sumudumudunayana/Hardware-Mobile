import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import api from '../../api/api';
import styles from '../../styles/sales/InvoiceScreenStyles';

export default function InvoiceScreen({
  route,
  navigation,
}: any) {
  const {id} = route.params;

  const [sale, setSale] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoice();
  }, []);

  const loadInvoice = async () => {
    try {
      const res = await api.get(`/sales/${id}`);
      setSale(res.data);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to load invoice');
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading invoice...</Text>
      </View>
    );
  }

  if (!sale) {
    return (
      <View style={styles.center}>
        <Text>Invoice not found</Text>
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

  const discount = Number(sale.discountTotal || 0);

  const finalTotal =
    Number(sale.finalTotal) ||
    Number(sale.totalAmount) ||
    subtotal - discount;

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.badge}>INVOICE</Text>
        <Text style={styles.title}>
          Hardware Management
        </Text>
        <Text style={styles.subtitle}>
          Sales Receipt
        </Text>
      </View>

      {/* DETAILS */}
      <View style={styles.infoCard}>
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
      </View>

      {/* ITEMS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Purchased Items
        </Text>

        {sale.items?.map(
          (item: any, index: number) => {
            const price = Number(
              item.unitPrice || item.price || 0,
            );

            const qty = Number(item.quantity || 0);

            const sub = price * qty;

            return (
              <View
                key={index}
                style={styles.itemCard}>
                <Text style={styles.itemName}>
                  {item.itemId?.itemName ||
                    'Item'}
                </Text>

                <Text style={styles.itemText}>
                  Qty: {qty}
                </Text>

                <Text style={styles.itemText}>
                  Price: Rs.{' '}
                  {price.toLocaleString()}
                </Text>

                <Text style={styles.itemSubtotal}>
                  Subtotal: Rs.{' '}
                  {sub.toLocaleString()}
                </Text>
              </View>
            );
          },
        )}
      </View>

      {/* SUMMARY */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryText}>
          Subtotal: Rs.{' '}
          {subtotal.toLocaleString()}
        </Text>

        {sale.promotions?.map(
          (promo: any, index: number) => (
            <Text
              key={index}
              style={styles.discountText}>
              {promo.name} (
              {promo.discountType ===
              'percentage'
                ? `${promo.discountValue}%`
                : `Rs. ${promo.discountValue}`}
              ) : - Rs.{' '}
              {Number(
                promo.amount,
              ).toLocaleString()}
            </Text>
          ),
        )}

        {discount > 0 && (
          <Text style={styles.discountText}>
            Total Discount: - Rs.{' '}
            {discount.toLocaleString()}
          </Text>
        )}

        <Text style={styles.totalText}>
          Final Total: Rs.{' '}
          {finalTotal.toLocaleString()}
        </Text>
      </View>

      {/* ACTIONS */}
      <TouchableOpacity
        style={styles.doneBtn}
        onPress={() =>
          navigation.navigate('NewSaleScreen')
        }>
        <Text style={styles.doneText}>
          Done
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}