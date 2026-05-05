import React, {useState, useCallback} from 'react';
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
import ConfirmDialog from '../../components/ConfirmDialog'; // ✅ custom dialog
import styles from '../../styles/promotion/PromotionListScreenStyles';

export default function PromotionListScreen({navigation}: any) {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [filteredPromotions, setFilteredPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null);

  
   // FETCH PROMOTIONS
   
  const fetchPromotions = async () => {
    try {
      setLoading(true);

      const res = await api.get('/promotions');

      const formatted = res.data.map((promotion: any) => ({
        _id: promotion._id,
        promotionId: promotion.promotionId,
        promotionName: promotion.promotionName,
        promotionDescription: promotion.promotionDescription,
        discountType: promotion.discountType,
        discountValue: promotion.discountValue,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        applyTo: promotion.applyTo,
        status: promotion.status,

        item: promotion.itemId
          ? {
              _id: promotion.itemId._id,
              itemName: promotion.itemId.itemName,
              itemCategory: promotion.itemId.itemCategory,
            }
          : null,
      }));

      setPromotions(formatted);
      setFilteredPromotions(formatted);

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
        text2:
          error.response?.data?.message ||
          'Failed to fetch promotions',
      });

    } finally {
      setLoading(false);
    }
  };

  // AUTO REFRESH WHEN SCREEN FOCUSES
  useFocusEffect(
    useCallback(() => {
      fetchPromotions();
    }, []),
  );

  
   // SEARCH
   
  const handleSearch = (text: string) => {
    setSearch(text);

    if (!text.trim()) {
      setFilteredPromotions(promotions);
      return;
    }

    const filtered = promotions.filter(
      item =>
        item.promotionName?.toLowerCase().includes(text.toLowerCase()) ||
        item.discountType?.toLowerCase().includes(text.toLowerCase()) ||
        item.status?.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredPromotions(filtered);
  };

  
   // OPEN DELETE DIALOG

  const openDeleteDialog = (item: any) => {
    setSelectedPromotion(item);
    setShowDialog(true);
  };

  
   // DASHBOARD VALUES
  
  const totalPromotions = promotions.length;

  const activePromotions = promotions.filter(
    item => item.status?.toLowerCase() === 'active',
  ).length;

  const inactivePromotions = promotions.filter(
    item =>
      item.status?.toLowerCase() === 'inactive' ||
      item.status?.toLowerCase() === 'expired',
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Promotion Management"
          onBack={() => navigation.goBack()}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#f59e0b" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>

            {/* HEADER */}
            <View style={styles.headingSection}>
              <Text style={styles.heading}>Promotion Overview</Text>
              <Text style={styles.subHeading}>
                Manage promotions and discount campaigns
              </Text>
            </View>

            {/* SUMMARY */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Total Promotions</Text>
                <Text style={styles.summaryValue}>{totalPromotions}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Active Promotions</Text>
                <Text style={styles.summaryValue}>{activePromotions}</Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Inactive Promotions</Text>
                <Text style={styles.summaryValue}>{inactivePromotions}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Campaign Status</Text>
                <Text style={styles.summaryValue}>Live</Text>
              </View>
            </View>

            {/* QUICK ACTION */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('PromotionAdd')}>
              <Text style={styles.quickActionTitle}>Quick Action</Text>
              <Text style={styles.quickActionText}>Add New Promotion</Text>
              <Text style={styles.quickActionSub}>
                Tap here to create new discount campaigns
              </Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Promotion List</Text>

            {/* SEARCH */}
            <TextInput
              placeholder="Search promotion..."
              placeholderTextColor="#64748b"
              value={search}
              onChangeText={handleSearch}
              style={styles.searchInput}
            />

            {/* LIST */}
            {filteredPromotions.map(item => (
              <View key={item._id} style={styles.card}>
                <Text style={styles.name}>{item.promotionName}</Text>

                <Text style={styles.meta}>
                  Discount: {item.discountValue}
                  {item.discountType === 'percentage' ? '%' : ' LKR'}
                </Text>

                <Text style={styles.meta}>Status: {item.status}</Text>

                {item.item && (
                  <Text style={styles.meta}>
                    Product: {item.item.itemName}
                  </Text>
                )}

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.btn, styles.viewBtn]}
                    onPress={() =>
                      navigation.navigate('PromotionDetails', {
                        promotion: item,
                      })
                    }>
                    <Text style={styles.btnText}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.editBtn]}
                    onPress={() =>
                      navigation.navigate('PromotionEdit', {
                        promotion: item,
                      })
                    }>
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.deleteBtn]}
                    onPress={() => openDeleteDialog(item)}>
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* CONFIRMATION DIALOG */}
      <ConfirmDialog
        visible={showDialog}
        title="Delete Promotion"
        message={`Are you sure you want to delete "${selectedPromotion?.promotionName}"?`}
        onCancel={() => setShowDialog(false)}
        onConfirm={async () => {
          try {
            await api.delete(`/promotions/${selectedPromotion._id}`);

            Toast.show({
              type: 'success',
              text1: 'Deleted',
              text2: 'Promotion deleted successfully',
            });

            setShowDialog(false);
            fetchPromotions();

          } catch (error: any) {
            Toast.show({
              type: 'error',
              text1: 'Delete Failed',
              text2:
                error.response?.data?.message ||
                'Failed to delete promotion',
            });
          }
        }}
      />
    </SafeAreaView>
  );
}