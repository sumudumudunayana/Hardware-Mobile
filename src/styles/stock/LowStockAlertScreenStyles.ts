import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f8fc',
  },

  container: {
    flex: 1,
  },

  scroll: {
    padding: 16,
    paddingBottom: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* FILTER */
  filterScroll: {
    paddingBottom: 10,
    marginBottom: 10,
    paddingLeft: 2,
  },

  filterBtn: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 14,
    backgroundColor: '#fff',
    marginRight: 10,

    borderWidth: 1,
    borderColor: '#e2e8f0',

    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
  },

  filterActive: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },

  filterText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#334155',
  },

  filterTextActive: {
    color: '#fff',
    fontWeight: '700',
  },

  /* SUMMARY */
  summaryRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 10,

    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },

  value: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
  },

  label: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },

  /* LIST CARD */
  card: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 12,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },

  left: {
    flex: 1,
  },

  name: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },

  qty: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 2,
  },

  /* STATUS BADGES */
  statusOut: {
    backgroundColor: '#fee2e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusCritical: {
    backgroundColor: '#fed7aa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusLow: {
    backgroundColor: '#fef3c7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
});
