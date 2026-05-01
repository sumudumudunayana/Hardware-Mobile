import React, {useState} from 'react';
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
import styles from '../../styles/promotion/PromotionEditScreenStyles';

export default function PromotionEditScreen({route, navigation}: any) {
  const {promotion} = route.params;

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
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleUpdate = async () => {
    if (
      !formData.promotionName.trim() ||
      !formData.promotionDescription.trim() ||
      !formData.discountValue ||
      !formData.startDate ||
      !formData.endDate
    ) {
      return Alert.alert('Validation Error', 'Please fill all required fields');
    }

    try {
      await api.put(`/promotions/${promotion._id}`, {
        ...formData,
        discountValue: Number(formData.discountValue),
        itemId: formData.applyTo === 'specific' ? formData.itemId : null,
      });

      Alert.alert('Success', 'Promotion updated successfully');

      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        'Update Failed',
        error.response?.data?.message || 'Failed to update promotion',
      );
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Promotion',
      'Are you sure you want to delete this promotion?',
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
              await api.delete(`/promotions/${promotion._id}`);

              Alert.alert('Deleted', 'Promotion deleted successfully');

              navigation.goBack();
            } catch (error: any) {
              Alert.alert(
                'Delete Failed',
                error.response?.data?.message || 'Failed to delete promotion',
              );
            }
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Edit Promotion" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Edit Promotion</Text>

            {/* NAME */}
            <Text style={styles.label}>Promotion Name</Text>
            <TextInput
              placeholder="Promotion Name"
              style={styles.input}
              value={formData.promotionName}
              onChangeText={text => handleChange('promotionName', text)}
            />

            {/* DESCRIPTION */}
            <Text style={styles.label}>Promotion Description</Text>
            <TextInput
              placeholder="Promotion Description"
              style={[styles.input, styles.textArea]}
              multiline
              value={formData.promotionDescription}
              onChangeText={text => handleChange('promotionDescription', text)}
            />

            {/* DISCOUNT VALUE */}
            <Text style={styles.label}>Discount Value</Text>
            <TextInput
              placeholder="Discount Value"
              style={styles.input}
              keyboardType="numeric"
              value={formData.discountValue}
              onChangeText={text => handleChange('discountValue', text)}
            />

            {/* START DATE */}
            <Text style={styles.label}>Start Date</Text>
            <TextInput
              placeholder="YYYY-MM-DD"
              style={styles.input}
              value={formData.startDate}
              onChangeText={text => handleChange('startDate', text)}
            />

            {/* END DATE */}
            <Text style={styles.label}>End Date</Text>
            <TextInput
              placeholder="YYYY-MM-DD"
              style={styles.input}
              value={formData.endDate}
              onChangeText={text => handleChange('endDate', text)}
            />

            {/* UPDATE */}
            <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
              <Text style={styles.updateText}>Save Changes</Text>
            </TouchableOpacity>

            {/* DELETE */}
            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Text style={styles.deleteText}>Delete Promotion</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
