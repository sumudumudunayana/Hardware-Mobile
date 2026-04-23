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
    paddingTop: 10,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,

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
    marginBottom: 16,
  },

  infoRow: {
    marginBottom: 14,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 6,
  },

  value: {
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "500",
    lineHeight: 22,
  },
});