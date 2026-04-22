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

import api from "../../api/api";
import AppHeader from "../../components/AppHeader";
import styles from "../../styles/company/CompanyEditScreenStyles";

export default function CompanyEditScreen({
  route,
  navigation,
}: any) {
  const {company} = route.params;

  const [formData, setFormData] = useState({
    ...company,
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
   * UPDATE COMPANY
   */
  const handleUpdate = async () => {
    if (
      !formData.companyName?.trim() ||
      !formData.companyDescription?.trim() ||
      !formData.companyAddress?.trim() ||
      !formData.companyContactNumber?.trim() ||
      !formData.companyEmail?.trim()
    ) {
      Alert.alert(
        "Validation Error",
        "All fields are required",
      );
      return;
    }

    if (
      !/^\d{10}$/.test(
        formData.companyContactNumber,
      )
    ) {
      Alert.alert(
        "Validation Error",
        "Contact number must be exactly 10 digits",
      );
      return;
    }

    if (
      !/^\S+@\S+\.\S+$/.test(
        formData.companyEmail,
      )
    ) {
      Alert.alert(
        "Validation Error",
        "Invalid email address",
      );
      return;
    }

    try {
      setLoading(true);

      await api.put(
        `/companies/${formData._id}`,
        {
          companyName:
            formData.companyName,
          companyDescription:
            formData.companyDescription,
          companyAddress:
            formData.companyAddress,
          companyContactNumber:
            formData.companyContactNumber,
          companyEmail:
            formData.companyEmail,
        },
      );

      Alert.alert(
        "Success",
        "Company updated successfully",
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
        "Update Failed",
        error.response?.data?.message ||
          "Failed to update company",
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE COMPANY
   */
  const handleDelete = () => {
    Alert.alert(
      "Delete Company",
      "This action cannot be undone",
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
              setLoading(true);

              await api.delete(
                `/companies/${formData._id}`,
              );

              Alert.alert(
                "Deleted",
                "Company removed successfully",
              );

              navigation.goBack();
            } catch (error: any) {
              Alert.alert(
                "Delete Failed",
                error.response?.data?.message ||
                  "Failed to delete company",
              );
            } finally {
              setLoading(false);
            }
          },
        },
      ],
    );
  };

  return (
    <View style={styles.container}>
      <AppHeader
        title="Edit Company"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }>
        <View style={styles.card}>
          <Text style={styles.title}>
            Edit Company
          </Text>

          {/* NAME */}
          <Text style={styles.label}>
            Company Name
          </Text>
          <TextInput
            style={styles.input}
            value={formData.companyName}
            placeholder="Company Name"
            onChangeText={(text) =>
              handleChange(
                "companyName",
                text,
              )
            }
          />

          {/* DESCRIPTION */}
          <Text style={styles.label}>
            Company Description
          </Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            multiline
            value={
              formData.companyDescription
            }
            placeholder="Company Description"
            onChangeText={(text) =>
              handleChange(
                "companyDescription",
                text,
              )
            }
          />

          {/* ADDRESS */}
          <Text style={styles.label}>
            Company Address
          </Text>
          <TextInput
            style={styles.input}
            value={formData.companyAddress}
            placeholder="Company Address"
            onChangeText={(text) =>
              handleChange(
                "companyAddress",
                text,
              )
            }
          />

          {/* CONTACT */}
          <Text style={styles.label}>
            Contact Number
          </Text>
          <TextInput
            style={styles.input}
            value={
              formData.companyContactNumber
            }
            keyboardType="numeric"
            placeholder="Contact Number"
            onChangeText={(text) =>
              handleChange(
                "companyContactNumber",
                text,
              )
            }
          />

          {/* EMAIL */}
          <Text style={styles.label}>
            Email Address
          </Text>
          <TextInput
            style={styles.input}
            value={formData.companyEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email Address"
            onChangeText={(text) =>
              handleChange(
                "companyEmail",
                text,
              )
            }
          />

          {/* ACTIONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={handleUpdate}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text
                  style={
                    styles.updateText
                  }>
                  Save Changes
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={handleDelete}
              disabled={loading}>
              <Text
                style={styles.deleteText}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}