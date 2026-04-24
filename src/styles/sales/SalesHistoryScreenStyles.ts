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

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 20,
    paddingHorizontal: 16,
  },

  empty: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#64748b',
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginTop: 12,
    marginBottom: 12,
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

  invoice: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  date: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 6,
  },

  total: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f59e0b',
    marginTop: 10,
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 16,
    justifyContent: 'space-between',
  },

  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  viewBtn: {
    backgroundColor: '#dbeafe',
  },

  expandBtn: {
    backgroundColor: '#fef3c7',
  },

  deleteBtn: {
    backgroundColor: '#fee2e2',
  },

  btnText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },

  expandedSection: {
    marginTop: 18,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingTop: 14,
  },

  itemBox: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    marginBottom: 10,
  },

  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },

  itemText: {
    fontSize: 13,
    color: '#475569',
    marginBottom: 2,
  },
});