import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f8fc',
  },

  container: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  headingSection: {
    marginTop: 10,
    marginBottom: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
  },

  subHeading: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 6,
  },

  /* TOP CARDS */
  topCardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  topCard: {
    flex: 1,
    padding: 18,
    borderRadius: 18,
    marginHorizontal: 4,
  },

  gradientDemand: {
    backgroundColor: '#6366f1',
  },

  gradientRevenue: {
    backgroundColor: '#f59e0b',
  },

  topLabel: {
    fontSize: 13,
    color: '#ffffff',
    opacity: 0.9,
  },

  topProduct: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
    marginTop: 6,
  },

  topValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 8,
  },

  /* BUTTON */
  refreshBtn: {
    backgroundColor: '#0f172a',
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    marginBottom: 20,
  },

  refreshText: {
    color: '#ffffff',
    fontWeight: '700',
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },

  /* CARD */
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},

    elevation: 4,

    borderWidth: 1,
    borderColor: '#eef2f7',
  },

  productName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
  },

  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },

  metric: {
    fontSize: 13,
    color: '#475569',
  },

  metricHighlight: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16a34a',
  },
});