import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/products/ProductEditScreenStyles';

export default function ProductEditScreen({route, navigation}: any) {
  const {item} = route.params;

  const [formData, setFormData] = useState({...item});
  const handleChange = (key: string, value: string) => {
    setFormData({...formData, [key]: value});
  };

  // UPDATE
  const handleUpdate = async () => {
    const cost = Number(formData.itemCostPrice || formData.price);
    const selling = Number(formData.itemSellingPrice || formData.price);

    if (!formData.name?.trim()) {
      return Alert.alert('Error', 'Item name is required');
    }
    if (cost < 0 || selling < 0) {
      return Alert.alert('Error', 'Prices cannot be negative');
    }
    if (selling < cost) {
      return Alert.alert('Warning', 'Selling must be higher than cost');
    }
    try {
      await axios.put(`http://10.0.2.2:5500/api/items/${formData.id}`, {
        itemName: formData.name,
        itemCostPrice: cost,
        itemSellingPrice: selling,
      });
      Alert.alert('Success', 'Item updated successfully');
      navigation.goBack();
    } catch (err: any) {
      Alert.alert('Error', 'Update failed');
    }
  };

  // DELETE
  const handleDelete = () => {
    Alert.alert('Delete Item', 'This action cannot be undone', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(`http://10.0.2.2:5500/api/items/${formData.id}`);

            Alert.alert('Deleted', 'Item removed successfully');
            navigation.goBack();
          } catch {
            Alert.alert('Error', 'Delete failed');
          }
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Edit Product" onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Edit Item</Text>

          {/* NAME */}
          <TextInput
            style={styles.input}
            value={formData.name}
            placeholder="Item Name"
            onChangeText={text => handleChange('name', text)}
          />

          {/* SELLING */}
          <TextInput
            style={styles.input}
            value={String(formData.price)}
            keyboardType="numeric"
            placeholder="Selling Price"
            onChangeText={text => handleChange('price', text)}
          />

          {/* COST */}
          <TextInput
            style={styles.input}
            value={String(formData.itemCostPrice || '')}
            keyboardType="numeric"
            placeholder="Cost Price"
            onChangeText={text => handleChange('itemCostPrice', text)}
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
