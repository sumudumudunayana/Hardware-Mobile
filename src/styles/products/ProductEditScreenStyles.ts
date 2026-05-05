import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
  },

  scrollContent: {
    padding: 16,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 20,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 4},
    elevation: 4,
  },

  title: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
    color: '#0f172a',
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#f8fafc',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    color: '#0f172a',
    borderColor: '#e2e8f0',
  },

  buttonRow: {
    marginTop: 10,
    gap: 10,
  },

  updateBtn: {
    backgroundColor: '#f59e0b',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  updateText: {
    color: '#fff',
    fontWeight: '700',
  },

  deleteBtn: {
    backgroundColor: '#fee2e2',
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },

  deleteText: {
    color: '#dc2626',
    fontWeight: '700',
  },


  chipContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginBottom: 12,
},

chip: {
  paddingHorizontal: 14,
  paddingVertical: 8,
  backgroundColor: '#e2e8f0',
  borderRadius: 20,
  marginRight: 8,
  marginBottom: 8,
},

chipActive: {
  backgroundColor: '#f59e0b',
},

chipText: {
  fontSize: 12,
  fontWeight: '600',
  color: '#334155',
},

chipTextActive: {
  color: '#ffffff',
},
});
