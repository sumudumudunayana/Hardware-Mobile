import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles/components/AppHeaderStyles";

export default function AppHeader({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  return (
    <View style={styles.container}>
      {/* BACK BUTTON */}
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Icon name="chevron-back" style={styles.icon} />
      </TouchableOpacity>

      {/* TITLE */}
      <Text style={styles.title}>{title}</Text>

      {/* SPACER */}
      <View style={styles.spacer} />
    </View>
  );
}