import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/promotion/PromotionAddScreenStyles';

export default function PromotionAddScreen({navigation}: any) {
  const [items, setItems] = useState<any[]>([]);

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
      } catch (error) {
        Alert.alert('Error', 'Failed to load products');
      }
    };

    fetchItems();
  }, []);

  /**
   * HANDLE CHANGE
   */
  const handleChange = (key: string, value: string) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  /**
   * SUBMIT
   */
  const handleSubmit = async () => {
    if (
      !formData.promotionName.trim() ||
      !formData.promotionDescription.trim() ||
      !formData.discountValue ||
      !formData.startDate ||
      !formData.endDate
    ) {
      return Alert.alert('Validation Error', 'Please fill all required fields');
    }

    if (formData.applyTo === 'specific' && !formData.itemId) {
      return Alert.alert('Validation Error', 'Please select a product');
    }

    try {
      await api.post('/promotions', {
        ...formData,
        discountValue: Number(formData.discountValue),
      });

      Alert.alert('Success', 'Promotion added successfully');

      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to add promotion',
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Add Promotion" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Add New Promotion</Text>

            {/* NAME */}
            <TextInput
              placeholder="Promotion Name"
              style={styles.input}
              value={formData.promotionName}
              onChangeText={text => handleChange('promotionName', text)}
            />

            {/* DESCRIPTION */}
            <TextInput
              placeholder="Promotion Description"
              style={[styles.input, styles.textArea]}
              multiline
              value={formData.promotionDescription}
              onChangeText={text => handleChange('promotionDescription', text)}
            />

            {/* DISCOUNT VALUE */}
            <TextInput
              placeholder="Discount Value"
              style={styles.input}
              keyboardType="numeric"
              value={formData.discountValue}
              onChangeText={text => handleChange('discountValue', text)}
            />

            {/* START DATE */}
            <TextInput
              placeholder="Start Date (YYYY-MM-DD)"
              style={styles.input}
              value={formData.startDate}
              onChangeText={text => handleChange('startDate', text)}
            />

            {/* END DATE */}
            <TextInput
              placeholder="End Date (YYYY-MM-DD)"
              style={styles.input}
              value={formData.endDate}
              onChangeText={text => handleChange('endDate', text)}
            />

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
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Add Promotion</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
