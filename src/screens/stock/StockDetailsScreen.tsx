import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import styles from "../../styles/stock/StockDetailsScreenStyles";

export default function StockDetailsScreen({
  route,
  navigation,
}: any) {
  const { stock } = route.params;

  return (
    <View style={styles.container}>
      <AppHeader
        title="Stock Details"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>
            Stock Information
          </Text>

          {/* STOCK ID */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Stock ID
            </Text>
            <Text style={styles.value}>
              {stock.stockId}
            </Text>
          </View>

          {/* ITEM NAME */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Product Name
            </Text>
            <Text style={styles.value}>
              {stock.item?.itemName}
            </Text>
          </View>

          {/* CATEGORY */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Category
            </Text>
            <Text style={styles.value}>
              {stock.item?.itemCategory}
            </Text>
          </View>

          {/* COMPANY */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Company
            </Text>
            <Text style={styles.value}>
              {stock.item?.itemCompany}
            </Text>
          </View>

          {/* SUPPLIER */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Supplier
            </Text>
            <Text style={styles.value}>
              {stock.item?.itemDistributor}
            </Text>
          </View>

          {/* QUANTITY */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Available Quantity
            </Text>
            <Text style={styles.quantityValue}>
              {stock.quantity}
            </Text>
          </View>

        </View>
      </ScrollView>
    </View>
  );
}