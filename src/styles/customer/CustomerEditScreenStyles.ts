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
    marginBottom: 18,
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
    color: '#0f172a',
    marginBottom: 14,
  },

  buttonRow: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-between",
  },

  updateBtn: {
    flex: 1,
    backgroundColor: "#f59e0b",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 8,
  },

  deleteBtn: {
    flex: 1,
    backgroundColor: "#fee2e2",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginLeft: 8,
  },

  updateText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  deleteText: {
    color: "#b91c1c",
    fontSize: 14,
    fontWeight: "700",
  },
});