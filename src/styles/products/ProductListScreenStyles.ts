import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fb',
    padding: 16,
  },

  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    marginBottom: 16,
  },

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
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
  },

  buttonRow: {
    flexDirection: 'row',
    marginTop: 12,
    justifyContent: 'space-between',
  },

  btn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
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
    fontSize: 12,
    fontWeight: '600',
  },

  fab: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    backgroundColor: '#f59e0b',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: {width: 0, height: 5},
    elevation: 6,
  },

  fabText: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },

  headerSpacer: {
    width: 26, // same as icon size → keeps title centered
  },

  backButton: {
    padding: 4,
  },

  backIcon: {
    fontSize: 26,
    color: '#0f172a',
  },
});
