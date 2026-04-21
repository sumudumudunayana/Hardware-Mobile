import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#eaf1f8',
  },

  backgroundGlow1: {
    position: 'absolute',
    width: 250,
    height: 250,
    backgroundColor: 'rgba(251, 191, 36, 0.2)',
    borderRadius: 200,
    top: 60,
    left: -80,
  },

  backgroundGlow2: {
    position: 'absolute',
    width: 280,
    height: 280,
    backgroundColor: 'rgba(96, 165, 250, 0.2)',
    borderRadius: 200,
    bottom: 40,
    right: -100,
  },

  card: {
    width: '100%',
    maxWidth: 380,
    padding: 30,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderWidth: 1,
    borderColor: 'rgba(148,163,184,0.2)',
  },

  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(251,191,36,0.2)',
    marginBottom: 15,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#b45309',
    letterSpacing: 1,
  },

  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    color: '#0f172a',
    marginBottom: 10,
  },

  subtitle: {
    textAlign: 'center',
    color: '#475569',
    fontSize: 14,
    marginBottom: 25,
  },

  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 14,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    color: '#111827',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#f59e0b',
    padding: 15,
    borderRadius: 14,
    marginTop: 10,
  },

  buttonText: {
    textAlign: 'center',
    fontWeight: '700',
    color: '#111827',
  },

  register: {
    textAlign: 'center',
    marginTop: 20,
    color: '#475569',
  },

  registerLink: {
    color: '#2563eb',
    fontWeight: '700',
  },
});
