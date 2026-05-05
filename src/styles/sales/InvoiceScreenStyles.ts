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
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },

  badge: {
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
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },

  subtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
  },

  /*
   INFO CARD
  */
  infoCard: {
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

  infoText: {
    fontSize: 15,
    color: '#334155',
    marginBottom: 8,
    fontWeight: '600',
  },

  /*
   SECTION
  */
  section: {
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 14,
  },

  /*
   ITEM CARD
  */
  itemCard: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,

    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 3},
    elevation: 3,
  },

  itemName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },

  itemText: {
    fontSize: 14,
    color: '#475569',
    marginBottom: 4,
  },

  itemSubtotal: {
    marginTop: 8,
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },

  /*
   SUMMARY
  */
  summaryCard: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 18,

    borderWidth: 1,
    borderColor: '#e2e8f0',

    marginBottom: 24,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,
  },

  summaryText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 10,
  },

  discountText: {
    fontSize: 14,
    color: '#16a34a',
    marginBottom: 8,
    fontWeight: '600',
  },

  totalText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 12,
  },

  /*
   BUTTON
  */
  doneBtn: {
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

  doneText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});