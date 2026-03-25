import { StyleSheet } from "react-native";

export default StyleSheet.create({
  // ✅ SAFE AREA
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  // ✅ MAIN CONTAINER (NO PADDING HERE)
  container: {
    flex: 1,
  },

  // ✅ SCROLL CONTENT (padding moved here)
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  // ✅ CARD
  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 15,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,

    borderWidth: 1,
    borderColor: "#eef2f7",
  },

  // ✅ PRODUCT NAME
  productName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },

  // ✅ META TEXT
  productMeta: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },

  // ✅ BUTTON ROW
  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },

  // ✅ BASE BUTTON
  btn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },

  // ✅ BUTTON VARIANTS
  viewBtn: {
    backgroundColor: "#e0f2fe",
  },

  editBtn: {
    backgroundColor: "#fef3c7",
  },

  deleteBtn: {
    backgroundColor: "#fee2e2",
  },

  // ✅ BUTTON TEXT
  btnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0f172a",
  },

  // ✅ FLOATING BUTTON (FAB)
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#f59e0b",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 6,
  },

  fabText: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
});