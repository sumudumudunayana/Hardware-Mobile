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

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/company/CompanyEditScreenStyles';

// TYPE DEFINITION
type CompanyForm = {
  _id?: string;
  companyName: string;
  companyDescription: string;
  companyAddress: string;
  companyContactNumber: string;
  companyEmail: string;
};

export default function CompanyEditScreen({route, navigation}: any) {
  const {company} = route.params;

  // TYPED STATE
  const [formData, setFormData] = useState<CompanyForm>({
    _id: company._id,
    companyName: company.companyName || '',
    companyDescription: company.companyDescription || '',
    companyAddress: company.companyAddress || '',
    companyContactNumber: company.companyContactNumber || '',
    companyEmail: company.companyEmail || '',
  });

  const [loading, setLoading] = useState(false);

  // TYPED HANDLE CHANGE
  const handleChange = (key: keyof CompanyForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // UPDATE COMPANY
  const handleUpdate = async () => {
    if (
      !formData.companyName.trim() ||
      !formData.companyDescription.trim() ||
      !formData.companyAddress.trim() ||
      !formData.companyContactNumber.trim() ||
      !formData.companyEmail.trim()
    ) {
      return Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'All fields are required',
      });
    }

    if (!/^\d{10}$/.test(formData.companyContactNumber)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Contact',
        text2: 'Contact number must be exactly 10 digits',
      });
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.companyEmail)) {
      return Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
    }

    try {
      setLoading(true);

      await api.put(`/companies/${formData._id}`, {
        companyName: formData.companyName,
        companyDescription: formData.companyDescription,
        companyAddress: formData.companyAddress,
        companyContactNumber: formData.companyContactNumber,
        companyEmail: formData.companyEmail,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Company updated successfully',
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
          error.response?.data?.message || 'Failed to update company',
      });
    } finally {
      setLoading(false);
    }
  };

  // DELETE COMPANY
  const handleDelete = () => {
    Alert.alert(
      'Delete Company',
      'This action cannot be undone',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              setLoading(true);

              await api.delete(`/companies/${formData._id}`);

              Toast.show({
                type: 'success',
                text1: 'Deleted',
                text2: 'Company removed successfully',
              });

              navigation.goBack();
            } catch (error: any) {
              Toast.show({
                type: 'error',
                text1: 'Delete Failed',
                text2:
                  error.response?.data?.message ||
                  'Failed to delete company',
              });
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
      <AppHeader title="Edit Company" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit Company</Text>

          {/* NAME */}
          <Text style={styles.label}>Company Name</Text>
          <TextInput
            style={styles.input}
            value={formData.companyName}
            placeholder="Company Name"
            placeholderTextColor="#64748b"
            onChangeText={text => handleChange('companyName', text)}
          />

          {/* DESCRIPTION */}
          <Text style={styles.label}>Company Description</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            multiline
            value={formData.companyDescription}
            placeholder="Company Description"
            placeholderTextColor="#64748b"
            onChangeText={text =>
              handleChange('companyDescription', text)
            }
          />

          {/* ADDRESS */}
          <Text style={styles.label}>Company Address</Text>
          <TextInput
            style={styles.input}
            value={formData.companyAddress}
            placeholder="Company Address"
            placeholderTextColor="#64748b"
            onChangeText={text =>
              handleChange('companyAddress', text)
            }
          />

          {/* CONTACT */}
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            value={formData.companyContactNumber}
            keyboardType="numeric"
            placeholder="Contact Number"
            placeholderTextColor="#64748b"
            onChangeText={text =>
              handleChange(
                'companyContactNumber',
                text.replace(/[^0-9]/g, ''),
              )
            }
          />

          {/* EMAIL */}
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={formData.companyEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Email Address"
            placeholderTextColor="#64748b"
            onChangeText={text => handleChange('companyEmail', text)}
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
    </View>
  );
}