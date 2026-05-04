import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import ConfirmDialog from '../../components/ConfirmDialog';
import styles from '../../styles/customer/CustomerEditScreenStyles';

// ✅ TYPE
type CustomerForm = {
  _id?: string;
  customerName: string;
  customerContactNumber: string;
  customerEmail: string;
};

export default function CustomerEditScreen({route, navigation}: any) {
  const {customer} = route.params;

  // ✅ TYPED STATE
  const [formData, setFormData] = useState<CustomerForm>({
    _id: customer._id,
    customerName: customer.customerName || '',
    customerContactNumber: customer.customerContactNumber || '',
    customerEmail: customer.customerEmail || '',
  });

  const [loading, setLoading] = useState(false);

  // ✅ DIALOG STATE
  const [showDialog, setShowDialog] = useState(false);

  // ✅ TYPED CHANGE HANDLER
  const handleChange = (key: keyof CustomerForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  /**
   * UPDATE CUSTOMER
   */
  const handleUpdate = async () => {
    if (!formData.customerName.trim()) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Customer name is required',
      });
    }

    if (!formData.customerContactNumber.trim()) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Contact number is required',
      });
    }

    if (!formData.customerEmail.trim()) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Email is required',
      });
    }

    if (!/^\d{10}$/.test(formData.customerContactNumber)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Contact',
        text2: 'Contact number must be exactly 10 digits',
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.customerEmail)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
    }

    try {
      setLoading(true);

      await api.put(`/customers/${formData._id}`, {
        customerName: formData.customerName,
        customerContactNumber: formData.customerContactNumber,
        customerEmail: formData.customerEmail,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Customer updated successfully',
      });

      setTimeout(() => {
        navigation.goBack();
      }, 1000);

    } catch (error: any) {
      if (error.response?.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Session Expired',
          text2: 'Please login again',
        });

        navigation.replace('Login');
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2:
          error.response?.data?.message ||
          'Failed to update customer',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE CUSTOMER
   */
  const handleDelete = () => {
    setShowDialog(true);
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Edit Customer" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit Customer</Text>

          {/* NAME */}
          <Text style={styles.label}>Customer Name</Text>
          <TextInput
            style={styles.input}
            value={formData.customerName}
            placeholder="Customer Name"
            placeholderTextColor="#64748b"
            onChangeText={text => handleChange('customerName', text)}
          />

          {/* CONTACT */}
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            value={formData.customerContactNumber}
            keyboardType="numeric"
            placeholder="Contact Number"
            placeholderTextColor="#64748b"
            onChangeText={text =>
              handleChange(
                'customerContactNumber',
                text.replace(/[^0-9]/g, ''),
              )
            }
          />

          {/* EMAIL */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={formData.customerEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email Address"
            placeholderTextColor="#64748b"
            onChangeText={text => handleChange('customerEmail', text)}
          />

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.updateBtn, loading && {opacity: 0.6}]}
              onPress={handleUpdate}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#ffffff" />
              ) : (
                <Text style={styles.updateText}>Save Changes</Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={handleDelete}
              disabled={loading}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ✅ CONFIRM DIALOG */}
      <ConfirmDialog
        visible={showDialog}
        title="Delete Customer"
        message="This action cannot be undone"
        onCancel={() => setShowDialog(false)}
        onConfirm={async () => {
          try {
            setLoading(true);

            await api.delete(`/customers/${formData._id}`);

            Toast.show({
              type: 'success',
              text1: 'Deleted',
              text2: 'Customer removed successfully',
            });

            setShowDialog(false);
            navigation.goBack();
          } catch (error: any) {
            Toast.show({
              type: 'error',
              text1: 'Delete Failed',
              text2:
                error.response?.data?.message ||
                'Failed to delete customer',
            });
          } finally {
            setLoading(false);
          }
        }}
      />
    </View>
  );
}