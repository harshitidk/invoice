'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { InvoiceData } from '@/lib/types';
import { formatCurrency } from '@/lib/copyEngine';

const DownloadButton = dynamic(() => import('@/components/DownloadButton'), { ssr: false });

export default function ExportPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [formData, setFormData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    setMounted(true);
    const stored = sessionStorage.getItem('invoiceData');
    if (stored) {
      setFormData(JSON.parse(stored));
    }
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10" style={{ background: 'var(--color-bg)' }}>
        <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading...</p>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10" style={{ background: 'var(--color-bg)' }}>
        <div className="text-center max-w-xs">
          <h2 className="text-lg font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            No invoice found
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-text-secondary)' }}>
            Create one first.
          </p>
          <button
            onClick={() => router.push('/generate')}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
            style={{
              background: 'var(--color-teal)',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-display)',
            }}
          >
            Create Invoice
          </button>
        </div>
      </div>
    );
  }

  const amount = formatCurrency(formData.amount || '0');

  return (
    <div className="min-h-screen flex flex-col relative z-10" style={{ background: 'var(--color-bg)' }}>
      {/* Nav */}
      <nav
        className="flex items-center justify-between px-6 md:px-10 lg:px-16 py-4"
        style={{ borderBottom: '1px solid var(--color-border-light)' }}
      >
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2.5"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center"
            style={{ background: 'var(--color-teal)', color: '#fff' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <span
            className="font-semibold text-sm tracking-tight"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Petty Invoice
          </span>
        </button>

        <button
          onClick={() => router.push('/generate')}
          className="text-sm font-medium transition-colors duration-200"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-secondary)',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-teal)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
        >
          ← Edit
        </button>
      </nav>

      {/* Content */}
      <div className="flex-1 py-10 md:py-14 px-6">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8 animate-in">
            <h1
              className="text-xl font-bold tracking-tight mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Your invoice is ready
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Download the PDF or go back to make changes.
            </p>
          </div>

          {/* Invoice Summary Card */}
          <div
            className="rounded-2xl p-6 md:p-7 mb-6 animate-in delay-1"
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border-light)',
              boxShadow: 'var(--shadow-md)',
              animationFillMode: 'both',
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="text-base font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  INVOICE
                </div>
                <div className="text-xs font-mono mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                  {formData.invoiceId}
                </div>
              </div>
              <div
                className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                style={{ background: 'var(--color-sage-pale)', color: 'var(--color-teal)' }}
              >
                Pending
              </div>
            </div>

            {/* Names */}
            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-text-muted)' }}>From</div>
                <div className="text-sm font-medium">{formData.senderName || 'Your Name'}</div>
              </div>
              <div>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-text-muted)' }}>To</div>
                <div className="text-sm font-medium">{formData.friendName || 'Friend\'s Name'}</div>
              </div>
            </div>

            {/* Item */}
            <div
              className="flex justify-between items-center py-3"
              style={{ borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)' }}
            >
              <span className="text-sm">{formData.reason || 'Item description'}</span>
              <span className="text-sm font-semibold">{amount}</span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-3 mt-1" style={{ borderTop: '1.5px solid var(--color-text)' }}>
              <span className="font-bold text-sm" style={{ fontFamily: 'var(--font-display)' }}>Total</span>
              <span className="font-bold" style={{ color: 'var(--color-teal)' }}>{amount}</span>
            </div>

            {/* Note */}
            {formData.customMessage && (
              <div className="mt-5 pt-4" style={{ borderTop: '1px solid var(--color-border-light)' }}>
                <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>Note</div>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                  {formData.customMessage}
                </p>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3 animate-in delay-2" style={{ animationFillMode: 'both' }}>
            <DownloadButton formData={formData} />

            <button
              onClick={() => router.push('/generate')}
              className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors duration-200"
              style={{
                background: 'none',
                border: '1px solid var(--color-border)',
                cursor: 'pointer',
                color: 'var(--color-text-secondary)',
                fontFamily: 'var(--font-sans)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-teal)';
                e.currentTarget.style.color = 'var(--color-teal)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-border)';
                e.currentTarget.style.color = 'var(--color-text-secondary)';
              }}
            >
              ← Edit Invoice
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
