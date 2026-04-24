import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/stock/StockEditScreenStyles';

export default function StockEditScreen({route, navigation}: any) {
  const {stock} = route.params;

  const [quantity, setQuantity] = useState(String(stock.quantity));

  /**
   * UPDATE STOCK
   */
  const handleUpdate = async () => {
    const updatedQty = Number(quantity);

    if (isNaN(updatedQty)) {
      return Alert.alert('Validation Error', 'Please enter a valid quantity');
    }

    if (updatedQty < 0) {
      return Alert.alert('Validation Error', 'Quantity cannot be negative');
    }

    try {
      await api.put(`/stocks/${stock._id}`, {
        quantity: updatedQty,
      });

      Alert.alert('Success', 'Stock updated successfully');

      navigation.goBack();
    } catch (error: any) {
      Alert.alert(
        'Update Failed',
        error.response?.data?.message || 'Failed to update stock',
      );
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

            Alert.alert('Deleted', 'Stock deleted successfully');

            navigation.goBack();
          } catch (error: any) {
            Alert.alert(
              'Delete Failed',
              error.response?.data?.message || 'Failed to delete stock',
            );
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
          />

          {/* QUANTITY */}
          <Text style={styles.label}>Available Quantity</Text>

          <TextInput
            style={styles.input}
            value={quantity}
            keyboardType="numeric"
            placeholder="Enter quantity"
            onChangeText={setQuantity}
          />

          {/* ACTIONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.updateBtn} onPress={handleUpdate}>
              <Text style={styles.updateText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
