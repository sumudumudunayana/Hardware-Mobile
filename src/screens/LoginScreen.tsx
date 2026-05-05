import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import Toast from 'react-native-toast-message';

import api from '../api/api';
import {AuthContext} from '../context/AuthContext';
import styles from '../styles/loginStyles';

export default function LoginScreen({navigation}: any) {
  const {login} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    //  VALIDATION
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Validation Error',
        text2: 'Please enter email and password',
      });
      return;
    }

    try {
      setLoading(true);

      const res = await api.post('/auth/login', {
        email,
        password,
      });

      const token = res.data.token;

      if (!token) {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: 'Token not received from server',
        });
        return;
      }

      await login(token);

      // SUCCESS TOAST
      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: 'Welcome back!',
      });

      // navigation handled by AuthContext
    } catch (error: any) {
      console.log('LOGIN ERROR:', error);

      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2:
          error.response?.data?.message ||
          error.message ||
          'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundGlow1} />
      <View style={styles.backgroundGlow2} />

      <View style={styles.card}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>SECURE ACCESS</Text>
        </View>

        <Text style={styles.title}>Welcome Back</Text>

        <Text style={styles.subtitle}>
          Sign in to access your hardware system.
        </Text>

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
          placeholder="Enter your password"
          placeholderTextColor="#64748b"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        {/* LOGIN BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#ffffff" />
          ) : (
            <Text style={styles.buttonText}>Login</Text>
          )}
        </TouchableOpacity>

        {/* REGISTER */}
        <Text style={styles.register}>
          Don’t have an account?{' '}
          <Text
            style={styles.registerLink}
            onPress={() => navigation.navigate('Register')}>
            Register
          </Text>
        </Text>
      </View>
    </View>
  );
}