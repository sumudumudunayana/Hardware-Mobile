import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import styles from "../../styles/distributor/DistributorDetailsScreenStyles";

export default function DistributorDetailsScreen({
  route,
  navigation,
}: any) {
  const { distributor } = route.params;

  return (
    <View style={styles.container}>
      <AppHeader
        title="Supplier Details"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>
            Supplier Information
          </Text>

          {/* SUPPLIER ID */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Supplier ID
            </Text>
            <Text style={styles.value}>
              {distributor.distributorId}
            </Text>
          </View>

          {/* SUPPLIER NAME */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Supplier Name
            </Text>
            <Text style={styles.value}>
              {distributor.distributorName}
            </Text>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Description
            </Text>
            <Text style={styles.value}>
              {distributor.distributorDescription}
            </Text>
          </View>

          {/* CONTACT */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Contact Number
            </Text>
            <Text style={styles.value}>
              {distributor.distributorContactNumber}
            </Text>
          </View>

          {/* EMAIL */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Email Address
            </Text>
            <Text style={styles.value}>
              {distributor.distributorEmail}
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}