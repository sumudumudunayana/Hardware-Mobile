// @ts-ignore
import DatePicker from 'react-native-modern-datepicker';

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/promotion/PromotionEditScreenStyles';

export default function PromotionEditScreen({route, navigation}: any) {
  const {promotion} = route.params;

  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateField, setDateField] = useState<'start' | 'end'>('start');

  const [formData, setFormData] = useState({
    promotionName: promotion.promotionName || '',
    promotionDescription: promotion.promotionDescription || '',
    discountType: promotion.discountType || 'percentage',
    discountValue: String(promotion.discountValue || ''),
    startDate: promotion.startDate ? promotion.startDate.split('T')[0] : '',
    endDate: promotion.endDate ? promotion.endDate.split('T')[0] : '',
    applyTo: promotion.applyTo || 'all',
    itemId: promotion.item?._id || '',
    status: promotion.status || 'active',
  });

  const handleChange = (key: string, value: string) => {
    setFormData((prev: any) => ({
      ...prev,
      [key]: value,
    }));
  };

  // OPEN DATE PICKER
  const openDatePicker = (field: 'start' | 'end') => {
    setDateField(field);
    setShowDatePicker(true);
  };

  // SELECT DATE
  const handleDateSelect = (date: string) => {
    if (dateField === 'start') {
      handleChange('startDate', date);
    } else {
      handleChange('endDate', date);
    }
    setShowDatePicker(false);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (
      !formData.promotionName.trim() ||
      !formData.promotionDescription.trim() ||
      !formData.discountValue ||
      !formData.startDate ||
      !formData.endDate
    ) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill all required fields',
      });
      return;
    }

    try {
      setLoading(true);

      await api.put(`/promotions/${promotion._id}`, {
        ...formData,
        discountValue: Number(formData.discountValue),
        itemId: formData.applyTo === 'specific' ? formData.itemId : null,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Promotion updated successfully',
      });

      setTimeout(() => navigation.goBack(), 1000);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2: error.response?.data?.message || 'Failed to update promotion',
      });
    } finally {
      setLoading(false);
    }
  };

  // DELETE
  const handleDelete = async () => {
    try {
      setLoading(true);

      await api.delete(`/promotions/${promotion._id}`);

      Toast.show({
        type: 'success',
        text1: 'Deleted',
        text2: 'Promotion deleted successfully',
      });

      setTimeout(() => navigation.goBack(), 1000);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Delete Failed',
        text2: error.response?.data?.message || 'Failed to delete promotion',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Edit Promotion" onBack={() => navigation.goBack()} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Edit Promotion</Text>

            {/* NAME */}
            <Text style={styles.label}>Promotion Name</Text>
            <TextInput
              style={styles.input}
              value={formData.promotionName}
              onChangeText={text => handleChange('promotionName', text)}
            />

            {/* DESCRIPTION */}
            <Text style={styles.label}>Promotion Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              multiline
              value={formData.promotionDescription}
              onChangeText={text => handleChange('promotionDescription', text)}
            />

            {/* DISCOUNT */}
            <Text style={styles.label}>Discount Value</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={formData.discountValue}
              onChangeText={text =>
                handleChange('discountValue', text.replace(/[^0-9]/g, ''))
              }
            />

            {/* START DATE */}
            <Text style={styles.label}>Start Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => openDatePicker('start')}>
              <Text style={styles.dateIcon}>📅</Text>

              <Text
                style={[
                  styles.dateText,
                  formData.startDate
                    ? styles.dateValue
                    : styles.datePlaceholder,
                ]}>
                {formData.startDate || 'Select Start Date'}
              </Text>
            </TouchableOpacity>

            {/* END DATE */}
            <Text style={styles.label}>End Date</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => openDatePicker('end')}>
              <Text style={styles.dateIcon}>📅</Text>

              <Text
                style={[
                  styles.dateText,
                  formData.endDate ? styles.dateValue : styles.datePlaceholder,
                ]}>
                {formData.endDate || 'Select End Date'}
              </Text>
            </TouchableOpacity>

            {/* UPDATE */}
            <TouchableOpacity
              style={[styles.updateBtn, loading && {opacity: 0.6}]}
              onPress={handleUpdate}
              disabled={loading}>
              <Text style={styles.updateText}>Save Changes</Text>
            </TouchableOpacity>

            {/* DELETE */}
            <TouchableOpacity
              style={[styles.deleteBtn, loading && {opacity: 0.6}]}
              onPress={handleDelete}
              disabled={loading}>
              <Text style={styles.deleteText}>Delete Promotion</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* DATE PICKER MODAL */}
        <Modal visible={showDatePicker} transparent animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{
                backgroundColor: '#fff',
                margin: 20,
                borderRadius: 12,
                padding: 10,
              }}>
              <DatePicker mode="calendar" onSelectedChange={handleDateSelect} />

              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                style={{padding: 10}}>
                <Text style={{textAlign: 'center'}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
