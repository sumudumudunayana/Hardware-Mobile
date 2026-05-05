import React, {useEffect, useState} from 'react';
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
import styles from '../../styles/customer/CustomerListScreenStyles';

export default function CustomerListScreen({navigation}: any) {
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // DIALOG STATE
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  // FETCH CUSTOMERS
  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await api.get('/customers');

      setCustomers(res.data);
      setFilteredCustomers(res.data);
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
          'Failed to fetch customers',
      });
    } finally {
      setLoading(false);
    }
  };

  // AUTO REFRESH WHEN SCREEN FOCUSES
  useFocusEffect(
    React.useCallback(() => {
      fetchCustomers();
    }, []),
  );

  // SEARCH
  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = customers.filter(
      customer =>
        customer.customerName?.toLowerCase().includes(text.toLowerCase()) ||
        customer.customerEmail?.toLowerCase().includes(text.toLowerCase()) ||
        customer.customerContactNumber
          ?.toLowerCase()
          .includes(text.toLowerCase()),
    );

    setFilteredCustomers(filtered);
  };

  // OPEN DELETE DIALOG
  const openDeleteDialog = (customer: any) => {
    setSelectedCustomer(customer);
    setShowDialog(true);
  };

  // Dashboard values
  const totalCustomers = customers.length;

  const customersWithEmail = customers.filter(
    item => item.customerEmail,
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Customers" onBack={() => navigation.goBack()} />

        {loading ? (
          <ActivityIndicator size="large" color="#f59e0b" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            
            {/* HEADER */}
            <View style={styles.headingSection}>
              <Text style={styles.heading}>Customer Overview</Text>
              <Text style={styles.subHeading}>
                Manage customers and customer records
              </Text>
            </View>

            {/* SUMMARY */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Total Customers</Text>
                <Text style={styles.summaryValue}>{totalCustomers}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>With Email</Text>
                <Text style={styles.summaryValue}>
                  {customersWithEmail}
                </Text>
              </View>
            </View>

            {/* QUICK ACTION */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('CustomerAdd')}>
              <Text style={styles.quickActionTitle}>Quick Action</Text>
              <Text style={styles.quickActionText}>Add New Customer</Text>
              <Text style={styles.quickActionSub}>
                Tap here to register new customers
              </Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Customer List</Text>

            {/* SEARCH */}
            <TextInput
              placeholder="Search by name, email, phone..."
              placeholderTextColor="#64748b"
              style={styles.searchInput}
              value={search}
              onChangeText={handleSearch}
            />

            {/* LIST */}
            {filteredCustomers.map(customer => (
              <View key={customer._id} style={styles.card}>
                <Text style={styles.customerName}>
                  {customer.customerName}
                </Text>

                <Text style={styles.customerMeta}>
                  ID: {customer.customerId}
                </Text>

                <Text style={styles.customerMeta}>
                  Phone: {customer.customerContactNumber}
                </Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[styles.btn, styles.viewBtn]}
                    onPress={() =>
                      navigation.navigate('CustomerDetails', {customer})
                    }>
                    <Text style={styles.btnText}>View</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.editBtn]}
                    onPress={() =>
                      navigation.navigate('CustomerEdit', {customer})
                    }>
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.btn, styles.deleteBtn]}
                    onPress={() => openDeleteDialog(customer)}>
                    <Text style={styles.btnText}>Delete</Text>
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
        title="Delete Customer"
        message={`Are you sure you want to delete "${selectedCustomer?.customerName}"?`}
        onCancel={() => setShowDialog(false)}
        onConfirm={async () => {
          try {
            await api.delete(`/customers/${selectedCustomer._id}`);

            Toast.show({
              type: 'success',
              text1: 'Deleted',
              text2: 'Customer deleted successfully',
            });

            setShowDialog(false);
            fetchCustomers();
          } catch (error: any) {
            Toast.show({
              type: 'error',
              text1: 'Delete Failed',
              text2:
                error.response?.data?.message ||
                'Failed to delete customer',
            });
          }
        }}
      />
    </SafeAreaView>
  );
}