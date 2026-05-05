import React, {useEffect, useMemo, useState} from 'react';
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
import styles from '../../styles/stock/LowStockAlertScreenStyles';

export default function LowStockAlertScreen({navigation}: any) {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  const LOW_LIMIT = 10;
  const CRITICAL_LIMIT = 5;

  useEffect(() => {
    loadStocks();
  }, []);

  const loadStocks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/stocks');
      setStocks(res.data);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load stock alerts',
      });
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (qty: number) => {
    if (qty === 0) return 'OUT';
    if (qty <= CRITICAL_LIMIT) return 'CRITICAL';
    return 'LOW';
  };

  const getStatusLabel = (qty: number) => {
    if (qty === 0) return 'Out of Stock';
    if (qty <= CRITICAL_LIMIT) return 'Critical';
    return 'Low';
  };

  const getStatusStyle = (qty: number) => {
    if (qty === 0) return styles.statusOut;
    if (qty <= CRITICAL_LIMIT) return styles.statusCritical;
    return styles.statusLow;
  };

  // FILTERED DATA
  const alertStocks = useMemo(() => {
    let data = stocks.filter(s => s.quantity <= LOW_LIMIT);

    if (filter !== 'ALL') {
      data = data.filter(s => getStatus(s.quantity) === filter);
    }

    const priority: any = {OUT: 1, CRITICAL: 2, LOW: 3};

    return data.sort(
      (a, b) =>
        priority[getStatus(a.quantity)] - priority[getStatus(b.quantity)],
    );
  }, [stocks, filter]);

  // SUMMARY
  const summary = useMemo(() => {
    return {
      low: stocks.filter(
        s => s.quantity > CRITICAL_LIMIT && s.quantity <= LOW_LIMIT,
      ).length,

      critical: stocks.filter(
        s => s.quantity > 0 && s.quantity <= CRITICAL_LIMIT,
      ).length,

      out: stocks.filter(s => s.quantity === 0).length,

      reorder: stocks.filter(s => s.quantity <= LOW_LIMIT).length,
    };
  }, [stocks]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#f59e0b" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Low Stock Alerts"
          onBack={() => navigation.goBack()}
        />

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* FILTERS */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterScroll}>
            {['ALL', 'OUT', 'CRITICAL', 'LOW'].map(f => (
              <TouchableOpacity
                key={f}
                style={[styles.filterBtn, filter === f && styles.filterActive]}
                onPress={() => setFilter(f)}>
                <Text
                  style={[
                    styles.filterText,
                    filter === f && styles.filterTextActive,
                  ]}>
                  {f === 'OUT'
                    ? 'Out of Stock'
                    : f === 'CRITICAL'
                    ? 'Critical'
                    : f === 'LOW'
                    ? 'Low'
                    : 'All'}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* SUMMARY */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.value}>{summary.low}</Text>
              <Text style={styles.label}>Low</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.value}>{summary.critical}</Text>
              <Text style={styles.label}>Critical</Text>
            </View>
          </View>

          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.value}>{summary.out}</Text>
              <Text style={styles.label}>Out</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.value}>{summary.reorder}</Text>
              <Text style={styles.label}>Reorder</Text>
            </View>
          </View>

          {/* LIST */}
          {alertStocks.map((item: any) => (
            <View key={item._id} style={styles.card}>
              {/* LEFT SIDE */}
              <View style={styles.left}>
                <Text style={styles.name}>{item.itemId?.itemName}</Text>

                <Text style={styles.qty}>Qty: {item.quantity}</Text>
              </View>

              {/* RIGHT SIDE */}
              <View style={getStatusStyle(item.quantity)}>
                <Text style={styles.statusText}>
                  {getStatusLabel(item.quantity)}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
