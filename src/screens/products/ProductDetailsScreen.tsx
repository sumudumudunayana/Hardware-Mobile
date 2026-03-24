import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function ProductDetailsScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22 }}>Product Details</Text>

      <Text style={{ marginTop: 20 }}>Name: Hammer</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("ProductEdit")}
        style={{
          marginTop: 20,
          backgroundColor: "#2563eb",
          padding: 12,
          borderRadius: 10,
        }}
      >
        <Text style={{ color: "#fff" }}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}