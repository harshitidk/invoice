'use client';

import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from '@/components/InvoicePDF';
import { InvoiceData } from '@/lib/types';

export default function DownloadButton({ formData }: { formData: InvoiceData }) {
  return (
    <PDFDownloadLink
      document={<InvoicePDF formData={formData} />}
      fileName={`Invoice-${formData.invoiceId}.pdf`}
    >
      {({ loading }) => (
        <button
          className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
          style={{
            background: 'var(--color-teal)',
            color: '#fff',
            border: 'none',
            cursor: loading ? 'wait' : 'pointer',
            fontFamily: 'var(--font-display)',
            boxShadow: '0 2px 8px rgba(42, 111, 106, 0.12)',
            opacity: loading ? 0.7 : 1,
          }}
          disabled={loading}
        >
          {loading ? 'Preparing PDF...' : 'Download PDF'}
        </button>
      )}
    </PDFDownloadLink>
  );
}
