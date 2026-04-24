import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 5,
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

  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  statCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 16,
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  statLabel: {
    fontSize: 13,
    color: '#64748b',
  },

  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginTop: 8,
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

  actionBtn: {
    backgroundColor: '#f8fafc',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  actionText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#0f172a',
  },

  invoiceText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },

  metaText: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 6,
  },

  totalText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#f59e0b',
    marginTop: 12,
  },

  invoiceBtn: {
    marginTop: 16,
    backgroundColor: '#f59e0b',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  invoiceBtnText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});