import {StyleSheet} from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  container: {
    flex: 1,
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
    fontSize: 20,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 20,
  },

  label: {
  fontSize: 14,
  fontWeight: "600",
  color: "#334155",
  marginBottom: 6,
  marginTop: 12,

},

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    marginBottom: 14,
    color: '#64748b',
  },

  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  updateBtn: {
    backgroundColor: "#f59e0b",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  updateText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  deleteBtn: {
    backgroundColor: "#fee2e2",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 14,
  },

  deleteText: {
    color: "#dc2626",
    fontWeight: "700",
    fontSize: 15,
  },
});