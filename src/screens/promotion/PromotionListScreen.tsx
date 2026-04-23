import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import api from "../../api/api";
import AppHeader from "../../components/AppHeader";
import styles from "../../styles/promotion/PromotionListScreenStyles";

export default function PromotionListScreen({
  navigation,
}: any) {
  const [promotions, setPromotions] = useState<any[]>([]);
  const [filteredPromotions, setFilteredPromotions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /**
   * FETCH PROMOTIONS
   */
  const fetchPromotions = async () => {
    try {
      setLoading(true);

      const res = await api.get("/promotions");

      const formatted = res.data.map((promotion: any) => ({
        _id: promotion._id,
        promotionId: promotion.promotionId,
        promotionName: promotion.promotionName,
        promotionDescription:
          promotion.promotionDescription,
        discountType: promotion.discountType,
        discountValue: promotion.discountValue,
        startDate: promotion.startDate,
        endDate: promotion.endDate,
        applyTo: promotion.applyTo,
        status: promotion.status,

        item: promotion.itemId
          ? {
              _id: promotion.itemId._id,
              itemName:
                promotion.itemId.itemName,
              itemCategory:
                promotion.itemId.itemCategory,
            }
          : null,
      }));

      setPromotions(formatted);
      setFilteredPromotions(formatted);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert(
          "Session Expired",
          "Please login again",
        );
        navigation.replace("Login");
        return;
      }

      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to fetch promotions",
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * SEARCH
   */
  const handleSearch = (text: string) => {
    setSearch(text);

    if (!text.trim()) {
      setFilteredPromotions(promotions);
      return;
    }

    const filtered = promotions.filter(
      (item) =>
        item.promotionName
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        item.discountType
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        item.status
          ?.toLowerCase()
          .includes(text.toLowerCase()),
    );

    setFilteredPromotions(filtered);
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  /**
   * DELETE
   */
  const handleDelete = (item: any) => {
    Alert.alert(
      "Delete Promotion",
      `Delete "${item.promotionName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(
                `/promotions/${item._id}`,
              );

              Alert.alert(
                "Success",
                "Promotion deleted successfully",
              );

              fetchPromotions();
            } catch (error: any) {
              Alert.alert(
                "Delete Failed",
                error.response?.data?.message ||
                  "Failed to delete promotion",
              );
            }
          },
        },
      ],
    );
  };

  /**
   * DASHBOARD VALUES
   */
  const totalPromotions = promotions.length;

  const activePromotions = promotions.filter(
    (item) =>
      item.status?.toLowerCase() === "active",
  ).length;

  const inactivePromotions = promotions.filter(
    (item) =>
      item.status?.toLowerCase() ===
        "inactive" ||
      item.status?.toLowerCase() ===
        "expired",
  ).length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Promotion Management"
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
            contentContainerStyle={
              styles.scrollContent
            }
          >
            {/* HEADING */}
            <View style={styles.headingSection}>
              <Text style={styles.heading}>
                Promotion Overview
              </Text>
              <Text style={styles.subHeading}>
                Manage promotions and discount
                campaigns
              </Text>
            </View>

            {/* SUMMARY CARDS */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  Total Promotions
                </Text>
                <Text style={styles.summaryValue}>
                  {totalPromotions}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  Active Promotions
                </Text>
                <Text style={styles.summaryValue}>
                  {activePromotions}
                </Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  Inactive Promotions
                </Text>
                <Text style={styles.summaryValue}>
                  {inactivePromotions}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  Campaign Status
                </Text>
                <Text style={styles.summaryValue}>
                  Live
                </Text>
              </View>
            </View>

            {/* QUICK ACTION */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() =>
                navigation.navigate(
                  "PromotionAdd",
                )
              }
            >
              <Text style={styles.quickActionTitle}>
                Quick Action
              </Text>
              <Text style={styles.quickActionText}>
                Add New Promotion
              </Text>
              <Text style={styles.quickActionSub}>
                Tap here to create new discount
                campaigns
              </Text>
            </TouchableOpacity>

            
            <Text style={styles.sectionTitle}>
              Promotion List
            </Text>

            {/* SEARCH */}
            <TextInput
              placeholder="Search promotion..."
              placeholderTextColor="#64748b"
              value={search}
              onChangeText={handleSearch}
              style={styles.searchInput}
            />

            {/* PROMOTION LIST */}
            {filteredPromotions.map((item) => (
              <View
                key={item._id}
                style={styles.card}
              >
                <Text style={styles.name}>
                  {item.promotionName}
                </Text>

                

                <Text style={styles.meta}>
                  Discount: {item.discountValue}
                  {item.discountType ===
                  "percentage"
                    ? "%"
                    : " LKR"}
                </Text>

               

                <Text style={styles.meta}>
                  Status: {item.status}
                </Text>

                {item.item && (
                  <Text style={styles.meta}>
                    Product:{" "}
                    {item.item.itemName}
                  </Text>
                )}

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      styles.viewBtn,
                    ]}
                    onPress={() =>
                      navigation.navigate(
                        "PromotionDetails",
                        {promotion: item},
                      )
                    }
                  >
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
                        "PromotionEdit",
                        {promotion: item},
                      )
                    }
                  >
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
                      handleDelete(item)
                    }
                  >
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