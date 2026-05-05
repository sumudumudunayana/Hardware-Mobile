import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  container: {
    flex: 1,
  },

  scroll: {
    padding: 16,
    paddingBottom: 40,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* FILTER */
  filterRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },

  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e2e8f0',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },

  filterActive: {
    backgroundColor: '#f59e0b',
  },

  filterText: {
    fontSize: 12,
    color: '#334155',
    fontWeight: '600',
  },

  filterTextActive: {
    color: '#ffffff',
  },

  /* SUMMARY */
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 18,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 18,
    marginRight: 10,

    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  value: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },

  label: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginVertical: 12,
  },

  /* CHART */
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  /* PRODUCTS */
  productRow: {
    backgroundColor: '#ffffff',
    padding: 14,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,

    borderLeftWidth: 5,
    borderLeftColor: '#f59e0b',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },

  productName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
    flex: 1,
  },

  productRight: {
    alignItems: 'flex-end',
  },

  productRevenue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },

  productMeta: {
    fontSize: 12,
    color: '#64748b',
  },
});