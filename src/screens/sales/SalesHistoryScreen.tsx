import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/sales/SalesHistoryScreenStyles';

export default function SalesHistoryScreen({navigation}: any) {
  const [sales, setSales] = useState<any[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const res = await api.get('/sales');
      setSales(res.data || []);
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to load sales history');
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Sale', 'Are you sure you want to delete this sale?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => deleteSale(id),
      },
    ]);
  };

  const deleteSale = async (id: string) => {
    try {
      await api.delete(`/sales/${id}`);
      Alert.alert('Success', 'Sale deleted successfully');
      loadSales();
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'Failed to delete sale');
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading sales history...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Sales History" onBack={() => navigation.goBack()} />

        <ScrollView showsVerticalScrollIndicator={false}>
          {sales.length === 0 ? (
            <Text style={styles.empty}>No sales found</Text>
          ) : (
            sales.map(sale => (
              <View key={sale._id} style={styles.card}>
                {/* TOP INFO */}
                <Text style={styles.invoice}>{sale.invoiceNumber}</Text>

                <Text style={styles.date}>
                  {new Date(sale.createdAt).toLocaleString()}
                </Text>

                <Text style={styles.total}>
                  Rs. {Number(sale.totalAmount || 0).toLocaleString()}
                </Text>

                {/* ACTIONS */}
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.btn, styles.viewBtn]}
                    onPress={() =>
                      navigation.navigate('InvoiceScreen', {
                        id: sale._id,
                      })
                    }>
                    <Text style={styles.btnText}>Invoice</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.expandBtn]}
                    onPress={() => toggleExpand(sale._id)}>
                    <Text style={styles.btnText}>
                      {expandedId === sale._id ? 'Hide' : 'View'}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.deleteBtn]}
                    onPress={() => handleDelete(sale._id)}>
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>

                {/* EXPANDED ITEMS */}
                {expandedId === sale._id && (
                  <View style={styles.expandedSection}>
                    {sale.items?.map((item: any, index: number) => (
                      <View key={index} style={styles.itemBox}>
                        <Text style={styles.itemName}>
                          {item.itemId?.itemName || 'Item'}
                        </Text>

                        <Text style={styles.itemText}>
                          Qty: {item.quantity}
                        </Text>

                        <Text style={styles.itemText}>
                          Rs. {Number(item.subtotal || 0).toLocaleString()}
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
