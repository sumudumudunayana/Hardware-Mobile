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

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  empty: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginTop: 40,
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 14,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 3,
  },

  name: {
    fontSize: 17,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },

  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },

  qtyBtn: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },

  qtyInput: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 16,
    height: 40,
    color: '#0f172a',
  },

  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  summary: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  summaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },

  discount: {
    fontSize: 14,
    color: '#16a34a',
    marginBottom: 6,
    fontWeight: '600',
  },

  total: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 10,
  },

  primaryBtn: {
    backgroundColor: '#f59e0b',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 12,
  },

  primaryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  secondaryBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#cbd5e1',
    marginHorizontal: 16,
    marginBottom: 30,
  },

  secondaryText: {
    color: '#0f172a',
    fontSize: 15,
    fontWeight: '600',
  },
});