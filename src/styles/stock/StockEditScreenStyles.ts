import {StyleSheet} from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    marginTop: 10,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,

    borderWidth: 1,
    borderColor: "#eef2f7",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#0f172a",
  },

  readOnlyInput: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#64748b',
  },

  buttonRow: {
    marginTop: 30,
    gap: 14,
  },

  updateBtn: {
    backgroundColor: "#f59e0b",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  updateText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },

  deleteBtn: {
    backgroundColor: "#fee2e2",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  deleteText: {
    color: "#dc2626",
    fontWeight: "700",
    fontSize: 15,
  },
});