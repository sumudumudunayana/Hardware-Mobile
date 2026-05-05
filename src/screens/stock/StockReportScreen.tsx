import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {BarChart, PieChart, LineChart} from 'react-native-chart-kit';

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/stock/StockReportScreenStyles';

const screenWidth = Dimensions.get('window').width;
const LOW_STOCK_LIMIT = 10;

export default function StockReportScreen({navigation}: any) {
  const [stocks, setStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      setLoading(true);
      const res = await api.get('/stocks');
      setStocks(res.data || []);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load stock data',
      });
    } finally {
      setLoading(false);
    }
  };

  //  STRONG COLORS
  const chartConfig = {
    backgroundGradientFrom: '#ffffff',
    backgroundGradientTo: '#ffffff',
    decimalPlaces: 0,
    color: () => '#f59e0b',
    labelColor: () => '#0f172a',
    propsForBackgroundLines: {
      strokeDasharray: '4',
      stroke: '#e2e8f0',
    },
  };

  /* SUMMARY */
  const summary = useMemo(() => {
    const totalItems = stocks.reduce((sum, s) => sum + s.quantity, 0);

    const totalValue = stocks.reduce(
      (sum, s) => sum + s.quantity * (s.itemId?.itemCostPrice || 0),
      0,
    );

    const lowStock = stocks.filter(
      s => s.quantity > 0 && s.quantity <= LOW_STOCK_LIMIT,
    ).length;

    const outOfStock = stocks.filter(s => s.quantity === 0).length;

    const mostStock = [...stocks].sort((a, b) => b.quantity - a.quantity)[0];
    const leastStock = [...stocks].sort((a, b) => a.quantity - b.quantity)[0];

    return {
      totalItems,
      totalValue,
      lowStock,
      outOfStock,
      mostStock: mostStock?.itemId?.itemName || 'N/A',
      leastStock: leastStock?.itemId?.itemName || 'N/A',
    };
  }, [stocks]);

  /* CATEGORY */
  const categoryData = useMemo(() => {
    const grouped: any = {};

    stocks.forEach(s => {
      const category = s.itemId?.itemCategory || 'Other';
      grouped[category] = (grouped[category] || 0) + s.quantity;
    });

    return {
      labels: Object.keys(grouped),
      data: Object.values(grouped).map(v => Number(v)),
    };
  }, [stocks]);

  /* STATUS */
  const statusData = useMemo(() => {
    const available = stocks.filter(s => s.quantity > LOW_STOCK_LIMIT).length;
    const low = stocks.filter(
      s => s.quantity > 0 && s.quantity <= LOW_STOCK_LIMIT,
    ).length;
    const out = stocks.filter(s => s.quantity === 0).length;

    return [
      {
        name: 'Available',
        population: available,
        color: '#22c55e',
        legendFontColor: '#0f172a',
        legendFontSize: 13,
      },
      {
        name: 'Low',
        population: low,
        color: '#f59e0b',
        legendFontColor: '#0f172a',
        legendFontSize: 13,
      },
      {
        name: 'Out',
        population: out,
        color: '#ef4444',
        legendFontColor: '#0f172a',
        legendFontSize: 13,
      },
    ];
  }, [stocks]);

  /* MOVEMENT */
  const movementData = useMemo(() => {
    const grouped: any = {};

    stocks.forEach(s => {
      const d = new Date(s.updatedAt);
      const label = `${d.getMonth() + 1}/${d.getFullYear()}`;

      if (!grouped[label]) grouped[label] = 0;
      grouped[label] += s.quantity;
    });

    return {
      labels: Object.keys(grouped),
      data: Object.values(grouped).map(v => Number(v)),
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
        <AppHeader title="Stock Reports" onBack={() => navigation.goBack()} />

        <ScrollView contentContainerStyle={styles.scroll}>
          {/* SUMMARY */}
          <View style={styles.summaryGrid}>
            {[
              {label: 'Total Items', value: summary.totalItems},
              {
                label: 'Stock Value',
                value: `Rs. ${summary.totalValue.toLocaleString()}`,
              },
              {label: 'Low Stock', value: summary.lowStock},
              {label: 'Out of Stock', value: summary.outOfStock},
              {label: 'Highest Item', value: summary.mostStock},
              {label: 'Least Item', value: summary.leastStock},
            ].map((item, i) => (
              <View key={i} style={styles.card}>
                <Text style={styles.value}>{item.value}</Text>
                <Text style={styles.label}>{item.label}</Text>
              </View>
            ))}
          </View>

          {/* CATEGORY */}
          <Text style={styles.sectionTitle}>Stock by Category</Text>

          <View style={styles.chartContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <BarChart
                data={{
                  labels: categoryData.labels,
                  datasets: [{data: categoryData.data}],
                }}
                width={Math.max(screenWidth, categoryData.labels.length * 80)}
                height={250}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={chartConfig}
                fromZero
                showValuesOnTopOfBars
              />
            </ScrollView>
          </View>

          {/* STATUS */}
          <Text style={styles.sectionTitle}>Stock Status</Text>

          <View style={styles.chartContainer}>
            <PieChart
              data={statusData}
              width={screenWidth - 32}
              height={220}
              chartConfig={chartConfig}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>

          {/* MOVEMENT */}
          <Text style={styles.sectionTitle}>Monthly Movement</Text>

          <View style={styles.chartContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <LineChart
                data={{
                  labels: movementData.labels,
                  datasets: [{data: movementData.data}],
                }}
                width={Math.max(screenWidth, movementData.labels.length * 80)}
                height={250}
                chartConfig={chartConfig}
                bezier
              />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
