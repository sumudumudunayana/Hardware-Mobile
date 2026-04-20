import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import api from "../../api/api";
import AppHeader from "../../components/AppHeader";
import styles from "../../styles/company/CompanyListScreenStyles";

export default function CompanyListScreen({
  navigation,
}: any) {
  const [companies, setCompanies] = useState<any[]>([]);
  const [filteredCompanies, setFilteredCompanies] =
    useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  /**
   * FETCH COMPANIES
   */
  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const res = await api.get("/companies");

      setCompanies(res.data);
      setFilteredCompanies(res.data);
    } catch (error: any) {
      if (error.response?.status === 401) {
        Alert.alert(
          "Session Expired",
          "Please login again"
        );

        navigation.replace("Login");
        return;
      }

      Alert.alert(
        "Error",
        error.response?.data?.message ||
          "Failed to fetch companies"
      );
    } finally {
      setLoading(false);
    }
  };

  /**
   * SEARCH
   */
  const handleSearch = (text: string) => {
    setSearch(text);

    const filtered = companies.filter(
      (company) =>
        company.companyName
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        company.companyEmail
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        company.companyContactNumber
          ?.toLowerCase()
          .includes(text.toLowerCase())
    );

    setFilteredCompanies(filtered);
  };

  /**
   * DELETE
   */
  const handleDelete = (company: any) => {
    Alert.alert(
      "Delete Company",
      `Are you sure you want to delete "${company.companyName}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(
                `/companies/${company._id}`
              );

              Alert.alert(
                "Success",
                "Company deleted successfully"
              );

              fetchCompanies();
            } catch (error: any) {
              Alert.alert(
                "Delete Failed",
                error.response?.data?.message ||
                  "Failed to delete company"
              );
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AppHeader
          title="Companies"
          onBack={() => navigation.goBack()}
        />

        {/* SEARCH */}
        <TextInput
          placeholder="Search by name, email, phone..."
          style={styles.searchInput}
          value={search}
          onChangeText={handleSearch}
        />

        {loading ? (
          <ActivityIndicator
            size="large"
            color="#f59e0b"
          />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            {filteredCompanies.map((company) => (
              <View
                key={company._id}
                style={styles.card}
              >
                <Text style={styles.companyName}>
                  {company.companyName}
                </Text>

                <Text style={styles.companyMeta}>
                  ID: {company.companyId}
                </Text>

                <Text style={styles.companyMeta}>
                  Phone: {company.companyContactNumber}
                </Text>

                <Text style={styles.companyMeta}>
                  Email: {company.companyEmail}
                </Text>

                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    style={[
                      styles.btn,
                      styles.viewBtn,
                    ]}
                    onPress={() =>
                      navigation.navigate(
                        "CompanyDetails",
                        { company }
                      )
                    }
                  >
                    <Text style={styles.btnText}>
                      View
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.btn,
                      styles.editBtn,
                    ]}
                    onPress={() =>
                      navigation.navigate(
                        "CompanyEdit",
                        { company }
                      )
                    }
                  >
                    <Text style={styles.btnText}>
                      Edit
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.btn,
                      styles.deleteBtn,
                    ]}
                    onPress={() =>
                      handleDelete(company)
                    }
                  >
                    <Text style={styles.btnText}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {/* FAB */}
        <TouchableOpacity
          style={styles.fab}
          onPress={() =>
            navigation.navigate("CompanyAdd")
          }
        >
          <Text style={styles.fabText}>+</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}