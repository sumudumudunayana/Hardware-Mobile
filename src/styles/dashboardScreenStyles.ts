import { StyleSheet } from "react-native";

export default StyleSheet.create({
  dashboardContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  dashboardGlowPrimary: {
    position: "absolute",
    width: 250,
    height: 250,
    backgroundColor: "rgba(251, 190, 36, 0.31)",
    borderRadius: 200,
    top: 40,
    left: -80,
    pointerEvents: "none",
  },

  dashboardGlowSecondary: {
    position: "absolute",
    width: 280,
    height: 280,
    backgroundColor: "rgba(96, 165, 250, 0.36)",
    borderRadius: 200,
    bottom: 40,
    right: -100,
    pointerEvents: "none",
  },

  dashboardHeader: {
    marginTop: 20,
    marginBottom: 20,
  },

  dashboardBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: "rgba(251,191,36,0.2)",
    marginBottom: 10,
  },

  dashboardBadgeText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#b45309",
  },

  dashboardTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0f172a",
  },

  dashboardSubtitle: {
    color: "#475569",
    marginTop: 5,
    fontSize: 13,
  },

  dashboardStatsRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  dashboardStatCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    marginRight: 10,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },

    elevation: 4,

    borderWidth: 1,
    borderColor: "#f1f5f9",
  },

  dashboardStatTitle: {
    fontSize: 12,
    color: "#64748b",
  },

  dashboardStatValue: {
    fontSize: 20,
    fontWeight: "800",
    marginTop: 5,
    color: "#0f172a",
  },

  dashboardGrid: {
    marginTop: 20,
  },

  dashboardCard: {
    backgroundColor: "#ffffff",
    padding: 18,
    borderRadius: 20,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },

    elevation: 5,

    borderWidth: 1,
    borderColor: "#eef2f7",
  },

  dashboardCardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  dashboardIcon: {
    fontSize: 22,
  },

  dashboardStatus: {
    fontSize: 11,
    color: "#16a34a",
    fontWeight: "600",
  },

  dashboardCardTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 5,
    color: "#0f172a",
  },

  dashboardCardDesc: {
    fontSize: 12,
    color: "#64748b",
  },

  dashboardLink: {
    marginTop: 10,
    color: "#2563eb",
    fontWeight: "600",
  },

  dashboardLogoutBtn: {
    position: "absolute",
    top: 30,
    right: 20,
    backgroundColor: "#ef4444",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  dashboardLogoutText: {
    color: "#fff",
    fontWeight: "600",
  },
});