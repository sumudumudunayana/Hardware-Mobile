import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  container: {
    flex: 1,
  },

  searchInput: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,

    fontSize: 14,
    color: "#0f172a",

    borderWidth: 1,
    borderColor: "#eef2f7",

    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 2,
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginTop: 10,
    marginBottom: 15,

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

  categoryName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0f172a",
  },

  categoryMeta: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },

  btn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 4,
  },

  viewBtn: {
    backgroundColor: "#e0f2fe",
  },

  editBtn: {
    backgroundColor: "#fef3c7",
  },

  deleteBtn: {
    backgroundColor: "#fee2e2",
  },

  btnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0f172a",
  },

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
    shadowOffset: {
      width: 0,
      height: 5,
    },
    elevation: 6,
  },

  fabText: {
    fontSize: 28,
    color: "#ffffff",
    fontWeight: "bold",
  },
});