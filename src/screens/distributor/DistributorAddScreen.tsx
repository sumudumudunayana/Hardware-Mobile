import React, {useState} from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import api from "../../api/api";
import AppHeader from "../../components/AppHeader";
import styles from "../../styles/distributor/DistributorAddScreenStyles";

export default function DistributorAddScreen({
  navigation,
}: any) {
  const [formData, setFormData] = useState({
    distributorName: "",
    distributorDescription: "",
    distributorContactNumber: "",
    distributorEmail: "",
  });

  const [loading, setLoading] = useState(false);

  /**
   * HANDLE INPUT CHANGE
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
   * CREATE DISTRIBUTOR
   */
  const handleSubmit = async () => {
    if (
      !formData.distributorName.trim() ||
      !formData.distributorDescription.trim() ||
      !formData.distributorContactNumber.trim() ||
      !formData.distributorEmail.trim()
    ) {
      Alert.alert(
        "Validation Error",
        "All fields are required",
      );
      return;
    }

    if (
      formData.distributorName.trim().length < 2
    ) {
      Alert.alert(
        "Validation Error",
        "Supplier name must be at least 2 characters",
      );
      return;
    }

    try {
      setLoading(true);

      await api.post("/distributors", {
        distributorName:
          formData.distributorName,
        distributorDescription:
          formData.distributorDescription,
        distributorContactNumber:
          formData.distributorContactNumber,
        distributorEmail:
          formData.distributorEmail,
      });

      Alert.alert(
        "Success",
        "Supplier added successfully",
      );

      navigation.goBack();
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
        "Add Failed",
        error.response?.data?.message ||
          "Failed to add supplier",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Add Supplier"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            styles.scrollContent
          }>
          <View style={styles.card}>
            <Text style={styles.title}>
              Add New Supplier
            </Text>

            {/* NAME */}
            <TextInput
              placeholder="Supplier Name"
              style={styles.input}
              value={formData.distributorName}
              onChangeText={(text) =>
                handleChange(
                  "distributorName",
                  text,
                )
              }
            />

            {/* DESCRIPTION */}
            <TextInput
              placeholder="Supplier Description"
              style={[
                styles.input,
                styles.textArea,
              ]}
              multiline
              value={
                formData.distributorDescription
              }
              onChangeText={(text) =>
                handleChange(
                  "distributorDescription",
                  text,
                )
              }
            />

            {/* CONTACT */}
            <TextInput
              placeholder="Contact Number"
              style={styles.input}
              keyboardType="numeric"
              value={
                formData.distributorContactNumber
              }
              onChangeText={(text) =>
                handleChange(
                  "distributorContactNumber",
                  text,
                )
              }
            />

            {/* EMAIL */}
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.distributorEmail}
              onChangeText={(text) =>
                handleChange(
                  "distributorEmail",
                  text,
                )
              }
            />

            {/* SUBMIT */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator
                  color="#ffffff"
                />
              ) : (
                <Text style={styles.buttonText}>
                  Add Supplier
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}