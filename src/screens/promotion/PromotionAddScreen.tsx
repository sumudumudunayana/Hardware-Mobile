// @ts-ignore
import DatePicker from 'react-native-modern-datepicker';

import React, {useEffect, useState} from 'react';
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
import styles from '../../styles/promotion/PromotionAddScreenStyles';

export default function PromotionAddScreen({navigation}: any) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateField, setDateField] = useState<'start' | 'end'>('start');

  const [formData, setFormData] = useState({
    promotionName: '',
    promotionDescription: '',
    discountType: 'percentage',
    discountValue: '',
    startDate: '',
    endDate: '',
    applyTo: 'all',
    itemId: '',
    status: 'active',
  });

  // LOAD ITEMS
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get('/items');
        setItems(res.data);
      } catch (error: any) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load products',
        });
      }
    };

    fetchItems();
  }, []);

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

  // HANDLE DATE SELECT
  const handleDateSelect = (date: string) => {
    if (dateField === 'start') {
      handleChange('startDate', date);
    } else {
      handleChange('endDate', date);
    }
    setShowDatePicker(false);
  };

  const handleSubmit = async () => {
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

    if (formData.applyTo === 'specific' && !formData.itemId) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please select a product',
      });
      return;
    }

    try {
      setLoading(true);

      await api.post('/promotions', {
        ...formData,
        discountValue: Number(formData.discountValue),
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Promotion added successfully',
      });

      setTimeout(() => navigation.goBack(), 1000);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to add promotion',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Add Promotion" onBack={() => navigation.goBack()} />

        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Add New Promotion</Text>

            {/* NAME */}
            <TextInput
              placeholder="Promotion Name"
              style={styles.input}
              value={formData.promotionName}
              onChangeText={text => handleChange('promotionName', text)}
              placeholderTextColor="#64748b"
            />

            {/* DESCRIPTION */}
            <TextInput
              placeholder="Promotion Description"
              style={[styles.input, styles.textArea]}
              multiline
              value={formData.promotionDescription}
              onChangeText={text => handleChange('promotionDescription', text)}
              placeholderTextColor="#64748b"
            />

            {/* DISCOUNT VALUE */}
            <TextInput
              placeholder="Discount Value"
              style={styles.input}
              keyboardType="numeric"
              value={formData.discountValue}
              onChangeText={text =>
                handleChange('discountValue', text.replace(/[^0-9]/g, ''))
              }
              placeholderTextColor="#64748b"
            />

            {/* START DATE */}
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

            {/* DISCOUNT TYPE */}
            <Text style={styles.label}>Discount Type</Text>
            <View style={styles.chipContainer}>
              {['percentage', 'fixed'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.chip,
                    formData.discountType === type && styles.chipActive,
                  ]}
                  onPress={() => handleChange('discountType', type)}>
                  <Text
                    style={[
                      styles.chipText,
                      formData.discountType === type && styles.chipTextActive,
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* APPLY TO */}
            <Text style={styles.label}>Apply To</Text>
            <View style={styles.chipContainer}>
              {['all', 'specific'].map(type => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.chip,
                    formData.applyTo === type && styles.chipActive,
                  ]}
                  onPress={() => handleChange('applyTo', type)}>
                  <Text
                    style={[
                      styles.chipText,
                      formData.applyTo === type && styles.chipTextActive,
                    ]}>
                    {type}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* PRODUCT */}
            {formData.applyTo === 'specific' && (
              <>
                <Text style={styles.label}>Select Product</Text>
                <View style={styles.chipContainer}>
                  {items.map(item => (
                    <TouchableOpacity
                      key={item._id}
                      style={[
                        styles.chip,
                        formData.itemId === item._id && styles.chipActive,
                      ]}
                      onPress={() => handleChange('itemId', item._id)}>
                      <Text
                        style={[
                          styles.chipText,
                          formData.itemId === item._id && styles.chipTextActive,
                        ]}>
                        {item.itemName}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </>
            )}

            {/* STATUS */}
            <Text style={styles.label}>Status</Text>
            <View style={styles.chipContainer}>
              {['active', 'inactive'].map(status => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.chip,
                    formData.status === status && styles.chipActive,
                  ]}
                  onPress={() => handleChange('status', status)}>
                  <Text
                    style={[
                      styles.chipText,
                      formData.status === status && styles.chipTextActive,
                    ]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* SUBMIT */}
            <TouchableOpacity
              style={[styles.button, loading && {opacity: 0.6}]}
              onPress={handleSubmit}
              disabled={loading}>
              <Text style={styles.buttonText}>Add Promotion</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* DATE PICKER MODAL */}
        <Modal visible={showDatePicker} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <DatePicker mode="calendar" onSelectedChange={handleDateSelect} />

              <TouchableOpacity
                onPress={() => setShowDatePicker(false)}
                style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}
