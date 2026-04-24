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
import styles from "../../styles/stock/StockListScreenStyles";

export default function StockListScreen({
  navigation,
}: any) {
  const [stocks, setStocks] = useState<any[]>([]);
  const [filteredStocks, setFilteredStocks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  /**
   * FETCH STOCKS
   */
  const fetchStocks = async () => {
    try {
      setLoading(true);

      const res = await api.get("/stocks");

      const formatted = res.data.map((stock: any) => ({
        _id: stock._id,
        stockId: stock.stockId,
        quantity: Number(stock.quantity || 0),

        item: {
          _id: stock.itemId?._id,
          itemId: stock.itemId?.itemId,
          itemName: stock.itemId?.itemName,
          itemCategory: stock.itemId?.itemCategory,
          itemCompany: stock.itemId?.itemCompany,
          itemDistributor: stock.itemId?.itemDistributor,
          itemSellingPrice: Number(
            stock.itemId?.itemSellingPrice || 0
          ),
        },
      }));

      setStocks(formatted);
      setFilteredStocks(formatted);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert(
          "Session Expired",
          "Please login again"
        );
        navigation.replace("Login");
        return;
      }

      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to fetch stocks"
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
      setFilteredStocks(stocks);
      return;
    }

    const filtered = stocks.filter(
      (item) =>
        item.item?.itemName
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        item.item?.itemCategory
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        item.item?.itemCompany
          ?.toLowerCase()
          .includes(text.toLowerCase())
    );

    setFilteredStocks(filtered);
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  /**
   * DELETE
   */
  const handleDelete = (item: any) => {
    Alert.alert(
      "Delete Stock",
      `Delete stock for "${item.item?.itemName}"?`,
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
              await api.delete(`/stocks/${item._id}`);

              Alert.alert(
                "Success",
                "Stock deleted successfully"
              );

              fetchStocks();
            } catch (error: any) {
              Alert.alert(
                "Delete Failed",
                error.response?.data?.message ||
                  "Failed to delete stock"
              );
            }
          },
        },
      ]
    );
  };

  /**
   * DASHBOARD VALUES
   */
  const availableStockItems = stocks.filter(
    (item) => item.quantity > 0
  ).length;

  const lowStockItems = stocks.filter(
    (item) =>
      item.quantity > 0 && item.quantity <= 10
  ).length;

  const outOfStockItems = stocks.filter(
    (item) => item.quantity === 0
  ).length;

  const totalStockValue = stocks.reduce(
    (sum, item) =>
      sum +
      item.quantity *
        Number(item.item?.itemSellingPrice || 0),
    0
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Stock Management"
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
                Stock Overview
              </Text>
              <Text style={styles.subHeading}>
                Monitor inventory levels and stock
                availability
              </Text>
            </View>

            {/* SUMMARY CARDS */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  Available Stocks
                </Text>
                <Text style={styles.summaryValue}>
                  {availableStockItems}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  Low Stock
                </Text>
                <Text style={styles.summaryValue}>
                  {lowStockItems}
                </Text>
              </View>
            </View>

            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  Out of Stock
                </Text>
                <Text style={styles.summaryValue}>
                  {outOfStockItems}
                </Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>
                  Total Value
                </Text>
                <Text style={styles.summaryValue}>
                  Rs.{" "}
                  {totalStockValue.toLocaleString()}
                </Text>
              </View>
            </View>

            {/* QUICK ACTION */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() =>
                navigation.navigate("StockAdd")
              }
            >
              <Text style={styles.quickActionTitle}>
                Quick Action
              </Text>
              <Text style={styles.quickActionText}>
                Add New Stock
              </Text>
              <Text style={styles.quickActionSub}>
                Tap here to register new stock
                inventory
              </Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>
              Stock List
            </Text>

            {/* SEARCH */}
            <TextInput
              placeholder="Search stock..."
              placeholderTextColor="#64748b"
              value={search}
              onChangeText={handleSearch}
              style={styles.searchInput}
            />

            {/* STOCK LIST */}
            {filteredStocks.map((item) => (
              <View
                key={item._id}
                style={styles.card}
              >
                <Text style={styles.name}>
                  {item.item?.itemName}
                </Text>

                <Text style={styles.meta}>
                  Category:{" "}
                  {item.item?.itemCategory}
                </Text>

                <Text style={styles.quantity}>
                  Available Qty: {item.quantity}
                </Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      styles.viewBtn,
                    ]}
                    onPress={() =>
                      navigation.navigate(
                        "StockDetails",
                        {stock: item}
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
                        "StockEdit",
                        {stock: item}
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