import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/customer/CustomerEditScreenStyles';

export default function CustomerEditScreen({
  route,
  navigation,
}: any) {
  const {customer} = route.params;

  const [formData, setFormData] = useState({
    ...customer,
  });

  const [loading, setLoading] = useState(false);

  //  HANDLE INPUT CHANGE
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
   * UPDATE CUSTOMER
   */
  const handleUpdate = async () => {
    if (!formData.customerName?.trim()) {
      Alert.alert(
        'Validation Error',
        'Customer name is required',
      );
      return;
    }

    if (
      !formData.customerContactNumber?.trim()
    ) {
      Alert.alert(
        'Validation Error',
        'Contact number is required',
      );
      return;
    }

    if (!formData.customerEmail?.trim()) {
      Alert.alert(
        'Validation Error',
        'Email is required',
      );
      return;
    }

    if (
      !/^\d{10}$/.test(
        formData.customerContactNumber,
      )
    ) {
      Alert.alert(
        'Validation Error',
        'Contact number must be exactly 10 digits',
      );
      return;
    }

    if (
      !/^\S+@\S+\.\S+$/.test(
        formData.customerEmail,
      )
    ) {
      Alert.alert(
        'Validation Error',
        'Invalid email address',
      );
      return;
    }

    try {
      setLoading(true);

      await api.put(
        `/customers/${formData._id}`,
        {
          customerName:
            formData.customerName,
          customerContactNumber:
            formData.customerContactNumber,
          customerEmail:
            formData.customerEmail,
        },
      );

      Alert.alert(
        'Success',
        'Customer updated successfully',
      );

      navigation.goBack();
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert(
          'Session Expired',
          'Please login again',
        );

        navigation.replace('Login');
        return;
      }

      Alert.alert(
        'Update Failed',
        error.response?.data?.message ||
          'Failed to update customer',
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE CUSTOMER
   */
  const handleDelete = () => {
    Alert.alert(
      'Delete Customer',
      'This action cannot be undone',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);

              await api.delete(
                `/customers/${formData._id}`,
              );

              Alert.alert(
                'Deleted',
                'Customer removed successfully',
              );

              navigation.goBack();
            } catch (error: any) {
              Alert.alert(
                'Delete Failed',
                error.response?.data
                  ?.message ||
                  'Failed to delete customer',
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
        title="Edit Customer"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }>
        <View style={styles.card}>
          <Text style={styles.title}>
            Edit Customer
          </Text>

          {/* NAME */}
          <Text style={styles.label}>
            Customer Name
          </Text>
          <TextInput
            style={styles.input}
            value={formData.customerName}
            placeholder="Customer Name"
            onChangeText={text =>
              handleChange(
                'customerName',
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
              formData.customerContactNumber
            }
            keyboardType="numeric"
            placeholder="Contact Number"
            onChangeText={text =>
              handleChange(
                'customerContactNumber',
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
            value={formData.customerEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email Address"
            onChangeText={text =>
              handleChange(
                'customerEmail',
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