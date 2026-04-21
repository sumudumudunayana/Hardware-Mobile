// src/styles/SettingsScreenStyles.ts

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  scrollContent: {
    paddingBottom: 40,
  },

  profileCard: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 16,
    padding: 24,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f59e0b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },

  avatarText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
  },

  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },

  role: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '600',
    marginTop: 4,
  },

  email: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 8,
  },

  card: {
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },

  item: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },

  itemText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1e293b',
  },

  infoText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 8,
  },

  logoutBtn: {
    marginHorizontal: 16,
    marginTop: 6,
    backgroundColor: '#ef4444',
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: 'center',
  },

  logoutText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});