import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import Toast from 'react-native-toast-message';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/stock/StockEditScreenStyles';

export default function StockEditScreen({route, navigation}: any) {
  const {stock} = route.params;

  const [quantity, setQuantity] = useState(String(stock.quantity));
  const [loading, setLoading] = useState(false);

  /**
   * UPDATE STOCK
   */
  const handleUpdate = async () => {
    const updatedQty = Number(quantity);

    if (isNaN(updatedQty)) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter a valid quantity',
      });
      return;
    }

    if (updatedQty < 0) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Quantity cannot be negative',
      });
      return;
    }

    try {
      setLoading(true);

      await api.put(`/stocks/${stock._id}`, {
        quantity: updatedQty,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Stock updated successfully',
      });

      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Update Failed',
        text2:
          error.response?.data?.message ||
          'Failed to update stock',
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE STOCK
   */
  const handleDelete = () => {
    Alert.alert('Delete Stock', 'This action cannot be undone', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/stocks/${stock._id}`);

            Toast.show({
              type: 'success',
              text1: 'Deleted',
              text2: 'Stock deleted successfully',
            });

            navigation.goBack();
          } catch (error: any) {
            Toast.show({
              type: 'error',
              text1: 'Delete Failed',
              text2:
                error.response?.data?.message ||
                'Failed to delete stock',
            });
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Edit Stock" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Update Stock Quantity</Text>

          {/* PRODUCT NAME */}
          <Text style={styles.label}>Product</Text>

          <TextInput
            style={styles.readOnlyInput}
            value={stock.item?.itemName}
            editable={false}
            placeholderTextColor="#64748b"
          />

          {/* QUANTITY */}
          <Text style={styles.label}>Available Quantity</Text>

          <TextInput
            style={styles.input}
            value={quantity}
            keyboardType="numeric"
            placeholder="Enter quantity"
            onChangeText={text =>
              setQuantity(text.replace(/[^0-9]/g, ''))
            }
            placeholderTextColor="#64748b"
          />

          {/* ACTIONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.updateBtn, loading && {opacity: 0.6}]}
              onPress={handleUpdate}
              disabled={loading}>
              <Text style={styles.updateText}>
                {loading ? 'Saving...' : 'Save Changes'}
              </Text>
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