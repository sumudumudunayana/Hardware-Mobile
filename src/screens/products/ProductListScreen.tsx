import React from 'react';
import {View, Text, TouchableOpacity, ScrollView, Alert} from 'react-native';
import AppHeader from "../../components/AppHeader";
import styles from '../../styles/products/ProductListScreenStyles';

export default function ProductListScreen({navigation}: any) {
  const products = [
    {id: 1, name: 'Hammer', price: 'Rs. 1500', stock: 10},
    {id: 2, name: 'Screwdriver', price: 'Rs. 800', stock: 25},
    {id: 3, name: 'Drill Machine', price: 'Rs. 12000', stock: 5},
    {id: 4, name: 'Wrench', price: 'Rs. 2000', stock: 15},
  ];

  const handleDelete = (item: any) => {
    Alert.alert(
      'Delete Product',
      `Are you sure you want to delete "${item.name}"?`,
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Deleted:', item.name);
          },
        },
      ],
    );
  };

  return (
  <View style={styles.container}>
    
    <AppHeader
      title="Products"
      onBack={() => navigation.goBack()}
    />

    <ScrollView showsVerticalScrollIndicator={false}>
      {products.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productMeta}>{item.price}</Text>
          <Text style={styles.productMeta}>Stock: {item.stock}</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.btn, styles.viewBtn]}
              onPress={() => navigation.navigate('ProductDetails')}>
              <Text style={styles.btnText}>View</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.editBtn]}
              onPress={() => navigation.navigate('ProductEdit')}>
              <Text style={styles.btnText}>Edit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.deleteBtn]}
              onPress={() => handleDelete(item)}>
              <Text style={styles.btnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>

    <TouchableOpacity
      style={styles.fab}
      onPress={() => navigation.navigate('ProductEdit')}>
      <Text style={styles.fabText}>+</Text>
    </TouchableOpacity>
  </View>
);
}
