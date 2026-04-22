import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/customer/CustomerListScreenStyles';

export default function CustomerListScreen({navigation}: any) {
  const [customers, setCustomers] = useState<any[]>([]);
  const [filteredCustomers, setFilteredCustomers] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await api.get('/customers');

      setCustomers(res.data);
      setFilteredCustomers(res.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert('Session Expired', 'Please login again');
        navigation.replace('Login');
        return;
      }

      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to fetch customers',
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = customers.filter(
      customer =>
        customer.customerName
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        customer.customerEmail
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        customer.customerContactNumber
          ?.toLowerCase()
          .includes(text.toLowerCase()),
    );

    setFilteredCustomers(filtered);
  };

  const handleDelete = (customer: any) => {
    Alert.alert(
      'Delete Customer',
      `Are you sure you want to delete "${customer.customerName}"?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await api.delete(`/customers/${customer._id}`);

              Alert.alert(
                'Success',
                'Customer deleted successfully',
              );

              fetchCustomers();
            } catch (error: any) {
              Alert.alert(
                'Delete Failed',
                error.response?.data?.message ||
                  'Failed to delete customer',
              );
            }
          },
        },
      ],
    );
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Dashboard values
  const totalCustomers = customers.length;

  // Count customers with email
  const customersWithEmail = customers.filter(
    item => item.customerEmail,
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Customers"
          onBack={() => navigation.goBack()}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#f59e0b"
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            
            {/* PAGE HEADING */}
            <View style={styles.headingSection}>
              <Text style={styles.heading}>
                Customer Overview
              </Text>
              <Text style={styles.subHeading}>
                Manage customers and customer records
              </Text>
            </View>

            {/* SUMMARY CARDS */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  Total Customers
                </Text>
                <Text style={styles.summaryValue}>
                  {totalCustomers}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  With Email
                </Text>
                <Text style={styles.summaryValue}>
                  {customersWithEmail}
                </Text>
              </View>
            </View>

            {/* QUICK ACTION CARD */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() =>
                navigation.navigate('CustomerAdd')
              }>
              <Text style={styles.quickActionTitle}>
                Quick Action
              </Text>
              <Text style={styles.quickActionText}>
                Add New Customer
              </Text>
              <Text style={styles.quickActionSub}>
                Tap here to register new customers
              </Text>
            </TouchableOpacity>

            

            <Text style={styles.sectionTitle}>
              Customer List
            </Text>

            {/* SEARCH */}
            <TextInput
              placeholder="Search by name, email, phone..."
              placeholderTextColor="#64748b"
              style={styles.searchInput}
              value={search}
              onChangeText={handleSearch}
            />
            
            {filteredCustomers.map(customer => (
              <View
                key={customer._id}
                style={styles.card}>
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
                    style={[
                      styles.btn,
                      styles.viewBtn,
                    ]}
                    onPress={() =>
                      navigation.navigate(
                        'CustomerDetails',
                        {customer},
                      )
                    }>
                    <Text style={styles.btnText}>
                      View
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.btn,
                      styles.editBtn,
                    ]}
                    onPress={() =>
                      navigation.navigate(
                        'CustomerEdit',
                        {customer},
                      )
                    }>
                    <Text style={styles.btnText}>
                      Edit
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.btn,
                      styles.deleteBtn,
                    ]}
                    onPress={() =>
                      handleDelete(customer)
                    }>
                    <Text style={styles.btnText}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}