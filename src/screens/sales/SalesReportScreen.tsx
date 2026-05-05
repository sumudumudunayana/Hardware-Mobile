import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {BarChart, PieChart} from 'react-native-chart-kit';

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/sales/SalesReportScreenStyles';

const screenWidth = Dimensions.get('window').width;

export default function SalesReportScreen({navigation}: any) {
  const [sales, setSales] = useState<any[]>([]);
  const [filterType, setFilterType] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const res = await api.get('/sales');
      setSales(res.data);
    } catch {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load sales data',
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredSales = useMemo(() => {
    const now = new Date();

    return sales.filter(sale => {
      const saleDate = new Date(sale.createdAt);

      if (filterType === 'today') {
        return saleDate.toDateString() === now.toDateString();
      }

      if (filterType === 'week') {
        const last7 = new Date();
        last7.setDate(now.getDate() - 7);
        return saleDate >= last7;
      }

      if (filterType === 'month') {
        return (
          saleDate.getMonth() === now.getMonth() &&
          saleDate.getFullYear() === now.getFullYear()
        );
      }

      return true;
    });
  }, [sales, filterType]);

  const totalSales = useMemo(
    () => filteredSales.reduce((sum, s) => sum + Number(s.totalAmount || 0), 0),
    [filteredSales],
  );

  const totalOrders = filteredSales.length;

  const salesByDate = useMemo(() => {
    const grouped: any = {};

    filteredSales.forEach(sale => {
      const d = new Date(sale.createdAt);
      const label = `${d.getDate()}/${d.getMonth() + 1}`;

      if (!grouped[label]) grouped[label] = 0;
      grouped[label] += Number(sale.totalAmount || 0);
    });

    return {
      labels: Object.keys(grouped),
      data: Object.values(grouped).map(v => Number(v)),
    };
  }, [filteredSales]);

  const salesByCategory = useMemo(() => {
    const grouped: any = {};

    filteredSales.forEach(sale => {
      sale.items?.forEach((item: any) => {
        const category = item.itemId?.itemCategory || 'Other';

        const value =
          Number(item.subtotal) ||
          Number(item.unitPrice || 0) * Number(item.quantity || 0);

        if (!grouped[category]) grouped[category] = 0;
        grouped[category] += value;
      });
    });

    return Object.entries(grouped).map(([name, value], index) => ({
      name,
      population: value,
      color: ['#f59e0b', '#10b981', '#6366f1', '#ef4444'][index % 4],
      legendFontColor: '#0f172a',
      legendFontSize: 13,
    }));
  }, [filteredSales]);

  const topProducts = useMemo(() => {
    const grouped: any = {};

    filteredSales.forEach(sale => {
      sale.items?.forEach((item: any) => {
        const name = item.itemId?.itemName || 'Unknown';
        const quantity = Number(item.quantity || 0);
        const revenue =
          Number(item.subtotal) || Number(item.unitPrice || 0) * quantity;

        if (!grouped[name]) {
          grouped[name] = {name, quantity: 0, revenue: 0};
        }

        grouped[name].quantity += quantity;
        grouped[name].revenue += revenue;
      });
    });

    return Object.values(grouped)
      .sort((a: any, b: any) => b.quantity - a.quantity)
      .slice(0, 5);
  }, [filteredSales]);

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
        <AppHeader title="Sales Reports" onBack={() => navigation.goBack()} />

        <ScrollView contentContainerStyle={styles.scroll}>

          {/* FILTER */}
          <View style={styles.filterRow}>
            {['today', 'week', 'month', 'all'].map(f => (
              <TouchableOpacity
                key={f}
                style={[
                  styles.filterBtn,
                  filterType === f && styles.filterActive,
                ]}
                onPress={() => setFilterType(f)}>
                <Text
                  style={[
                    styles.filterText,
                    filterType === f && styles.filterTextActive,
                  ]}>
                  {f.toUpperCase()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* SUMMARY */}
          <View style={styles.summaryRow}>
            <View style={styles.summaryCard}>
              <Text style={styles.value}>
                Rs. {totalSales.toLocaleString()}
              </Text>
              <Text style={styles.label}>Total Sales</Text>
            </View>

            <View style={styles.summaryCard}>
              <Text style={styles.value}>{totalOrders}</Text>
              <Text style={styles.label}>Orders</Text>
            </View>
          </View>

          {/* SALES TREND */}
          <Text style={styles.sectionTitle}>Sales Trend</Text>

          <View style={styles.chartContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <BarChart
                data={{
                  labels: salesByDate.labels,
                  datasets: [{data: salesByDate.data}],
                }}
                width={Math.max(screenWidth, salesByDate.labels.length * 70)}
                height={260}
                yAxisLabel="Rs "
                yAxisSuffix=""
                chartConfig={{
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: () => '#f59e0b',
                  labelColor: () => '#0f172a',
                }}
                fromZero
                showValuesOnTopOfBars
              />
            </ScrollView>
          </View>

          {/* CATEGORY */}
          <Text style={styles.sectionTitle}>By Category</Text>

          <View style={styles.chartContainer}>
            <PieChart
              data={salesByCategory}
              width={screenWidth - 32}
              height={220}
              chartConfig={{color: () => '#f59e0b'}}
              accessor="population"
              backgroundColor="transparent"
              paddingLeft="15"
            />
          </View>

          {/* RESTORED CHART */}
          <Text style={styles.sectionTitle}>Top Best Selling Products</Text>

          <View style={styles.chartContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <BarChart
                data={{
                  labels: topProducts.map((p: any) => p.name),
                  datasets: [
                    {data: topProducts.map((p: any) => p.quantity)},
                  ],
                }}
                width={Math.max(screenWidth, topProducts.length * 80)}
                height={260}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={{
                  backgroundGradientFrom: '#ffffff',
                  backgroundGradientTo: '#ffffff',
                  decimalPlaces: 0,
                  color: () => '#f59e0b',
                  labelColor: () => '#0f172a',
                }}
                fromZero
                showValuesOnTopOfBars
              />
            </ScrollView>
          </View>

          {/* REVENUE LIST */}
          <Text style={styles.sectionTitle}>Top Products (Revenue)</Text>

          {topProducts.map((p: any, i) => (
            <View key={i} style={styles.productRow}>
              <Text style={styles.productName}>{p.name}</Text>

              <View style={styles.productRight}>
                <Text style={styles.productRevenue}>
                  Rs. {p.revenue.toLocaleString()}
                </Text>

                <Text style={styles.productMeta}>
                  {p.quantity} sold
                </Text>
              </View>
            </View>
          ))}

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}