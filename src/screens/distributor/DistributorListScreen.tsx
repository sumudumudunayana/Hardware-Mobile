import React, {useState} from 'react';
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
import ConfirmDialog from '../../components/ConfirmDialog';
import styles from '../../styles/distributor/DistributorListScreenStyles';

export default function DistributorListScreen({navigation}: any) {
  const [distributors, setDistributors] = useState<any[]>([]);
  const [filteredDistributors, setFilteredDistributors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // ✅ dialog state
  const [showDialog, setShowDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // FETCH DATA
  const fetchDistributors = async () => {
    try {
      setLoading(true);

      const res = await api.get('/distributors');

      const formatted = res.data.map((item: any) => ({
        _id: item._id,
        distributorId: item.distributorId,
        distributorName: item.distributorName,
        distributorDescription: item.distributorDescription,
        distributorContactNumber: item.distributorContactNumber,
        distributorEmail: item.distributorEmail,
      }));

      setDistributors(formatted);
      setFilteredDistributors(formatted);
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
          'Failed to fetch suppliers',
      });
    } finally {
      setLoading(false);
    }
  };

  // ✅ AUTO REFRESH
  useFocusEffect(
    React.useCallback(() => {
      fetchDistributors();
    }, []),
  );

  // SEARCH
  const handleSearch = (text: string) => {
    setSearch(text);

    if (!text.trim()) {
      setFilteredDistributors(distributors);
      return;
    }

    const filtered = distributors.filter(
      item =>
        item.distributorName?.toLowerCase().includes(text.toLowerCase()) ||
        item.distributorContactNumber
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        item.distributorEmail?.toLowerCase().includes(text.toLowerCase()),
    );

    setFilteredDistributors(filtered);
  };

  // ✅ OPEN DELETE DIALOG
  const openDeleteDialog = (item: any) => {
    setSelectedItem(item);
    setShowDialog(true);
  };

  // Dashboard
  const totalSuppliers = distributors.length;

  const suppliersWithEmail = distributors.filter(
    item => item.distributorEmail,
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Supplier Management"
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
              <Text style={styles.heading}>Supplier Overview</Text>
              <Text style={styles.subHeading}>
                Manage suppliers and supplier records
              </Text>
            </View>

            {/* SUMMARY */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Total Suppliers</Text>
                <Text style={styles.summaryValue}>{totalSuppliers}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>With Email</Text>
                <Text style={styles.summaryValue}>{suppliersWithEmail}</Text>
              </View>
            </View>

            {/* QUICK ACTION */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('DistributorAdd')}>
              <Text style={styles.quickActionTitle}>Quick Action</Text>
              <Text style={styles.quickActionText}>Add New Supplier</Text>
              <Text style={styles.quickActionSub}>
                Tap here to register new suppliers
              </Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Supplier List</Text>

            {/* SEARCH */}
            <TextInput
              placeholder="Search supplier..."
              placeholderTextColor="#64748b"
              value={search}
              onChangeText={handleSearch}
              style={styles.searchInput}
            />

            {/* LIST */}
            {filteredDistributors.map(item => (
              <View key={item._id} style={styles.card}>
                <Text style={styles.name}>{item.distributorName}</Text>

                <Text style={styles.meta}>
                  Phone: {item.distributorContactNumber}
                </Text>

                <Text style={styles.meta}>
                  Email: {item.distributorEmail}
                </Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.btn, styles.viewBtn]}
                    onPress={() =>
                      navigation.navigate('DistributorDetails', {
                        distributor: item,
                      })
                    }>
                    <Text style={styles.btnText}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.editBtn]}
                    onPress={() =>
                      navigation.navigate('DistributorEdit', {
                        distributor: item,
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

      {/* ✅ CONFIRM DIALOG */}
      <ConfirmDialog
        visible={showDialog}
        title="Delete Supplier"
        message={`Are you sure you want to delete "${selectedItem?.distributorName}"?`}
        onCancel={() => setShowDialog(false)}
        onConfirm={async () => {
          try {
            await api.delete(`/distributors/${selectedItem._id}`);

            Toast.show({
              type: 'success',
              text1: 'Deleted',
              text2: 'Supplier deleted successfully',
            });

            setShowDialog(false);
            fetchDistributors();
          } catch (error: any) {
            Toast.show({
              type: 'error',
              text1: 'Delete Failed',
              text2:
                error.response?.data?.message ||
                'Failed to delete supplier',
            });
          }
        }}
      />
    </SafeAreaView>
  );
}