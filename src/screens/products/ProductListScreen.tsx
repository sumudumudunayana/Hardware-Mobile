import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../../components/AppHeader";
import styles from "../../styles/products/ProductListScreenStyles";

export default function ProductListScreen({ navigation }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // FETCH PRODUCTS
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://10.0.2.2:5500/api/items");

      const formatted = res.data.map((item: any) => ({
        id: item._id,
        name: item.itemName,
        price: item.itemSellingPrice,
        category: item.itemCategory,
        company: item.itemCompany,
        supplier: item.itemDistributor,
      }));

      setProducts(formatted);
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to fetch products"
      );
    } finally {
      setLoading(false);
    }
  };

  // LOAD ON SCREEN OPEN
  useEffect(() => {
    fetchProducts();
  }, []);

  // DELETE HANDLER
  const handleDelete = (item: any) => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete "${item.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            console.log("Deleted:", item.name);
          },
        },
      ]
    );
  };

  return (
  <SafeAreaView style={styles.safeArea}>
    <View style={styles.container}>
      
      {/* HEADER */}
      <AppHeader title="Products" onBack={() => navigation.goBack()} />

      {/* LOADING */}
      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {products.map((item) => (
            <View key={item.id} style={styles.card}>
              <Text style={styles.productName}>{item.name}</Text>

              <Text style={styles.productMeta}>Rs. {item.price}</Text>
              <Text style={styles.productMeta}>
                Category: {item.category}
              </Text>
              <Text style={styles.productMeta}>
                Company: {item.company}
              </Text>
              <Text style={styles.productMeta}>
                Supplier: {item.supplier}
              </Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={[styles.btn, styles.viewBtn]}
                  onPress={() =>
                    navigation.navigate("ProductDetails", { item })
                  }
                >
                  <Text style={styles.btnText}>View</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, styles.editBtn]}
                  onPress={() =>
                    navigation.navigate("ProductEdit", { item })
                  }
                >
                  <Text style={styles.btnText}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.btn, styles.deleteBtn]}
                  onPress={() => handleDelete(item)}
                >
                  <Text style={styles.btnText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate("ProductAdd")}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);
}