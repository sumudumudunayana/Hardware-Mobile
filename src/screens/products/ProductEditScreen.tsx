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

import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/products/ProductEditScreenStyles';

export default function ProductEditScreen({
  route,
  navigation,
}: any) {
  const {item} = route.params;

  const [formData, setFormData] = useState({
    ...item,
    itemCostPrice: item.itemCostPrice || '',
    itemSellingPrice: item.itemSellingPrice || item.price || '',
    category: item.category || '',
    company: item.company || '',
    supplier: item.supplier || '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    key: string,
    value: string,
  ) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  /**
   * UPDATE PRODUCT
   */
  const handleUpdate = async () => {
    const cost = Number(formData.itemCostPrice);
    const selling = Number(formData.itemSellingPrice);

    if (!formData.name?.trim()) {
      Alert.alert(
        'Validation Error',
        'Item name is required',
      );
      return;
    }

    if (!formData.category?.trim()) {
      Alert.alert(
        'Validation Error',
        'Category is required',
      );
      return;
    }

    if (!formData.company?.trim()) {
      Alert.alert(
        'Validation Error',
        'Company is required',
      );
      return;
    }

    if (!formData.supplier?.trim()) {
      Alert.alert(
        'Validation Error',
        'Supplier is required',
      );
      return;
    }

    if (cost < 0 || selling < 0) {
      Alert.alert(
        'Validation Error',
        'Prices cannot be negative',
      );
      return;
    }

    if (selling < cost) {
      Alert.alert(
        'Validation Warning',
        'Selling price must be higher than cost price',
      );
      return;
    }

    try {
      setLoading(true);

      await api.put(`/items/${formData.id}`, {
        itemName: formData.name,
        itemCategory: formData.category,
        itemCompany: formData.company,
        itemDistributor: formData.supplier,
        itemCostPrice: cost,
        itemSellingPrice: selling,
      });

      Alert.alert(
        'Success',
        'Product updated successfully',
      );

      navigation.goBack();
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert(
          'Session Expired',
          'Please login again',
        );

        navigation.replace('Login');
        return;
      }

      Alert.alert(
        'Update Failed',
        error.response?.data?.message ||
          'Failed to update product',
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * DELETE PRODUCT
   */
  const handleDelete = () => {
    Alert.alert(
      'Delete Product',
      'This action cannot be undone',
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
              setLoading(true);

              await api.delete(
                `/items/${formData.id}`,
              );

              Alert.alert(
                'Deleted',
                'Product removed successfully',
              );

              navigation.goBack();
            } catch (error: any) {
              Alert.alert(
                'Delete Failed',
                error.response?.data?.message ||
                  'Failed to delete product',
              );
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
      <AppHeader
        title="Edit Product"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }>
        <View style={styles.card}>
          <Text style={styles.title}>
            Edit Product Details
          </Text>

          {/* ITEM NAME */}
          <Text style={styles.label}>
            Item Name
          </Text>
          <TextInput
            style={styles.input}
            value={formData.name}
            placeholder="Enter item name"
            onChangeText={text =>
              handleChange('name', text)
            }
          />

          {/* CATEGORY */}
          <Text style={styles.label}>
            Category
          </Text>
          <TextInput
            style={styles.input}
            value={formData.category}
            placeholder="Enter category"
            onChangeText={text =>
              handleChange('category', text)
            }
          />

          {/* COMPANY */}
          <Text style={styles.label}>
            Company
          </Text>
          <TextInput
            style={styles.input}
            value={formData.company}
            placeholder="Enter company"
            onChangeText={text =>
              handleChange('company', text)
            }
          />

          {/* SUPPLIER */}
          <Text style={styles.label}>
            Supplier
          </Text>
          <TextInput
            style={styles.input}
            value={formData.supplier}
            placeholder="Enter supplier"
            onChangeText={text =>
              handleChange('supplier', text)
            }
          />

          {/* COST PRICE */}
          <Text style={styles.label}>
            Cost Price
          </Text>
          <TextInput
            style={styles.input}
            value={String(
              formData.itemCostPrice,
            )}
            keyboardType="numeric"
            placeholder="Enter cost price"
            onChangeText={text =>
              handleChange(
                'itemCostPrice',
                text,
              )
            }
          />

          {/* SELLING PRICE */}
          <Text style={styles.label}>
            Selling Price
          </Text>
          <TextInput
            style={styles.input}
            value={String(
              formData.itemSellingPrice,
            )}
            keyboardType="numeric"
            placeholder="Enter selling price"
            onChangeText={text =>
              handleChange(
                'itemSellingPrice',
                text,
              )
            }
          />

          {/* ACTION BUTTONS */}
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.updateBtn}
              onPress={handleUpdate}
              disabled={loading}>
              {loading ? (
                <ActivityIndicator
                  color="#ffffff"
                />
              ) : (
                <Text
                  style={styles.updateText}>
                  Save Changes
                </Text>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={handleDelete}
              disabled={loading}>
              <Text style={styles.deleteText}>
                Delete
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}