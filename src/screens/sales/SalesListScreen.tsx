import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import api from '../../api/api';
import styles from '../../styles/sales/SalesListScreenStyles';
import AppHeader from '../../components/AppHeader';

export default function SalesListScreen({
  navigation,
}: any) {
  const [sales, setSales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * LOAD SALES
   */
  const loadSales = async () => {
    try {
      const res = await api.get('/sales');
      setSales(res.data || []);
    } catch (error) {
      console.log(error);
      Alert.alert(
        'Error',
        'Failed to load sales data',
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * FIRST LOAD
   */
  useEffect(() => {
    loadSales();
  }, []);

  /**
   * RELOAD WHEN SCREEN COMES BACK INTO FOCUS
   * This fixes latest invoice not updating immediately
   */
  useFocusEffect(
    useCallback(() => {
      loadSales();
    }, []),
  );

  /**
   * CALCULATIONS
   */
  const totalRevenue = sales.reduce(
    (sum, sale) =>
      sum + Number(sale.totalAmount || 0),
    0,
  );

  const totalOrders = sales.length;

  /**
   * ALWAYS GET LATEST SALE
   */
  const latestSale =
    sales.length > 0
      ? [...sales].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime(),
        )[0]
      : null;

  /**
   * LOADING STATE
   */
  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading sales...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title="Sales Management"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.badge}>
            SALES CENTER
          </Text>

          <Text style={styles.title}>
            Sales Management
          </Text>

          <Text style={styles.subtitle}>
            Manage orders, invoices and checkout
          </Text>
        </View>

        {/* SUMMARY CARDS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statLabel}>
              Orders
            </Text>

            <Text style={styles.statValue}>
              {totalOrders}
            </Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statLabel}>
              Revenue
            </Text>

            <Text style={styles.statValue}>
              Rs.{' '}
              {totalRevenue.toLocaleString()}
            </Text>
          </View>
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>
            Quick Actions
          </Text>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() =>
              navigation.navigate(
                'NewSaleScreen',
              )
            }>
            <Text style={styles.actionText}>
              ➕ Start New Sale
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() =>
              navigation.navigate(
                'SalesHistoryScreen',
              )
            }>
            <Text style={styles.actionText}>
              📜 Sales History
            </Text>
          </TouchableOpacity>
        </View>

        {/* LATEST SALE */}
        {latestSale && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Latest Invoice
            </Text>

            <Text style={styles.invoiceText}>
              {latestSale.invoiceNumber}
            </Text>

            <Text style={styles.metaText}>
              {new Date(
                latestSale.createdAt,
              ).toLocaleString()}
            </Text>

            <Text style={styles.totalText}>
              Rs.{' '}
              {Number(
                latestSale.totalAmount || 0,
              ).toLocaleString()}
            </Text>

            <TouchableOpacity
              style={styles.invoiceBtn}
              onPress={() =>
                navigation.navigate(
                  'InvoiceScreen',
                  {
                    id: latestSale._id,
                  },
                )
              }>
              <Text
                style={
                  styles.invoiceBtnText
                }>
                View Invoice
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}