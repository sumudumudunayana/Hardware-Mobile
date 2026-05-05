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

  /* SUMMARY GRID */
  summaryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 18,
  },

  card: {
    width: '48%',
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    paddingHorizontal: 14,
    borderRadius: 18,
    marginBottom: 12,

    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: {width: 0, height: 5},
    elevation: 5,

    borderWidth: 1,
    borderColor: '#f1f5f9',
  },

  value: {
    fontSize: 20,
    fontWeight: '900',
    color: '#0f172a',
    textAlign: 'center',
  },

  label: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 6,
    textAlign: 'center',
  },

  /* TITLES */
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 12,
    marginBottom: 12,
  },

  /* CHART BOX */
  chartContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 22,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: {width: 0, height: 6},
    elevation: 6,

    borderWidth: 1,
    borderColor: '#f1f5f9',
  },

  
});