import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import api from "../../api/api";
import AppHeader from "../../components/AppHeader";
import styles from "../../styles/stock/StockAddScreenStyles";

export default function StockAddScreen({
  navigation,
}: any) {
  const [items, setItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] =
    useState<any>(null);

  const [formData, setFormData] = useState({
    quantity: "",
    arrivalDate: "",
  });

  /**
   * FETCH PRODUCTS
   */
  const fetchItems = async () => {
    try {
      const res = await api.get("/items");
      setItems(res.data);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to load products",
      );
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /**
   * HANDLE CHANGE
   */
  const handleChange = (
    key: string,
    value: string,
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  /**
   * SUBMIT
   */
  const handleSubmit = async () => {
    if (!selectedItem) {
      return Alert.alert(
        "Validation Error",
        "Please select a product",
      );
    }

    const quantity = Number(formData.quantity);

    if (isNaN(quantity) || quantity <= 0) {
      return Alert.alert(
        "Validation Error",
        "Quantity must be greater than 0",
      );
    }

    if (!formData.arrivalDate.trim()) {
      return Alert.alert(
        "Validation Error",
        "Arrival date is required",
      );
    }

    try {
      await api.post("/stocks", {
        itemId: selectedItem._id,
        quantity,
        arrivalDate: formData.arrivalDate,
      });

      Alert.alert(
        "Success",
        "Stock added successfully",
      );

      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        "Add Failed",
        error.response?.data?.message ||
          "Failed to add stock",
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Add Stock"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }>
          <View style={styles.card}>
            <Text style={styles.title}>
              Add New Stock
            </Text>

            {/* SELECT PRODUCT */}
            <Text style={styles.sectionTitle}>
              Select Product
            </Text>

            <View style={styles.chipContainer}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={[
                    styles.chip,
                    selectedItem?._id ===
                      item._id &&
                      styles.chipActive,
                  ]}
                  onPress={() =>
                    setSelectedItem(item)
                  }>
                  <Text
                    style={[
                      styles.chipText,
                      selectedItem?._id ===
                        item._id &&
                        styles.chipTextActive,
                    ]}>
                    {item.itemName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* QUANTITY */}
            <TextInput
              placeholder="Quantity"
              keyboardType="numeric"
              style={styles.input}
              value={formData.quantity}
              onChangeText={(text) =>
                handleChange(
                  "quantity",
                  text,
                )
              }
            />

            {/* ARRIVAL DATE */}
            <TextInput
              placeholder="Arrival Date (YYYY-MM-DD)"
              style={styles.input}
              value={formData.arrivalDate}
              onChangeText={(text) =>
                handleChange(
                  "arrivalDate",
                  text,
                )
              }
            />

            {/* SUBMIT */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}>
              <Text style={styles.buttonText}>
                Add Stock
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}