import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import AppHeader from "../../components/AppHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "../../styles/products/ProductAddScreenStyles";

export default function ProductAddScreen({ navigation }: any) {
  const [formData, setFormData] = useState({
    itemName: "",
    itemDescription: "",
    itemCategory: "",
    itemCostPrice: "",
    itemSellingPrice: "",
    itemLabeledPrice: "",
    itemCompany: "",
    itemDistributor: "",
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [distributors, setDistributors] = useState<any[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [cat, com, dist] = await Promise.all([
          axios.get("http://10.0.2.2:5500/api/categories"),
          axios.get("http://10.0.2.2:5500/api/companies"),
          axios.get("http://10.0.2.2:5500/api/distributors"),
        ]);

        setCategories(cat.data);
        setCompanies(com.data);
        setDistributors(dist.data);
      } catch (error) {
        Alert.alert("Error", "Failed to load dropdown data");
      }
    };

    loadData();
  }, []);

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const cost = Number(formData.itemCostPrice);
    const selling = Number(formData.itemSellingPrice);
    const labeled = Number(formData.itemLabeledPrice);

    if (cost < 0 || selling < 0 || labeled < 0) {
      return Alert.alert("Error", "Prices cannot be negative");
    }

    if (selling < cost) {
      return Alert.alert("Warning", "Selling price must be higher than cost");
    }

    if (!formData.itemName.trim()) {
      return Alert.alert("Error", "Item name is required");
    }

    try {
      await axios.post("http://10.0.2.2:5500/api/items", {
        ...formData,
        itemCostPrice: cost,
        itemSellingPrice: selling,
        itemLabeledPrice: labeled,
      });

      Alert.alert("Success", "Item added successfully");
      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "Failed to add item"
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Add Product" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.card}>
            <Text style={styles.title}>Add New Item</Text>

            {/* NAME */}
            <TextInput
              placeholder="Item Name"
              style={styles.input}
              value={formData.itemName}
              onChangeText={(text) => handleChange("itemName", text)}
            />

            {/* CATEGORY (FIXED) */}
            <View style={styles.chipContainer}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat._id}
                  style={[
                    styles.chip,
                    formData.itemCategory === cat.categoryName &&
                      styles.chipActive,
                  ]}
                  onPress={() =>
                    handleChange("itemCategory", cat.categoryName)
                  }
                >
                  <Text
                    style={[
                      styles.chipText,
                      formData.itemCategory === cat.categoryName &&
                        styles.chipTextActive,
                    ]}
                  >
                    {cat.categoryName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* DESCRIPTION */}
            <TextInput
              placeholder="Description"
              style={[styles.input, styles.textArea]}
              multiline
              value={formData.itemDescription}
              onChangeText={(text) =>
                handleChange("itemDescription", text)
              }
            />

            {/* PRICES */}
            <TextInput
              placeholder="Cost Price"
              style={styles.input}
              keyboardType="numeric"
              value={formData.itemCostPrice}
              onChangeText={(text) =>
                handleChange("itemCostPrice", text)
              }
            />

            <TextInput
              placeholder="Selling Price"
              style={styles.input}
              keyboardType="numeric"
              value={formData.itemSellingPrice}
              onChangeText={(text) =>
                handleChange("itemSellingPrice", text)
              }
            />

            <TextInput
              placeholder="Labeled Price"
              style={styles.input}
              keyboardType="numeric"
              value={formData.itemLabeledPrice}
              onChangeText={(text) =>
                handleChange("itemLabeledPrice", text)
              }
            />

            {/* COMPANY */}
            <View style={styles.chipContainer}>
              {companies.map((c) => (
                <TouchableOpacity
                  key={c._id}
                  style={[
                    styles.chip,
                    formData.itemCompany === c.companyName &&
                      styles.chipActive,
                  ]}
                  onPress={() =>
                    handleChange("itemCompany", c.companyName)
                  }
                >
                  <Text
                    style={[
                      styles.chipText,
                      formData.itemCompany === c.companyName &&
                        styles.chipTextActive,
                    ]}
                  >
                    {c.companyName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* DISTRIBUTOR */}
            <View style={styles.chipContainer}>
              {distributors.map((d) => (
                <TouchableOpacity
                  key={d._id}
                  style={[
                    styles.chip,
                    formData.itemDistributor === d.distributorName &&
                      styles.chipActive,
                  ]}
                  onPress={() =>
                    handleChange("itemDistributor", d.distributorName)
                  }
                >
                  <Text
                    style={[
                      styles.chipText,
                      formData.itemDistributor === d.distributorName &&
                        styles.chipTextActive,
                    ]}
                  >
                    {d.distributorName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* SUBMIT */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Item</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}