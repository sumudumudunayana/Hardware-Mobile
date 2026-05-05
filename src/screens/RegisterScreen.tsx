import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Toast from 'react-native-toast-message';

import api from '../api/api';
import styles from '../styles/registerScreenStyles';

export default function RegisterScreen({navigation}: any) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // VALIDATION
    if (!name || !email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please fill all fields',
      });
      return;
    }

    // Optional: Email format validation
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid Email',
        text2: 'Please enter a valid email address',
      });
      return;
    }

    // Optional: Password length
    if (password.length < 6) {
      Toast.show({
        type: 'error',
        text1: 'Weak Password',
        text2: 'Password must be at least 6 characters',
      });
      return;
    }

    try {
      setLoading(true);

      await api.post('/auth/register', {
        name,
        email,
        password,
      });

      // SUCCESS
      Toast.show({
        type: 'success',
        text1: 'Registration Successful',
        text2: 'You can now login',
      });

      setTimeout(() => {
        navigation.navigate('Login');
      }, 1000);
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Registration Failed',
        text2:
          error.response?.data?.message || 'Registration failed',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.glow1} />
      <View style={styles.glow2} />

      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>NEW ACCOUNT</Text>
        </View>

        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.subtitle}>
          Create your account to access the system
        </Text>

        {/* NAME */}
        <TextInput
          placeholder="Enter your name"
          placeholderTextColor="#64748b"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />

        {/* EMAIL */}
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#64748b"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Create a password"
          placeholderTextColor="#64748b"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleRegister}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Register</Text>
          )}
        </TouchableOpacity>

        {/* LOGIN LINK */}
        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}>
            Login
          </Text>
        </Text>
      </View>
    </View>
  );
}