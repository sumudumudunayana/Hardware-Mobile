import React from "react";
import {
  View,
  Text,
  ScrollView,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import AppHeader from "../../components/AppHeader";
import styles from "../../styles/promotion/PromotionDetailsScreenStyles";

export default function PromotionDetailsScreen({
  route,
  navigation,
}: any) {
  const {promotion} = route.params;

  const formatDate = (date: string) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Promotion Details"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }>
          <View style={styles.card}>
            <Text style={styles.title}>
              Promotion Information
            </Text>

            {/* PROMOTION NAME */}
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                Promotion Name
              </Text>
              <Text style={styles.value}>
                {promotion.promotionName}
              </Text>
            </View>

            {/* DESCRIPTION */}
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                Description
              </Text>
              <Text style={styles.value}>
                {promotion.promotionDescription ||
                  "No description available"}
              </Text>
            </View>

            {/* DISCOUNT TYPE */}
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                Discount Type
              </Text>
              <Text style={styles.value}>
                {promotion.discountType}
              </Text>
            </View>

            {/* DISCOUNT VALUE */}
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                Discount Value
              </Text>
              <Text style={styles.value}>
                {promotion.discountValue}
                {promotion.discountType ===
                "percentage"
                  ? "%"
                  : " LKR"}
              </Text>
            </View>

            {/* START DATE */}
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                Start Date
              </Text>
              <Text style={styles.value}>
                {formatDate(
                  promotion.startDate,
                )}
              </Text>
            </View>

            {/* END DATE */}
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                End Date
              </Text>
              <Text style={styles.value}>
                {formatDate(
                  promotion.endDate,
                )}
              </Text>
            </View>

            {/* APPLY TO */}
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                Apply To
              </Text>
              <Text style={styles.value}>
                {promotion.applyTo}
              </Text>
            </View>

            {/* PRODUCT */}
            {promotion.item && (
              <>
                <View
                  style={styles.infoRow}>
                  <Text
                    style={styles.label}>
                    Product
                  </Text>
                  <Text
                    style={styles.value}>
                    {
                      promotion.item
                        .itemName
                    }
                  </Text>
                </View>

                <View
                  style={styles.infoRow}>
                  <Text
                    style={styles.label}>
                    Category
                  </Text>
                  <Text
                    style={styles.value}>
                    {
                      promotion.item
                        .itemCategory
                    }
                  </Text>
                </View>
              </>
            )}

            {/* STATUS */}
            <View style={styles.infoRow}>
              <Text style={styles.label}>
                Status
              </Text>
              <Text style={styles.value}>
                {promotion.status}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}