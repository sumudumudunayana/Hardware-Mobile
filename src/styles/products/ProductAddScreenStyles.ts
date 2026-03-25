import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // ✅ SAFE AREA WRAPPER
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  // ✅ MAIN CONTAINER
  container: {
    flex: 1,
  },

  // ✅ SCROLL CONTENT
  scrollContent: {
    paddingBottom: 30,
  },

  // ✅ CARD
  card: {
    margin: 16,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#ffffff",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  // ✅ TITLE
  title: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 15,
    color: "#0f172a",
  },

  // ✅ INPUT
  input: {
    backgroundColor: "#f8fafc",
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    color: "#0f172a",
  },

  // ✅ TEXT AREA
  textArea: {
    height: 90,
    textAlignVertical: "top", // 🔥 important for Android
  },

  // ✅ BUTTON
  button: {
    backgroundColor: "#f59e0b",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 12,

    shadowColor: "#f59e0b",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },

  // ✅ CHIP CONTAINER (🔥 FIX FOR CUT ISSUE)
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
  },

  // ✅ CHIP
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },

  chipActive: {
    backgroundColor: "#f59e0b",
  },

  chipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
  },

  chipTextActive: {
    color: "#ffffff",
  },

  
});