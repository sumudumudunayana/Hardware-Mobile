import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';

import AppHeader from '../../components/AppHeader';
import styles from '../../styles/customer/CustomerDetailsScreenStyles';

export default function CustomerDetailsScreen({route, navigation}: any) {
  const {customer} = route.params;

  return (
    <View style={styles.container}>
      <AppHeader title="Customer Details" onBack={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.title}>Customer Information</Text>

          {/* CUSTOMER ID */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Customer ID</Text>
            <Text style={styles.value}>{customer.customerId}</Text>
          </View>

          {/* NAME */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Full Name</Text>
            <Text style={styles.value}>{customer.customerName}</Text>
          </View>

          {/* CONTACT */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Contact Number</Text>
            <Text style={styles.value}>{customer.customerContactNumber}</Text>
          </View>

          {/* EMAIL */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email Address</Text>
            <Text style={styles.value}>{customer.customerEmail}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
