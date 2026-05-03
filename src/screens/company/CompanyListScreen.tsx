import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useFocusEffect} from '@react-navigation/native';

import Toast from 'react-native-toast-message';
import api from '../../api/api';
import AppHeader from '../../components/AppHeader';
import ConfirmDialog from '../../components/ConfirmDialog'; // ✅ IMPORT
import styles from '../../styles/company/CompanyListScreenStyles';

export default function CompanyListScreen({navigation}: any) {
  const [companies, setCompanies] = useState<any[]>([]);
  const [filteredCompanies, setFilteredCompanies] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ DIALOG STATE
  const [showDialog, setShowDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState<any>(null);

  // FETCH COMPANIES
  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const res = await api.get('/companies');

      setCompanies(res.data);
      setFilteredCompanies(res.data);
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
        text2:
          error.response?.data?.message || 'Failed to fetch companies',
      });
    } finally {
      setLoading(false);
    }
  };

  // AUTO REFRESH
  useFocusEffect(
    React.useCallback(() => {
      fetchCompanies();
    }, []),
  );

  // SEARCH
  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = companies.filter(
      company =>
        company.companyName?.toLowerCase().includes(text.toLowerCase()) ||
        company.companyEmail?.toLowerCase().includes(text.toLowerCase()) ||
        company.companyContactNumber
          ?.toLowerCase()
          .includes(text.toLowerCase()),
    );

    setFilteredCompanies(filtered);
  };

  // ✅ OPEN DIALOG
  const openDeleteDialog = (company: any) => {
    setSelectedCompany(company);
    setShowDialog(true);
  };

  const totalCompanies = companies.length;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader title="Companies" onBack={() => navigation.goBack()} />

        {loading ? (
          <ActivityIndicator size="large" color="#f59e0b" />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>
            
            {/* HEADER */}
            <View style={styles.headingSection}>
              <Text style={styles.heading}>Company Overview</Text>
              <Text style={styles.subHeading}>
                Manage companies and company records
              </Text>
            </View>

            {/* SUMMARY */}
            <View style={styles.summaryRow}>
              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Total Companies</Text>
                <Text style={styles.summaryValue}>{totalCompanies}</Text>
              </View>

              <View style={styles.summaryCard}>
                <Text style={styles.summaryLabel}>Business Status</Text>
                <Text style={styles.summaryValue}>Active</Text>
              </View>
            </View>

            {/* QUICK ACTION */}
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => navigation.navigate('CompanyAdd')}>
              <Text style={styles.quickActionTitle}>Quick Action</Text>
              <Text style={styles.quickActionText}>Add New Company</Text>
              <Text style={styles.quickActionSub}>
                Tap here to register new companies
              </Text>
            </TouchableOpacity>

            <Text style={styles.sectionTitle}>Company List</Text>

            {/* SEARCH */}
            <TextInput
              placeholder="Search by name, email, phone..."
              placeholderTextColor="#64748b"
              style={styles.searchInput}
              value={search}
              onChangeText={handleSearch}
            />

            {/* LIST */}
            {filteredCompanies.map(company => (
              <View key={company._id} style={styles.card}>
                <Text style={styles.companyName}>
                  {company.companyName}
                </Text>

                <Text style={styles.companyMeta}>
                  Phone: {company.companyContactNumber}
                </Text>

                <Text style={styles.companyMeta}>
                  Email: {company.companyEmail}
                </Text>

                <View style={styles.buttonRow}>
                  {/* VIEW */}
                  <TouchableOpacity
                    style={[styles.btn, styles.viewBtn]}
                    onPress={() =>
                      navigation.navigate('CompanyDetails', {company})
                    }>
                    <Text style={styles.btnText}>View</Text>
                  </TouchableOpacity>

                  {/* EDIT */}
                  <TouchableOpacity
                    style={[styles.btn, styles.editBtn]}
                    onPress={() =>
                      navigation.navigate('CompanyEdit', {company})
                    }>
                    <Text style={styles.btnText}>Edit</Text>
                  </TouchableOpacity>

                  {/* DELETE */}
                  <TouchableOpacity
                    style={[styles.btn, styles.deleteBtn]}
                    onPress={() => openDeleteDialog(company)}>
                    <Text style={styles.btnText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>

      {/* ✅ CONFIRM DIALOG */}
      <ConfirmDialog
        visible={showDialog}
        title="Delete Company"
        message={`Are you sure you want to delete "${selectedCompany?.companyName}"?`}
        onCancel={() => setShowDialog(false)}
        onConfirm={async () => {
          try {
            await api.delete(`/companies/${selectedCompany._id}`);

            Toast.show({
              type: 'success',
              text1: 'Deleted',
              text2: 'Company deleted successfully',
            });

            setShowDialog(false);
            fetchCompanies();
          } catch (error: any) {
            Toast.show({
              type: 'error',
              text1: 'Delete Failed',
              text2:
                error.response?.data?.message ||
                'Failed to delete company',
            });
          }
        }}
      />
    </SafeAreaView>
  );
}