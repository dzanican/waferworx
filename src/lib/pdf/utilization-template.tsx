"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 10,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderBottom: "2px solid #2563eb",
    paddingBottom: 10,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2563eb",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 10,
    color: "#6b7280",
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#f3f4f6",
    padding: 5,
    marginBottom: 8,
  },
  row: {
    flexDirection: "row",
    marginBottom: 5,
  },
  label: {
    width: 120,
    fontWeight: "bold",
    color: "#374151",
  },
  value: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  gridItem: {
    width: "50%",
    marginBottom: 8,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#1f2937",
    padding: 8,
    color: "#ffffff",
  },
  tableHeaderCell: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #e5e7eb",
    padding: 6,
  },
  tableRowAlt: {
    flexDirection: "row",
    borderBottom: "1px solid #e5e7eb",
    padding: 6,
    backgroundColor: "#f9fafb",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
  tableCellLeft: {
    flex: 2,
    textAlign: "left",
  },
  totalRow: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    padding: 8,
    fontWeight: "bold",
  },
  summaryBox: {
    backgroundColor: "#f3f4f6",
    padding: 15,
    marginTop: 15,
    borderRadius: 4,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#9ca3af",
    borderTop: "1px solid #e5e7eb",
    paddingTop: 10,
  },
  signatureSection: {
    marginTop: 30,
    flexDirection: "row",
  },
  signatureBox: {
    width: "45%",
    marginRight: "10%",
  },
  signatureLine: {
    borderBottom: "1px solid #000",
    marginTop: 30,
    marginBottom: 5,
  },
});

interface UtilizationData {
  sheetId: string;
  technician: {
    name: string;
    email: string;
  };
  job: {
    number: string;
    title: string;
    customer: string;
    site: string;
  };
  week: {
    year: number;
    number: number;
    startDate: string;
    endDate: string;
  };
  hours: {
    category: string;
    code: string;
    isBillable: boolean;
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    total: number;
  }[];
  totals: {
    daily: number[];
    grand: number;
    billable: number;
    nonBillable: number;
  };
  notes: string;
  status: string;
  submittedAt?: string;
  approvedAt?: string;
  approvedBy?: string;
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export function UtilizationDocument({ data }: { data: UtilizationData }) {
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>WaferWorx</Text>
            <Text style={styles.subtitle}>Field Service Management</Text>
          </View>
          <View style={{ textAlign: "right" }}>
            <Text style={styles.title}>Utilization Sheet</Text>
            <Text style={styles.subtitle}>
              WW{data.week.number} {data.week.year}
            </Text>
          </View>
        </View>

        {/* Info Section */}
        <View style={styles.section}>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Technician:</Text>
                <Text style={styles.value}>{data.technician.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Job Number:</Text>
                <Text style={styles.value}>{data.job.number}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Customer:</Text>
                <Text style={styles.value}>{data.job.customer}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Week:</Text>
                <Text style={styles.value}>
                  {data.week.startDate} - {data.week.endDate}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Hours Table */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hours by Category</Text>
          <View style={styles.table}>
            {/* Header */}
            <View style={styles.tableHeader}>
              <Text style={{ ...styles.tableCellLeft, ...styles.tableHeaderCell }}>Category</Text>
              <Text style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>Code</Text>
              <Text style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>Billable</Text>
              {days.map((day) => (
                <Text key={day} style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>
                  {day}
                </Text>
              ))}
              <Text style={{ ...styles.tableCell, ...styles.tableHeaderCell }}>Total</Text>
            </View>

            {/* Data Rows */}
            {data.hours.map((row, index) => (
              <View key={index} style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}>
                <Text style={styles.tableCellLeft}>{row.category}</Text>
                <Text style={styles.tableCell}>{row.code}</Text>
                <Text style={styles.tableCell}>{row.isBillable ? "Yes" : "No"}</Text>
                <Text style={styles.tableCell}>{row.monday || "-"}</Text>
                <Text style={styles.tableCell}>{row.tuesday || "-"}</Text>
                <Text style={styles.tableCell}>{row.wednesday || "-"}</Text>
                <Text style={styles.tableCell}>{row.thursday || "-"}</Text>
                <Text style={styles.tableCell}>{row.friday || "-"}</Text>
                <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>{row.total}</Text>
              </View>
            ))}

            {/* Totals Row */}
            <View style={styles.totalRow}>
              <Text style={styles.tableCellLeft}>Daily Total</Text>
              <Text style={styles.tableCell}></Text>
              <Text style={styles.tableCell}></Text>
              {data.totals.daily.map((total, index) => (
                <Text key={index} style={styles.tableCell}>
                  {total}
                </Text>
              ))}
              <Text style={{ ...styles.tableCell, fontWeight: "bold" }}>{data.totals.grand}</Text>
            </View>
          </View>
        </View>

        {/* Summary */}
        <View style={styles.summaryBox}>
          <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
            <View>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Total Hours</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>{data.totals.grand}</Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Billable Hours</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#059669" }}>
                {data.totals.billable}
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Non-Billable Hours</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#6b7280" }}>
                {data.totals.nonBillable}
              </Text>
            </View>
            <View>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Utilization Rate</Text>
              <Text style={{ fontSize: 20, fontWeight: "bold", color: "#2563eb" }}>
                {Math.round((data.totals.billable / data.totals.grand) * 100)}%
              </Text>
            </View>
          </View>
        </View>

        {/* Notes */}
        {data.notes && (
          <View style={{ ...styles.section, marginTop: 15 }}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text>{data.notes}</Text>
          </View>
        )}

        {/* Signatures */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Technician</Text>
            <View style={styles.signatureLine} />
            <Text>{data.technician.name}</Text>
            <Text style={{ fontSize: 8, color: "#6b7280" }}>
              Submitted: {data.submittedAt || "_______________"}
            </Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Manager Approval</Text>
            <View style={styles.signatureLine} />
            <Text>{data.approvedBy || "________________________"}</Text>
            <Text style={{ fontSize: 8, color: "#6b7280" }}>
              Approved: {data.approvedAt || "_______________"}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>WaferWorx Field Service Management • Confidential</Text>
          <Text>Generated on {new Date().toLocaleDateString()}</Text>
        </View>
      </Page>
    </Document>
  );
}

export type { UtilizationData };
