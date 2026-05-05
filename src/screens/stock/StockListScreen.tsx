import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';

import Toast from 'react-native-toast-message';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import ConfirmDialog from '../../components/ConfirmDialog'; // ✅ added
import styles from '../../styles/stock/StockListScreenStyles';

export default function StockListScreen({navigation}: any) {
  const [stocks, setStocks] = useState<any[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [selectedStock, setSelectedStock] = useState<any>(null);

  
  // FETCH STOCKS
  
  const fetchStocks = async () => {
    try {
      setLoading(true);

      const res = await api.get('/stocks');

      const formatted = res.data.map((stock: any) => ({
        _id: stock._id,
        stockId: stock.stockId,
        quantity: Number(stock.quantity || 0),

        item: {
          _id: stock.itemId?._id,
          itemId: stock.itemId?.itemId,
          itemName: stock.itemId?.itemName,
          itemCategory: stock.itemId?.itemCategory,
          itemCompany: stock.itemId?.itemCompany,
          itemDistributor: stock.itemId?.itemDistributor,
          itemSellingPrice: Number(stock.itemId?.itemSellingPrice || 0),
        },
      }));

      setStocks(formatted);
      setFilteredStocks(formatted);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Session Expired',
          text2: 'Please login again',
        });

        navigation.replace('Login');
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to fetch stocks',
      });
    } finally {
      setLoading(false);
    }
  };

  
   // AUTO RELOAD ON SCREEN FOCUS
   
  useFocusEffect(
    useCallback(() => {
      fetchStocks();
    }, []),
  );

  
   // INITIAL LOAD
   
  useEffect(() => {
    fetchStocks();
  }, []);

  
   // SEARCH
   
  const handleSearch = (text: string) => {
    setSearch(text);

    if (!text.trim()) {
      setFilteredStocks(stocks);
      return;
    }

    const filtered = stocks.filter(
      item =>
        item.item?.itemName?.toLowerCase().includes(text.toLowerCase()) ||
        item.item?.itemCategory?.toLowerCase().includes(text.toLowerCase()) ||
        item.item?.itemCompany?.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredStocks(filtered);
  };

  
   // OPEN DELETE DIALOG
   
  const openDeleteDialog = (item: any) => {
    setSelectedStock(item);
    setShowDialog(true);
  };

  
   // DASHBOARD VALUES
   
  const availableStockItems = stocks.filter(item => item.quantity > 0).length;

  const lowStockItems = stocks.filter(
    item => item.quantity > 0 && item.quantity <= 10,
  ).length;

  const outOfStockItems = stocks.filter(item => item.quantity === 0).length;

  const totalStockValue = stocks.reduce(
    (sum, item) =>
      sum + item.quantity * Number(item.item?.itemSellingPrice || 0),
    0,
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Stock Management"
          onBack={() => navigation.goBack()}
        />

        {loading ? (
          <View style={{marginTop: 40}}>
            <ActivityIndicator size="large" color="#f59e0b" />
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            {/* HEADER */}
            <View style={styles.headingSection}>
              <Text style={styles.heading}>Stock Overview</Text>
              <Text style={styles.subHeading}>
                Monitor inventory levels and stock availability
              </Text>
            </View>

            {/* SUMMARY */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Available Stocks</Text>
                <Text style={styles.summaryValue}>{availableStockItems}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Low Stock</Text>
                <Text style={styles.summaryValue}>{lowStockItems}</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Out of Stock</Text>
                <Text style={styles.summaryValue}>{outOfStockItems}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Total Value</Text>
                <Text style={styles.summaryValue}>
                  Rs. {totalStockValue.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* QUICK ACTION */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('StockAdd')}>
              <Text style={styles.quickActionTitle}>Quick Action</Text>
              <Text style={styles.quickActionText}>Add New Stock</Text>
              <Text style={styles.quickActionSub}>
                Tap here to register new stock inventory
              </Text>
            </TouchableOpacity>

            {/* STOCK REPORTS (SIMPLE) */}
            <TouchableOpacity
              style={styles.reportRow}
              onPress={() => navigation.navigate('StockReportsScreen')}>
              <Text style={styles.reportText}>📊 View Stock Reports</Text>
              <Text style={styles.reportArrow}>→</Text>
            </TouchableOpacity>


             {/* LOW STOCK ALERT (SIMPLE) */}
            <TouchableOpacity
              style={styles.reportRow}
              onPress={() => navigation.navigate('LowStockAlertScreen')}>
              <Text style={styles.reportText}>⚠️ Low Stock Alert</Text>
              <Text style={styles.reportArrow}>→</Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Stock List</Text>

            {/* SEARCH */}
            <TextInput
              placeholder="Search stock..."
              placeholderTextColor="#64748b"
              value={search}
              onChangeText={handleSearch}
              style={styles.searchInput}
            />

            {/* LIST */}
            {filteredStocks.map(item => (
              <View key={item._id} style={styles.card}>
                <Text style={styles.name}>{item.item?.itemName}</Text>

                <Text style={styles.meta}>
                  Category: {item.item?.itemCategory}
                </Text>

                <Text style={styles.quantity}>
                  Available Qty: {item.quantity}
                </Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.btn, styles.viewBtn]}
                    onPress={() =>
                      navigation.navigate('StockDetails', {
                        stock: item,
                      })
                    }>
                    <Text style={styles.btnText}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.editBtn]}
                    onPress={() =>
                      navigation.navigate('StockEdit', {
                        stock: item,
                      })
                    }>
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.deleteBtn]}
                    onPress={() => openDeleteDialog(item)}>
                    <Text style={styles.btnText}>Remove</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* CONFIRM DIALOG */}
      <ConfirmDialog
        visible={showDialog}
        title="Delete Stock"
        message={`This will permanently remove stock for "${selectedStock?.item?.itemName}".\n\nThis action cannot be undone.`}
        onCancel={() => setShowDialog(false)}
        onConfirm={async () => {
          try {
            await api.delete(`/stocks/${selectedStock._id}`);

            Toast.show({
              type: 'success',
              text1: 'Stock Deleted',
              text2: 'Stock removed successfully',
            });

            setShowDialog(false);
            fetchStocks();
          } catch (error: any) {
            Toast.show({
              type: 'error',
              text1: 'Delete Failed',
              text2: error.response?.data?.message || 'Failed to delete stock',
            });
          }
        }}
      />
    </SafeAreaView>
  );
}
