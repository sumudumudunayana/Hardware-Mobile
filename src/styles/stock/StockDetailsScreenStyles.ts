import { StyleSheet } from "react-native";

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

  infoRow: {
    marginBottom: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  label: {
    fontSize: 13,
    color: "#64748b",
    marginBottom: 6,
    fontWeight: "600",
  },

  value: {
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "600",
  },

  quantityValue: {
    fontSize: 18,
    color: "#f59e0b",
    fontWeight: "700",
  },

  button: {
    backgroundColor: "#f59e0b",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 20,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});