import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/loginStyles";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Background Glow */}
      <View style={styles.backgroundGlow1} />
      <View style={styles.backgroundGlow2} />

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SECURE ACCESS</Text>
        </View>

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Sign in to access your hardware system.
        </Text>

        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Enter your password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Dashboard")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.register}>
          Don’t have an account?{" "}
          <Text style={styles.registerLink}
            onPress={() => navigation.navigate("Register")}>
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
}