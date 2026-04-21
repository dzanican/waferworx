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
  textBlock: {
    backgroundColor: "#f9fafb",
    padding: 8,
    marginTop: 5,
    borderRadius: 4,
  },
  table: {
    marginTop: 10,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    padding: 5,
    fontWeight: "bold",
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #e5e7eb",
    padding: 5,
  },
  tableCell: {
    flex: 1,
  },
  signatureSection: {
    marginTop: 30,
    borderTop: "1px solid #e5e7eb",
    paddingTop: 20,
  },
  signatureBox: {
    width: "45%",
    marginRight: "10%",
  },
  signatureLine: {
    borderBottom: "1px solid #000",
    marginTop: 40,
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
});

interface CSRData {
  csrNumber: string;
  jobNumber: string;
  customer: {
    name: string;
    site: string;
    address: string;
    contact: string;
  };
  tool: {
    name: string;
    model: string;
    serialNumber: string;
  };
  technician: {
    name: string;
    email: string;
  };
  visitDates: {
    start: string;
    end: string;
  };
  entitlement: string;
  problemDescription: string;
  workPerformed: string;
  recommendations: string;
  hours: {
    travel: number;
    labor: number;
    total: number;
  };
  parts: Array<{
    partNumber: string;
    name: string;
    quantity: number;
  }>;
  customerSignature?: {
    name: string;
    date: string;
  };
}

export function CSRDocument({ data }: { data: CSRData }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.logo}>WaferWorx</Text>
            <Text style={styles.subtitle}>Field Service Management</Text>
          </View>
          <View style={{ textAlign: "right" }}>
            <Text style={styles.title}>Customer Service Report</Text>
            <Text style={styles.subtitle}>{data.csrNumber}</Text>
          </View>
        </View>

        {/* Job Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Visit Information</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Job Number:</Text>
                <Text style={styles.value}>{data.jobNumber}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Entitlement:</Text>
                <Text style={styles.value}>{data.entitlement}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Visit Start:</Text>
                <Text style={styles.value}>{data.visitDates.start}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Visit End:</Text>
                <Text style={styles.value}>{data.visitDates.end}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Customer:</Text>
                <Text style={styles.value}>{data.customer.name}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Site:</Text>
                <Text style={styles.value}>{data.customer.site}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Address:</Text>
                <Text style={styles.value}>{data.customer.address}</Text>
              </View>
              <View style={styles.row}>
                <Text style={styles.label}>Contact:</Text>
                <Text style={styles.value}>{data.customer.contact}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tool Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Equipment Information</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Tool Name:</Text>
                <Text style={styles.value}>{data.tool.name}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Model:</Text>
                <Text style={styles.value}>{data.tool.model}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Serial Number:</Text>
                <Text style={styles.value}>{data.tool.serialNumber}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Service Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Problem/Reason:</Text>
          </View>
          <View style={styles.textBlock}>
            <Text>{data.problemDescription}</Text>
          </View>
          <View style={{ ...styles.row, marginTop: 10 }}>
            <Text style={styles.label}>Work Performed:</Text>
          </View>
          <View style={styles.textBlock}>
            <Text>{data.workPerformed}</Text>
          </View>
          {data.recommendations && (
            <>
              <View style={{ ...styles.row, marginTop: 10 }}>
                <Text style={styles.label}>Recommendations:</Text>
              </View>
              <View style={styles.textBlock}>
                <Text>{data.recommendations}</Text>
              </View>
            </>
          )}
        </View>

        {/* Hours */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hours Summary</Text>
          <View style={styles.grid}>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Travel Hours:</Text>
                <Text style={styles.value}>{data.hours.travel}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Labor Hours:</Text>
                <Text style={styles.value}>{data.hours.labor}</Text>
              </View>
            </View>
            <View style={styles.gridItem}>
              <View style={styles.row}>
                <Text style={styles.label}>Total Hours:</Text>
                <Text style={{ ...styles.value, fontWeight: "bold" }}>{data.hours.total}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Parts */}
        {data.parts.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Parts Used</Text>
            <View style={styles.table}>
              <View style={styles.tableHeader}>
                <Text style={{ ...styles.tableCell, flex: 1 }}>Part Number</Text>
                <Text style={{ ...styles.tableCell, flex: 2 }}>Description</Text>
                <Text style={{ ...styles.tableCell, flex: 0.5 }}>Qty</Text>
              </View>
              {data.parts.map((part, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={{ ...styles.tableCell, flex: 1 }}>{part.partNumber}</Text>
                  <Text style={{ ...styles.tableCell, flex: 2 }}>{part.name}</Text>
                  <Text style={{ ...styles.tableCell, flex: 0.5 }}>{part.quantity}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Signatures */}
        <View style={styles.signatureSection}>
          <View style={{ flexDirection: "row" }}>
            <View style={styles.signatureBox}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Technician</Text>
              <View style={styles.signatureLine} />
              <Text>{data.technician.name}</Text>
              <Text style={{ fontSize: 8, color: "#6b7280" }}>{data.technician.email}</Text>
            </View>
            <View style={styles.signatureBox}>
              <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Customer Acknowledgment</Text>
              <View style={styles.signatureLine} />
              <Text>{data.customerSignature?.name || "________________________"}</Text>
              <Text style={{ fontSize: 8, color: "#6b7280" }}>
                Date: {data.customerSignature?.date || "_______________"}
              </Text>
            </View>
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

export type { CSRData };
