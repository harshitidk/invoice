'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';
import { InvoiceData } from '@/lib/types';
import { formatCurrency } from '@/lib/copyEngine';

Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf', fontWeight: 500 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf', fontWeight: 600 },
    { src: 'https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf', fontWeight: 700 },
  ],
});

const teal = '#2a6f6a';
const textColor = '#2c3e50';
const textMuted = '#8e9eab';
const border = '#e4e1da';
const sagePale = '#e8ece5';

const s = StyleSheet.create({
  page: {
    fontFamily: 'Inter',
    fontSize: 10,
    padding: 50,
    color: textColor,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  title: {
    fontSize: 22,
    fontWeight: 700,
    letterSpacing: -0.3,
    color: textColor,
  },
  invoiceId: {
    fontSize: 9,
    color: textMuted,
    marginTop: 3,
    fontFamily: 'Courier',
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 7,
    fontWeight: 700,
    letterSpacing: 1.2,
    backgroundColor: sagePale,
    color: teal,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  block: {
    width: '45%',
  },
  label: {
    fontSize: 7,
    fontWeight: 700,
    color: textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: 600,
  },
  detail: {
    fontSize: 9,
    color: '#5a6f7f',
    marginTop: 2,
  },
  datesRow: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 28,
  },
  dateValue: {
    fontSize: 10,
    fontWeight: 500,
    marginTop: 2,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: border,
    paddingBottom: 6,
    marginBottom: 6,
  },
  tableHeaderText: {
    fontSize: 7,
    fontWeight: 700,
    color: textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  colDesc: { width: '70%' },
  colAmt: { width: '30%', textAlign: 'right' },
  itemText: { fontSize: 11 },
  itemAmt: { fontSize: 11, fontWeight: 600, textAlign: 'right' },
  totalRow: {
    flexDirection: 'row',
    borderTopWidth: 1.5,
    borderTopColor: textColor,
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: { width: '70%', fontSize: 12, fontWeight: 700 },
  totalAmt: { width: '30%', fontSize: 14, fontWeight: 700, textAlign: 'right', color: teal },
  noteSection: {
    marginTop: 28,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: border,
  },
  noteLabel: {
    fontSize: 7,
    fontWeight: 700,
    color: textMuted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  noteText: {
    fontSize: 10,
    color: '#5a6f7f',
    lineHeight: 1.6,
  },
  watermark: {
    position: 'absolute',
    bottom: 24,
    right: 36,
    fontSize: 7,
    color: '#d4d0ca',
  },
});

interface Props {
  formData: InvoiceData;
}

export default function InvoicePDF({ formData }: Props) {
  const amount = formatCurrency(formData.amount || '0');

  return (
    <Document>
      <Page size="A4" style={s.page}>
        {/* Header */}
        <View style={s.header}>
          <View>
            <Text style={s.title}>INVOICE</Text>
            <Text style={s.invoiceId}>{formData.invoiceId}</Text>
          </View>
          <View style={s.badge}>
            <Text>PENDING</Text>
          </View>
        </View>

        {/* Parties */}
        <View style={s.row}>
          <View style={s.block}>
            <Text style={s.label}>FROM</Text>
            <Text style={s.name}>{formData.senderName || 'Your Name'}</Text>
          </View>
          <View style={s.block}>
            <Text style={s.label}>TO</Text>
            <Text style={s.name}>{formData.friendName || 'Friend&apos;s Name'}</Text>
            {formData.address ? <Text style={s.detail}>{formData.address}</Text> : null}
          </View>
        </View>

        {/* Dates */}
        <View style={s.datesRow}>
          <View>
            <Text style={s.label}>ISSUE DATE</Text>
            <Text style={s.dateValue}>{formData.issueDate}</Text>
          </View>
          <View>
            <Text style={s.label}>DUE DATE</Text>
            <Text style={s.dateValue}>{formData.dueDate}</Text>
          </View>
        </View>

        {/* Table */}
        <View style={s.tableHeader}>
          <View style={s.colDesc}>
            <Text style={s.tableHeaderText}>DESCRIPTION</Text>
          </View>
          <View style={s.colAmt}>
            <Text style={{ ...s.tableHeaderText, textAlign: 'right' }}>AMOUNT</Text>
          </View>
        </View>

        <View style={s.tableRow}>
          <View style={s.colDesc}>
            <Text style={s.itemText}>{formData.reason || 'Item description'}</Text>
          </View>
          <View style={s.colAmt}>
            <Text style={s.itemAmt}>{amount}</Text>
          </View>
        </View>

        <View style={s.totalRow}>
          <View style={s.colDesc}>
            <Text style={s.totalLabel}>Total</Text>
          </View>
          <View style={s.colAmt}>
            <Text style={s.totalAmt}>{amount}</Text>
          </View>
        </View>

        {/* Note */}
        {formData.customMessage ? (
          <View style={s.noteSection}>
            <Text style={s.noteLabel}>NOTE</Text>
            <Text style={s.noteText}>{formData.customMessage}</Text>
          </View>
        ) : null}

        <Text style={s.watermark}>Petty Invoice</Text>
      </Page>
    </Document>
  );
}
