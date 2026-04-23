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

  input: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    fontSize: 14,
    marginBottom: 14,
    color: "#0f172a",
  },

  textArea: {
    minHeight: 100,
    textAlignVertical: "top",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 10,
    marginTop: 6,
  },

  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },

  chip: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#cbd5e1",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 10,
  },

  chipActive: {
    backgroundColor: "#f59e0b",
    borderColor: "#f59e0b",
  },

  chipText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "500",
  },

  chipTextActive: {
    color: "#ffffff",
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#f59e0b",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },

  buttonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
});