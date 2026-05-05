import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Modal,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';
import {Dropdown} from 'react-native-element-dropdown';
// @ts-ignore
import DatePicker from 'react-native-modern-datepicker';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/stock/StockAddScreenStyles';

export default function StockAddScreen({navigation}: any) {
  const [items, setItems] = useState<any[]>([]);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const [formData, setFormData] = useState({
    quantity: '',
    arrivalDate: '',
  });

  const [loading, setLoading] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const fetchItems = async () => {
    try {
      const res = await api.get('/items');

      const formatted = res.data.map((item: any) => ({
        label: item.itemName,
        value: item._id,
        full: item,
      }));

      setItems(formatted);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.response?.data?.message || 'Failed to load products',
      });
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!selectedItem) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please select a product',
      });
      return;
    }

    const quantity = Number(formData.quantity);

    if (isNaN(quantity) || quantity <= 0) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Quantity must be greater than 0',
      });
      return;
    }

    if (!formData.arrivalDate.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Arrival date is required',
      });
      return;
    }

    try {
      setLoading(true);

      await api.post('/stocks', {
        itemId: selectedItem.value,
        quantity,
        arrivalDate: formData.arrivalDate,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Stock added successfully',
      });

      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Add Failed',
        text2: error.response?.data?.message || 'Failed to add stock',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Add Stock" onBack={() => navigation.goBack()} />

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Add New Stock</Text>

            <Text style={styles.sectionTitle}>Select Product</Text>

            <Dropdown
              style={styles.input}
              data={items}
              labelField="label"
              valueField="value"
              placeholder="Select product"
              placeholderStyle={{color: '#94a3b8'}}
              selectedTextStyle={{color: '#0f172a'}}
              itemTextStyle={{color: '#0f172a'}}
              search
              searchPlaceholder="Search product..."
              searchPlaceholderTextColor="#94a3b8"
              value={selectedItem?.value}
              onChange={item => setSelectedItem(item)}
            />

            <TextInput
              placeholder="Quantity"
              keyboardType="numeric"
              placeholderTextColor="#64748b"
              style={styles.input}
              value={formData.quantity}
              onChangeText={text =>
                handleChange('quantity', text.replace(/[^0-9]/g, ''))
              }
            />

            <Text style={styles.sectionTitle}>Arrival Date</Text>

            <TouchableOpacity
              style={styles.input}
              onPress={() => setShowDatePicker(true)}>
              <Text
                style={{
                  color: formData.arrivalDate ? '#0f172a' : '#64748b',
                }}>
                {formData.arrivalDate || 'Select arrival date'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, loading && {opacity: 0.6}]}
              onPress={handleSubmit}
              disabled={loading}>
              <Text style={styles.buttonText}>
                {loading ? 'Adding...' : 'Add Stock'}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>

      <Modal visible={showDatePicker} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View
            style={{
              backgroundColor: '#ffffff',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              padding: 20,
            }}>
            <DatePicker
              mode="calendar"
              onSelectedChange={(date: string) => {
                handleChange('arrivalDate', date);
                setShowDatePicker(false);
              }}
            />

            <TouchableOpacity
              onPress={() => setShowDatePicker(false)}
              style={{marginTop: 10}}>
              <Text style={{textAlign: 'center', color: '#ef4444'}}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}