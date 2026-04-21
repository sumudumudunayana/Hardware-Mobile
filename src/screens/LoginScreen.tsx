import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../api/api';
import {AuthContext} from '../context/AuthContext';
import styles from '../styles/loginStyles';

export default function LoginScreen({navigation}: any) {
  const {login} = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      Alert.alert('Validation Error', 'Please enter email and password');
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
        Alert.alert('Login Failed', 'Token not received from server');
        return;
      }
      // Save token using AuthContext
      await login(token);
      // No need for navigation.navigate("Main")
      // AppNavigator handles redirect automatically
    } catch (error: any) {
      console.log('LOGIN ERROR:', error);
      console.log('RESPONSE:', error.response?.data);
      console.log('MESSAGE:', error.message);

      Alert.alert(
        'Login Failed',
        error.response?.data?.message ||
          error.message ||
          'Something went wrong',
      );
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

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#64748b"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#64748b"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

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
