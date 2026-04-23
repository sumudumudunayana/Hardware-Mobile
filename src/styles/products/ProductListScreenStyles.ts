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

  /* HEADER SECTION */
  headingSection: {
    marginTop: 10,
    marginBottom: 18,
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

  /* SUMMARY CARDS */
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  summaryCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 18,
    marginHorizontal: 4,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },

  summaryLabel: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
  },

  summaryValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#f59e0b',
  },

  /* QUICK ACTION */
  quickActionCard: {
    backgroundColor: '#f59e0b',
    borderRadius: 20,
    padding: 20,
    marginBottom: 22,
  },

  quickActionTitle: {
    fontSize: 13,
    color: '#fff',
    opacity: 0.9,
  },

  quickActionText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fff',
    marginTop: 6,
  },

  quickActionSub: {
    fontSize: 13,
    color: '#fff',
    marginTop: 6,
    opacity: 0.9,
  },

  /* SECTION TITLE */
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 10,
  },

  /* PRODUCT CARD */
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,

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
  },

  productMeta: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 5,
  },

  /* BUTTONS */
  buttonRow: {
    flexDirection: 'row',
    marginTop: 14,
    justifyContent: 'space-between',
  },

  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 4,
  },

  viewBtn: {
    backgroundColor: '#e0f2fe',
  },

  editBtn: {
    backgroundColor: '#fef3c7',
  },

  deleteBtn: {
    backgroundColor: '#fee2e2',
  },

  btnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
})