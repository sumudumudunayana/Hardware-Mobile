import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import styles from "../styles/registerScreenStyles";

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post(
        "http://10.0.2.2:5500/api/auth/register", //  important change
        {
          name,
          email,
          password,
        }
      );

      Alert.alert("Success", "Registration successful");

      // go back to login
      navigation.navigate("Login");
    } catch (error: any) {
      Alert.alert(
        "Registration Failed",
        error.response?.data?.message || "Registration failed"
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Background Glow */}
      <View style={styles.glow1} />
      <View style={styles.glow2} />

      {/* Card */}
      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>NEW ACCOUNT</Text>
        </View>

        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Create your account to access the system
        </Text>

        <TextInput
          placeholder="Enter your name"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Create a password"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate("Login")}
          >
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}