import React from "react";
import {
  View,
  Text,
  ScrollView,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import styles from "../../styles/products/ProductDetailsScreenStyles";

export default function ProductDetailsScreen({
  route,
  navigation,
}: any) {
  const {item} = route.params;

  return (
    <View style={styles.container}>
      <AppHeader
        title="Product Details"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>
            Product Information
          </Text>

          {/* PRODUCT ID */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Product ID
            </Text>
            <Text style={styles.value}>
              {item.itemId}
            </Text>
          </View>

          {/* PRODUCT NAME */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Product Name
            </Text>
            <Text style={styles.value}>
              {item.itemName}
            </Text>
          </View>

          {/* CATEGORY */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Category
            </Text>
            <Text style={styles.value}>
              {item.itemCategory}
            </Text>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Description
            </Text>
            <Text style={styles.value}>
              {item.itemDescription || "No description available"}
            </Text>
          </View>

          {/* COMPANY */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Company
            </Text>
            <Text style={styles.value}>
              {item.itemCompany}
            </Text>
          </View>

          {/* SUPPLIER */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Supplier
            </Text>
            <Text style={styles.value}>
              {item.itemDistributor}
            </Text>
          </View>

          {/* COST PRICE */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Cost Price
            </Text>
            <Text style={styles.value}>
              Rs. {item.itemCostPrice}
            </Text>
          </View>

          {/* SELLING PRICE */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Selling Price
            </Text>
            <Text style={styles.value}>
              Rs. {item.itemSellingPrice}
            </Text>
          </View>

          {/* LABELED PRICE */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Labeled Price
            </Text>
            <Text style={styles.value}>
              Rs. {item.itemLabeledPrice}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}