import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import styles from "../../styles/company/CompanyDetailsScreenStyles";

export default function CompanyDetailsScreen({
  route,
  navigation,
}: any) {
  const { company } = route.params;

  return (
    <View style={styles.container}>
      <AppHeader
        title="Company Details"
        onBack={() => navigation.goBack()}
      />

      <ScrollView
        contentContainerStyle={
          styles.scrollContent
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.title}>
            Company Information
          </Text>

          {/* COMPANY ID */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Company ID
            </Text>
            <Text style={styles.value}>
              {company.companyId}
            </Text>
          </View>

          {/* NAME */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Company Name
            </Text>
            <Text style={styles.value}>
              {company.companyName}
            </Text>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Description
            </Text>
            <Text style={styles.value}>
              {company.companyDescription}
            </Text>
          </View>

          {/* ADDRESS */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Address
            </Text>
            <Text style={styles.value}>
              {company.companyAddress}
            </Text>
          </View>

          {/* CONTACT */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Contact Number
            </Text>
            <Text style={styles.value}>
              {company.companyContactNumber}
            </Text>
          </View>

          {/* EMAIL */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Email Address
            </Text>
            <Text style={styles.value}>
              {company.companyEmail}
            </Text>
          </View>

          {/* EDIT BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(
                "CompanyEdit",
                { company }
              )
            }
          >
            <Text style={styles.buttonText}>
              Edit Company
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}