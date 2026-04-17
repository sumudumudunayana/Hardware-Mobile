import { StyleSheet } from "react-native";

export default StyleSheet.create({
  headerContainer: {
    height: 56, // 🔥 standard header height
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "#ffffff",

    paddingHorizontal: 16,

    // SHADOW (iOS)
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    // ✨ ANDROID
    elevation: 3,
  },

  // LEFT + RIGHT sections
  side: {
    width: 40, // ensures perfect centering
    alignItems: "flex-start",
    justifyContent: "center",
  },

  // CENTER
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  // TITLE
  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#0f172a",
  },

  // BACK BUTTON
  backButton: {
    padding: 6,
    borderRadius: 10,
  },

  icon: {
    fontSize: 24,
    color: "#0f172a",
  },
});