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

  /*
   CATEGORY SCROLL
  */
  categoryRow: {
    paddingTop: 14,
    paddingBottom: 10,
    paddingLeft: 16,
    paddingRight: 16,
    alignItems: 'center',
  },

  categoryBtn: {
  backgroundColor: '#ffffff',
  height: 36,              // 🔽 smaller
  minWidth: 90,
  paddingHorizontal: 14,
  borderRadius: 20,        // 🔥 more rounded (pill style)
  marginRight: 10,
  borderWidth: 1,
  borderColor: '#dbe2ea',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 5,
},

categoryText: {
  fontSize: 13,            // 🔽 slightly smaller
  fontWeight: '600',
  color: '#0f172a',
  textAlign: 'center',
},

  activeCategory: {
    backgroundColor: '#f59e0b',
    borderColor: '#f59e0b',
  },

  /*
   HEADER
  */
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 10,
    paddingHorizontal: 16,
  },

  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
  },

  cartBtn: {
    backgroundColor: '#f59e0b',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 14,
    marginLeft: 12,
  },

  cartText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },

  total: {
    fontSize: 16,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 14,
    paddingHorizontal: 16,
  },

  /*
   PRODUCT LIST
  */
  list: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },

  productName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },

  price: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 6,
    color: '#111827',
  },

  tag: {
    alignSelf: 'flex-start',
    backgroundColor: '#dbeafe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginTop: 10,
  },

  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1d4ed8',
  },

  qty: {
    marginTop: 12,
    fontWeight: '600',
    color: '#16a34a',
  },

  outStock: {
    color: '#dc2626',
  },

  lowStock: {
    color: '#f59e0b',
    marginTop: 4,
    fontWeight: '600',
  },

  addBtn: {
    marginTop: 14,
    backgroundColor: '#f59e0b',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },

  disabledBtn: {
    backgroundColor: '#cbd5e1',
  },

  addBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
});