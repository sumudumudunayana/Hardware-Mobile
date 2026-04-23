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
import styles from "../../styles/distributor/DistributorEditScreenStyles";

export default function DistributorEditScreen({
  route,
  navigation,
}: any) {
  const {distributor} = route.params;

  const [formData, setFormData] = useState({
    ...distributor,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    key: string,
    value: string,
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleUpdate = async () => {
    if (
      !formData.distributorName?.trim() ||
      !formData.distributorDescription?.trim() ||
      !formData.distributorContactNumber?.trim() ||
      !formData.distributorEmail?.trim()
    ) {
      Alert.alert(
        "Validation Error",
        "All fields are required",
      );
      return;
    }

    try {
      setLoading(true);

      await api.put(
        `/distributors/${formData._id}`,
        {
          distributorName:
            formData.distributorName,
          distributorDescription:
            formData.distributorDescription,
          distributorContactNumber:
            formData.distributorContactNumber,
          distributorEmail:
            formData.distributorEmail,
        },
      );

      Alert.alert(
        "Success",
        "Supplier updated successfully",
      );

      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        "Update Failed",
        error.response?.data?.message ||
          "Failed to update supplier",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Supplier",
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
                `/distributors/${formData._id}`,
              );

              Alert.alert(
                "Deleted",
                "Supplier removed successfully",
              );

              navigation.goBack();
            } catch (error: any) {
              Alert.alert(
                "Delete Failed",
                error.response?.data?.message ||
                  "Failed to delete supplier",
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
        title="Edit Supplier"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }>
        <View style={styles.card}>
          <Text style={styles.title}>
            Edit Supplier
          </Text>

          {/* NAME */}
          <Text style={styles.label}>
            Supplier Name
          </Text>
          <TextInput
            style={styles.input}
            value={formData.distributorName}
            placeholder="Supplier Name"
            onChangeText={(text) =>
              handleChange(
                "distributorName",
                text,
              )
            }
          />

          {/* DESCRIPTION */}
          <Text style={styles.label}>
            Description
          </Text>
          <TextInput
            style={[
              styles.input,
              styles.textArea,
            ]}
            multiline
            value={
              formData.distributorDescription
            }
            placeholder="Description"
            onChangeText={(text) =>
              handleChange(
                "distributorDescription",
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
              formData.distributorContactNumber
            }
            placeholder="Contact Number"
            keyboardType="numeric"
            onChangeText={(text) =>
              handleChange(
                "distributorContactNumber",
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
            value={formData.distributorEmail}
            placeholder="Email Address"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={(text) =>
              handleChange(
                "distributorEmail",
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
                <Text style={styles.updateText}>
                  Save Changes
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={handleDelete}
              disabled={loading}>
              <Text style={styles.deleteText}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}