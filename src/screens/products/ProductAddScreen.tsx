import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/products/ProductAddScreenStyles';

export default function ProductAddScreen({navigation}: any) {
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    itemCategory: '',
    itemCostPrice: '',
    itemSellingPrice: '',
    itemLabeledPrice: '',
    itemCompany: '',
    itemDistributor: '',
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [distributors, setDistributors] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);

  // LOAD DROPDOWN DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [cat, com, dist] = await Promise.all([
          api.get('/categories'),
          api.get('/companies'),
          api.get('/distributors'),
        ]);

        setCategories(cat.data);
        setCompanies(com.data);
        setDistributors(dist.data);
      } catch (error: any) {
        if (error.response?.status === 401) {
          Toast.show({
            type: 'error',
            text1: 'Session Expired',
            text2: 'Please login again',
          });
          navigation.replace('Login');
          return;
        }

        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load dropdown data',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // HANDLE INPUT CHANGE
  const handleChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // SUBMIT NEW PRODUCT
  const handleSubmit = async () => {
    const cost = Number(formData.itemCostPrice);
    const selling = Number(formData.itemSellingPrice);
    const labeled = Number(formData.itemLabeledPrice);

    if (!formData.itemName.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Item name is required',
      });
      return;
    }

    if (!formData.itemCategory) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Select a category',
      });
      return;
    }

    if (!formData.itemCompany) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Select a company',
      });
      return;
    }

    if (!formData.itemDistributor) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Select a distributor',
      });
      return;
    }

    if (cost < 0 || selling < 0 || labeled < 0) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Prices',
        text2: 'Prices cannot be negative',
      });
      return;
    }

    if (selling < cost) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Pricing',
        text2: 'Selling price must be higher than cost price',
      });
      return;
    }

    try {
      setLoading(true);

      await api.post('/items', {
        ...formData,
        itemCostPrice: cost,
        itemSellingPrice: selling,
        itemLabeledPrice: labeled,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Product added successfully',
      });

      navigation.goBack();
    } catch (error: any) {
      if (error.response?.status === 401) {
        Toast.show({
          type: 'error',
          text1: 'Session Expired',
          text2: 'Please login again',
        });

        navigation.replace('Login');
        return;
      }

      Toast.show({
        type: 'error',
        text1: 'Add Failed',
        text2: error.response?.data?.message || 'Failed to add product',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Add Product" onBack={() => navigation.goBack()} />

        {loading ? (
          <ActivityIndicator size="large" color="#f59e0b" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            <View style={styles.card}>
              <Text style={styles.title}>Add New Item</Text>

              {/* NAME */}
              <TextInput
                placeholder="Item Name"
                style={styles.input}
                value={formData.itemName}
                onChangeText={text => handleChange('itemName', text)}
                placeholderTextColor="#64748b"
              />

              {/* CATEGORY */}
              <Text style={styles.label}>Category</Text>
              <View style={styles.chipContainer}>
                {categories.map(cat => (
                  <TouchableOpacity
                    key={cat._id}
                    style={[
                      styles.chip,
                      formData.itemCategory === cat.categoryName &&
                        styles.chipActive,
                    ]}
                    onPress={() =>
                      handleChange('itemCategory', cat.categoryName)
                    }>
                    <Text
                      style={[
                        styles.chipText,
                        formData.itemCategory === cat.categoryName &&
                          styles.chipTextActive,
                      ]}>
                      {cat.categoryName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* DESCRIPTION */}
              <TextInput
                placeholder="Description"
                style={[styles.input, styles.textArea]}
                multiline
                value={formData.itemDescription}
                onChangeText={text => handleChange('itemDescription', text)}
                placeholderTextColor="#64748b"
              />

              {/* PRICES */}
              <TextInput
                placeholder="Cost Price"
                style={styles.input}
                keyboardType="numeric"
                value={formData.itemCostPrice}
                onChangeText={text =>
                  handleChange('itemCostPrice', text.replace(/[^0-9]/g, ''))
                }
                placeholderTextColor="#64748b"
              />

              <TextInput
                placeholder="Selling Price"
                style={styles.input}
                keyboardType="numeric"
                value={formData.itemSellingPrice}
                onChangeText={text =>
                  handleChange('itemSellingPrice', text.replace(/[^0-9]/g, ''))
                }
                placeholderTextColor="#64748b"
              />

              <TextInput
                placeholder="Labeled Price"
                style={styles.input}
                keyboardType="numeric"
                value={formData.itemLabeledPrice}
                onChangeText={text =>
                  handleChange('itemLabeledPrice', text.replace(/[^0-9]/g, ''))
                }
                placeholderTextColor="#64748b"
              />

              {/* COMPANY */}
              <Text style={styles.label}>Company</Text>
              <View style={styles.chipContainer}>
                {companies.map(c => (
                  <TouchableOpacity
                    key={c._id}
                    style={[
                      styles.chip,
                      formData.itemCompany === c.companyName &&
                        styles.chipActive,
                    ]}
                    onPress={() => handleChange('itemCompany', c.companyName)}>
                    <Text
                      style={[
                        styles.chipText,
                        formData.itemCompany === c.companyName &&
                          styles.chipTextActive,
                      ]}>
                      {c.companyName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* DISTRIBUTOR */}
              <Text style={styles.label}>Distributor</Text>
              <View style={styles.chipContainer}>
                {distributors.map(d => (
                  <TouchableOpacity
                    key={d._id}
                    style={[
                      styles.chip,
                      formData.itemDistributor === d.distributorName &&
                        styles.chipActive,
                    ]}
                    onPress={() =>
                      handleChange('itemDistributor', d.distributorName)
                    }>
                    <Text
                      style={[
                        styles.chipText,
                        formData.itemDistributor === d.distributorName &&
                          styles.chipTextActive,
                      ]}>
                      {d.distributorName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* SUBMIT */}
              <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
                disabled={loading}>
                <Text style={styles.buttonText}>Add Item</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}
