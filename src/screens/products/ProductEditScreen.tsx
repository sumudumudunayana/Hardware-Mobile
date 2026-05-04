import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import styles from '../../styles/products/ProductEditScreenStyles';

export default function ProductEditScreen({route, navigation}: any) {
  const {item} = route.params;

  const [formData, setFormData] = useState({
    _id: item._id || item.id,
    name: item.itemName || '',
    description: item.itemDescription || '',
    category: item.itemCategory || '',
    company: item.itemCompany || '',
    supplier: item.itemDistributor || '',
    itemCostPrice: String(item.itemCostPrice || ''),
    itemSellingPrice: String(item.itemSellingPrice || ''),
    itemLabeledPrice: String(item.itemLabeledPrice || ''),
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [companies, setCompanies] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // LOAD DATA
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [cat, com, sup] = await Promise.all([
          api.get('/categories'),
          api.get('/companies'),
          api.get('/distributors'),
        ]);

        setCategories(cat.data);
        setCompanies(com.data);
        setSuppliers(sup.data);
      } catch (error) {
        Toast.show({
          type: 'error',
          text1: 'Failed to load data',
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  // UPDATE PRODUCT
  const handleUpdate = async () => {
    const cost = Number(formData.itemCostPrice);
    const selling = Number(formData.itemSellingPrice);
    const labeled = Number(formData.itemLabeledPrice);

    // VALIDATION
    if (!formData.name.trim()) {
      return Toast.show({type: 'error', text1: 'Item name required'});
    }

    if (!formData.description.trim()) {
      return Toast.show({type: 'error', text1: 'Description required'});
    }

    if (!formData.category) {
      return Toast.show({type: 'error', text1: 'Select category'});
    }

    if (!formData.company) {
      return Toast.show({type: 'error', text1: 'Select company'});
    }

    if (!formData.supplier) {
      return Toast.show({type: 'error', text1: 'Select supplier'});
    }

    if (cost < 0 || selling < 0 || labeled < 0) {
      return Toast.show({type: 'error', text1: 'Invalid prices'});
    }

    if (selling <= cost) {
      return Toast.show({type: 'error', text1: 'Selling must be > cost'});
    }

    if (labeled <= selling || labeled <= cost) {
      return Toast.show({
        type: 'error',
        text1: 'Labeled must be highest',
      });
    }

    try {
      setLoading(true);

      await api.put(`/items/${formData._id}`, {
        itemName: formData.name,
        itemDescription: formData.description,
        itemCategory: formData.category,
        itemCompany: formData.company,
        itemDistributor: formData.supplier,
        itemCostPrice: cost,
        itemSellingPrice: selling,
        itemLabeledPrice: labeled,
      });

      Toast.show({
        type: 'success',
        text1: 'Product updated successfully',
      });

      setTimeout(() => navigation.goBack(), 1000);
    } catch (error: any) {
      console.log(error.response?.data);

      Toast.show({
        type: 'error',
        text1: 'Update failed',
        text2: error?.response?.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <AppHeader title="Edit Product" onBack={() => navigation.goBack()} />

      {loading ? (
        <ActivityIndicator size="large" color="#f59e0b" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Edit Product</Text>

            {/* NAME */}
            <Text style={styles.label}>Item Name</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              placeholder="Item name"
              placeholderTextColor="#94a3b8"
              onChangeText={t => handleChange('name', t)}
            />

            {/* DESCRIPTION */}
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, {height: 80}]}
              multiline
              value={formData.description}
              placeholder="Description"
              placeholderTextColor="#94a3b8"
              onChangeText={t => handleChange('description', t)}
            />

            {/* CATEGORY */}
            <Text style={styles.label}>Category</Text>
            <View style={styles.chipContainer}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat._id}
                  style={[
                    styles.chip,
                    formData.category === cat.categoryName &&
                      styles.chipActive,
                  ]}
                  onPress={() =>
                    handleChange('category', cat.categoryName)
                  }>
                  <Text
                    style={[
                      styles.chipText,
                      formData.category === cat.categoryName &&
                        styles.chipTextActive,
                    ]}>
                    {cat.categoryName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* COMPANY */}
            <Text style={styles.label}>Company</Text>
            <View style={styles.chipContainer}>
              {companies.map(c => (
                <TouchableOpacity
                  key={c._id}
                  style={[
                    styles.chip,
                    formData.company === c.companyName &&
                      styles.chipActive,
                  ]}
                  onPress={() =>
                    handleChange('company', c.companyName)
                  }>
                  <Text
                    style={[
                      styles.chipText,
                      formData.company === c.companyName &&
                        styles.chipTextActive,
                    ]}>
                    {c.companyName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* SUPPLIER */}
            <Text style={styles.label}>Supplier</Text>
            <View style={styles.chipContainer}>
              {suppliers.map(s => (
                <TouchableOpacity
                  key={s._id}
                  style={[
                    styles.chip,
                    formData.supplier === s.distributorName &&
                      styles.chipActive,
                  ]}
                  onPress={() =>
                    handleChange('supplier', s.distributorName)
                  }>
                  <Text
                    style={[
                      styles.chipText,
                      formData.supplier === s.distributorName &&
                        styles.chipTextActive,
                    ]}>
                    {s.distributorName}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* PRICES */}
            <Text style={styles.label}>Cost Price</Text>
            <TextInput
              style={styles.input}
              value={formData.itemCostPrice}
              keyboardType="numeric"
              placeholder="Cost"
              placeholderTextColor="#94a3b8"
              onChangeText={t =>
                handleChange('itemCostPrice', t.replace(/[^0-9]/g, ''))
              }
            />

            <Text style={styles.label}>Selling Price</Text>
            <TextInput
              style={styles.input}
              value={formData.itemSellingPrice}
              keyboardType="numeric"
              placeholder="Selling"
              placeholderTextColor="#94a3b8"
              onChangeText={t =>
                handleChange('itemSellingPrice', t.replace(/[^0-9]/g, ''))
              }
            />

            <Text style={styles.label}>Labeled Price</Text>
            <TextInput
              style={styles.input}
              value={formData.itemLabeledPrice}
              keyboardType="numeric"
              placeholder="Labeled"
              placeholderTextColor="#94a3b8"
              onChangeText={t =>
                handleChange('itemLabeledPrice', t.replace(/[^0-9]/g, ''))
              }
            />

            {/* BUTTON */}
            <TouchableOpacity
              style={[styles.updateBtn, loading && {opacity: 0.6}]}
              onPress={handleUpdate}
              disabled={loading}>
              <Text style={styles.updateText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
}