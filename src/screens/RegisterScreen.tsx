import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import styles from "../styles/registerScreenStyles";

export default function RegisterScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          onChangeText={setName}
        />

        <TextInput
          placeholder="Enter your email"
          style={styles.input}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Create a password"
          secureTextEntry
          style={styles.input}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button}>
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