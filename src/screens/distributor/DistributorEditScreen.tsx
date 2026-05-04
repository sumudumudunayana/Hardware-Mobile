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
import styles from '../../styles/distributor/DistributorEditScreenStyles';

// ✅ TYPE DEFINITION
type DistributorForm = {
  _id?: string;
  distributorName: string;
  distributorDescription: string;
  distributorContactNumber: string;
  distributorEmail: string;
};

export default function DistributorEditScreen({route, navigation}: any) {
  const {distributor} = route.params;

  // ✅ TYPED STATE (fixes prev issue)
  const [formData, setFormData] = useState<DistributorForm>({
    _id: distributor._id,
    distributorName: distributor.distributorName || '',
    distributorDescription: distributor.distributorDescription || '',
    distributorContactNumber: distributor.distributorContactNumber || '',
    distributorEmail: distributor.distributorEmail || '',
  });

  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  // ✅ FIXED HANDLE CHANGE (typed key)
  const handleChange = (key: keyof DistributorForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // UPDATE
  const handleUpdate = async () => {
    if (
      !formData.distributorName.trim() ||
      !formData.distributorDescription.trim() ||
      !formData.distributorContactNumber.trim() ||
      !formData.distributorEmail.trim()
    ) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'All fields are required',
      });
    }

    if (!/^\d{10}$/.test(formData.distributorContactNumber)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Contact',
        text2: 'Contact number must be exactly 10 digits',
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.distributorEmail)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
    }

    try {
      setLoading(true);

      await api.put(`/distributors/${formData._id}`, {
        distributorName: formData.distributorName,
        distributorDescription: formData.distributorDescription,
        distributorContactNumber: formData.distributorContactNumber,
        distributorEmail: formData.distributorEmail,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Supplier updated successfully',
      });

      setTimeout(() => navigation.goBack(), 1000);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2:
          error.response?.data?.message ||
          'Failed to update supplier',
      });
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = () => {
    setShowDialog(true);
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Edit Supplier" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit Supplier</Text>

          {/* NAME */}
          <Text style={styles.label}>Supplier Name</Text>
          <TextInput
            style={styles.input}
            value={formData.distributorName}
            placeholder="Supplier Name"
            placeholderTextColor="#64748b"
            onChangeText={text => handleChange('distributorName', text)}
          />

          {/* DESCRIPTION */}
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={formData.distributorDescription}
            placeholder="Description"
            placeholderTextColor="#64748b"
            onChangeText={text =>
              handleChange('distributorDescription', text)
            }
          />

          {/* CONTACT */}
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            value={formData.distributorContactNumber}
            placeholder="Contact Number"
            placeholderTextColor="#64748b"
            keyboardType="numeric"
            onChangeText={text =>
              handleChange(
                'distributorContactNumber',
                text.replace(/[^0-9]/g, ''),
              )
            }
          />

          {/* EMAIL */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={formData.distributorEmail}
            placeholder="Email Address"
            placeholderTextColor="#64748b"
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text =>
              handleChange('distributorEmail', text)
            }
          />

          {/* BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.updateBtn, loading && {opacity: 0.6}]}
              onPress={handleUpdate}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
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

      {/* CONFIRM DIALOG */}
      <ConfirmDialog
        visible={showDialog}
        title="Delete Supplier"
        message={`Are you sure you want to delete "${formData.distributorName}"?`}
        onCancel={() => setShowDialog(false)}
        onConfirm={async () => {
          try {
            setLoading(true);

            await api.delete(`/distributors/${formData._id}`);

            Toast.show({
              type: 'success',
              text1: 'Deleted',
              text2: 'Supplier removed successfully',
            });

            setShowDialog(false);
            navigation.goBack();
          } catch (error: any) {
            Toast.show({
              type: 'error',
              text1: 'Delete Failed',
              text2:
                error.response?.data?.message ||
                'Failed to delete supplier',
            });
          } finally {
            setLoading(false);
          }
        }}
      />
    </View>
  );
}