import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../api/api";
import AppHeader from "../../components/AppHeader";
import styles from "../../styles/company/CompanyAddScreenStyles";

export default function CompanyAddScreen({
  navigation,
}: any) {
  const [formData, setFormData] = useState({
    companyName: "",
    companyDescription: "",
    companyAddress: "",
    companyContactNumber: "",
    companyEmail: "",
  });

  const [loading, setLoading] = useState(false);

   // HANDLE INPUT CHANGE
  const handleChange = (
    key: string,
    value: string
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  /**
   * CREATE COMPANY
   */
  const handleSubmit = async () => {
    // Validation
    if (
      !formData.companyName.trim() ||
      !formData.companyDescription.trim() ||
      !formData.companyAddress.trim() ||
      !formData.companyContactNumber.trim() ||
      !formData.companyEmail.trim()
    ) {
      Alert.alert(
        "Validation Error",
        "All fields are required"
      );
      return;
    }

    if (
      !/^\d{10}$/.test(
        formData.companyContactNumber
      )
    ) {
      Alert.alert(
        "Validation Error",
        "Contact number must be exactly 10 digits"
      );
      return;
    }

    if (
      !/^\S+@\S+\.\S+$/.test(
        formData.companyEmail
      )
    ) {
      Alert.alert(
        "Validation Error",
        "Invalid email address"
      );
      return;
    }

    try {
      setLoading(true);

      await api.post("/companies", {
        companyName: formData.companyName,
        companyDescription:
          formData.companyDescription,
        companyAddress:
          formData.companyAddress,
        companyContactNumber:
          formData.companyContactNumber,
        companyEmail: formData.companyEmail,
      });

      Alert.alert(
        "Success",
        "Company added successfully"
      );

      navigation.goBack();
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
        "Add Failed",
        error.response?.data?.message ||
          "Failed to add company"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Add Company"
          onBack={() => navigation.goBack()}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <View style={styles.card}>
            <Text style={styles.title}>
              Add New Company
            </Text>

            {/* NAME */}
            <TextInput
              placeholder="Company Name"
              style={styles.input}
              value={formData.companyName}
              onChangeText={(text) =>
                handleChange(
                  "companyName",
                  text
                )
              }
            />

            {/* DESCRIPTION */}
            <TextInput
              placeholder="Company Description"
              style={[
                styles.input,
                styles.textArea,
              ]}
              multiline
              value={
                formData.companyDescription
              }
              onChangeText={(text) =>
                handleChange(
                  "companyDescription",
                  text
                )
              }
            />

            {/* ADDRESS */}
            <TextInput
              placeholder="Company Address"
              style={styles.input}
              value={formData.companyAddress}
              onChangeText={(text) =>
                handleChange(
                  "companyAddress",
                  text
                )
              }
            />

            {/* CONTACT */}
            <TextInput
              placeholder="Contact Number"
              style={styles.input}
              keyboardType="numeric"
              value={
                formData.companyContactNumber
              }
              onChangeText={(text) =>
                handleChange(
                  "companyContactNumber",
                  text
                )
              }
            />

            {/* EMAIL */}
            <TextInput
              placeholder="Email Address"
              style={styles.input}
              autoCapitalize="none"
              keyboardType="email-address"
              value={formData.companyEmail}
              onChangeText={(text) =>
                handleChange(
                  "companyEmail",
                  text
                )
              }
            />

            {/* SUBMIT */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator
                  color="#ffffff"
                />
              ) : (
                <Text style={styles.buttonText}>
                  Add Company
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}