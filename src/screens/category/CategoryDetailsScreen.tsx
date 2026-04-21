import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import AppHeader from "../../components/AppHeader";
import styles from "../../styles/category/CategoryDetailsScreenStyles";

export default function CategoryDetailsScreen({
  route,
  navigation,
}: any) {
  const { category } = route.params;

  return (
    <View style={styles.container}>
      <AppHeader
        title="Category Details"
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
            Category Information
          </Text>

          {/* CATEGORY ID */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Category ID
            </Text>
            <Text style={styles.value}>
              {category.categoryId}
            </Text>
          </View>

          {/* CATEGORY NAME */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Category Name
            </Text>
            <Text style={styles.value}>
              {category.categoryName}
            </Text>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.infoRow}>
            <Text style={styles.label}>
              Description
            </Text>
            <Text style={styles.value}>
              {category.categoryDescription}
            </Text>
          </View>

          {/* EDIT BUTTON */}
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate(
                "CategoryEdit",
                { category }
              )
            }
          >
            <Text style={styles.buttonText}>
              Edit Category
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}