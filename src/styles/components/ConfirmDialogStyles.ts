import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden', // 🔥 IMPORTANT for background shapes

    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    shadowOffset: {width: 0, height: 5},
    elevation: 8,
  },

  // 🔥 BACKGROUND SHAPES
  bgCircleTop: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#facc15', // yellow
    opacity: 0.15,
    top: -40,
    left: -40,
  },

  bgCircleBottom: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#60a5fa', // blue
    opacity: 0.15,
    bottom: -60,
    right: -40,
  },

  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 8,
  },

  message: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 20,
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  cancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
    marginRight: 10,
  },

  cancelText: {
    color: '#334155',
    fontWeight: '600',
    fontSize: 14,
  },

  confirmBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: '#ef4444',
  },

  confirmText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 14,
  },
});