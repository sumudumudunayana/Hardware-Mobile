import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    paddingHorizontal: 16,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /*
   HEADER
  */
  header: {
    marginBottom: 24,
    marginTop: 10,
  },

  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef3c7',
    color: '#92400e',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
    fontWeight: '700',
    fontSize: 12,
    marginBottom: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#0f172a',
  },

  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
  },

  /*
   CARD
  */
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,

    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 14,
  },

  infoText: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 10,
    fontWeight: '600',
  },

  /*
   ITEM BOX
  */
  itemBox: {
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#e2e8f0',
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

  /*
   PROMOTION BOX
  */
  promoBox: {
    backgroundColor: '#f0fdf4',
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#bbf7d0',
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
    fontStyle: 'italic',
  },

  /*
   SUMMARY
  */
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
    fontSize: 22,
    fontWeight: '800',
    color: '#f59e0b',
    marginTop: 10,
  },

  /*
   BUTTON
  */
  invoiceBtn: {
    backgroundColor: '#f59e0b',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',

    shadowColor: '#f59e0b',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 6,

    marginBottom: 30,
  },

  invoiceBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});