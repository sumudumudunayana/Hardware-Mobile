import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    marginBottom: 20,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    fontWeight: '700',
    marginBottom: 10,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#0f172a',
  },

  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 14,
  },

  infoText: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 10,
    fontWeight: '600',
  },

  itemBox: {
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },

  itemText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },

  itemSubtotal: {
    marginTop: 6,
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },

  promoBox: {
    backgroundColor: '#f0fdf4',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  promoName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#166534',
    marginBottom: 4,
  },

  promoText: {
    fontSize: 14,
    color: '#15803d',
    marginBottom: 4,
  },

  noPromo: {
    fontSize: 14,
    color: '#64748b',
  },

  summaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
  },

  discountText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#16a34a',
    marginBottom: 10,
  },

  finalTotal: {
    fontSize: 20,
    fontWeight: '700',
    color: '#f59e0b',
    marginTop: 8,
  },

  invoiceBtn: {
    backgroundColor: '#f59e0b',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 30,
  },

  invoiceBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});