import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/ai/AIInsightsScreenStyles';

export default function AIInsightsScreen({navigation}: any) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAI = async () => {
    try {
      setLoading(true);

      const res = await api.post('/ai/predict');

      setData(res.data || []);

      Toast.show({
        type: 'success',
        text1: 'AI Loaded',
        text2: 'Predictions updated successfully',
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to load AI predictions',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAI();
  }, []);

  const topDemand =
    data.length > 0
      ? [...data].sort((a, b) => b.predicted_demand - a.predicted_demand)[0]
      : null;

  const topRevenue =
    data.length > 0
      ? [...data].sort((a, b) => b.predicted_revenue - a.predicted_revenue)[0]
      : null;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="AI Insights" onBack={() => navigation.goBack()} />

        {loading ? (
          <ActivityIndicator size="large" color="#f59e0b" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* HEADER */}
            <View style={styles.headingSection}>
              <Text style={styles.heading}>AI Forecast</Text>
              <Text style={styles.subHeading}>
                Smart demand & revenue insights
              </Text>
            </View>

             {/* TOP CARDS  */}
            <View style={styles.topCardsRow}>
              {/* TOP DEMAND */}
              {topDemand && (
                <View style={[styles.topCard, styles.gradientDemand]}>
                  <Text style={styles.topLabel}>🔥 Top Demand</Text>

                  <Text style={styles.topProduct}>
                    {topDemand.product_name}
                  </Text>

                  <Text style={styles.topValue}>
                    {topDemand.predicted_demand}
                  </Text>
                </View>
              )}

              {/* TOP REVENUE */}
              {topRevenue && (
                <View style={[styles.topCard, styles.gradientRevenue]}>
                  <Text style={styles.topLabel}>💰 Top Revenue</Text>

                  <Text style={styles.topProduct}>
                    {topRevenue.product_name}
                  </Text>

                  <Text style={styles.topValue}>
                    Rs. {topRevenue.predicted_revenue}
                  </Text>
                </View>
              )}
            </View>

            {/* REFRESH BUTTON */}
            <TouchableOpacity style={styles.refreshBtn} onPress={fetchAI}>
              <Text style={styles.refreshText}>Refresh Predictions</Text>
            </TouchableOpacity>

            {/* LIST */}
            <Text style={styles.sectionTitle}>All Predictions</Text>

            {data.map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.productName}>{item.product_name}</Text>

                <View style={styles.metricsRow}>
                  <Text style={styles.metric}>
                    Demand: {item.predicted_demand}
                  </Text>

                  <Text style={styles.metric}>
                    Revenue: Rs. {item.predicted_revenue}
                  </Text>
                </View>

                <View style={styles.metricsRow}>
                  <Text style={styles.metric}>Stock: {item.current_stock}</Text>

                  <Text style={styles.metricHighlight}>
                    Recommended: {item.recommended_stock}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
