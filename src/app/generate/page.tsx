'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { InvoiceData } from '@/lib/types';
import { generateInvoiceId, formatCurrency } from '@/lib/copyEngine';

export default function GeneratorPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  const [form, setForm] = useState<InvoiceData>({
    senderName: '',
    friendName: '',
    address: '',
    reason: '',
    amount: '',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    customMessage: '',
    invoiceId: '',
    issueDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    setMounted(true);
    setForm((prev) => ({ ...prev, invoiceId: generateInvoiceId() }));
  }, []);

  const update = (field: keyof InvoiceData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleExport = () => {
    sessionStorage.setItem('invoiceData', JSON.stringify(form));
    router.push('/export');
  };

  const displayAmount = formatCurrency(form.amount || '0');

  /* Shared input style */
  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '10px 14px',
    borderRadius: '10px',
    border: '1px solid var(--color-border)',
    background: 'var(--color-surface)',
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    color: 'var(--color-text)',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-teal)';
    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(42, 111, 106, 0.06)';
  };

  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderColor = 'var(--color-border)';
    e.currentTarget.style.boxShadow = 'none';
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '12px',
    fontWeight: 600,
    fontFamily: 'var(--font-display)',
    color: 'var(--color-text-secondary)',
    marginBottom: '6px',
    letterSpacing: '0.02em',
  };

  return (
    <div className="min-h-screen flex flex-col relative z-10" style={{ background: 'var(--color-bg)' }}>
      {/* Nav */}
      <nav
        className={`flex items-center justify-between px-6 md:px-10 lg:px-16 py-4 ${
          mounted ? 'animate-fade' : 'opacity-0'
        }`}
        style={{ borderBottom: '1px solid var(--color-border-light)' }}
      >
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2.5 group"
          style={{ background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <div
            className="w-7 h-7 rounded-md flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
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
          onClick={() => router.push('/')}
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
          ← Back
        </button>
      </nav>

      {/* Content */}
      <div className="flex-1 py-8 md:py-12 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div
            className={`mb-10 ${mounted ? 'animate-in' : 'opacity-0'}`}
          >
            <h1
              className="text-xl md:text-2xl font-bold tracking-tight mb-1"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              New Invoice
            </h1>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Fill in the details below. The preview updates as you type.
            </p>
          </div>

          {/* Two column layout */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Left — Form */}
            <div
              className={`lg:w-[400px] xl:w-[440px] shrink-0 ${mounted ? 'animate-in delay-1' : 'opacity-0'}`}
              style={{ animationFillMode: 'both' }}
            >
              <div
                className="rounded-2xl p-6 md:p-7"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-light)',
                }}
              >
                {/* Row: Names */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label style={labelStyle}>Your Name</label>
                    <input
                      style={inputStyle}
                      placeholder="Your name"
                      value={form.senderName}
                      onChange={(e) => update('senderName', e.target.value)}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Friend&apos;s Name</label>
                    <input
                      style={inputStyle}
                      placeholder="Who owes you"
                      value={form.friendName}
                      onChange={(e) => update('friendName', e.target.value)}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>
                </div>

                {/* Address */}
                <div className="mb-5">
                  <label style={labelStyle}>Address <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>(optional)</span></label>
                  <input
                    style={inputStyle}
                    placeholder="Their address"
                    value={form.address}
                    onChange={(e) => update('address', e.target.value)}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>

                {/* Reason */}
                <div className="mb-5">
                  <label style={labelStyle}>Item / Reason</label>
                  <input
                    style={inputStyle}
                    placeholder="What they owe you for"
                    value={form.reason}
                    onChange={(e) => update('reason', e.target.value)}
                    onFocus={inputFocus}
                    onBlur={inputBlur}
                  />
                </div>

                {/* Amount + Due Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label style={labelStyle}>Amount ($)</label>
                    <input
                      style={inputStyle}
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="0.00"
                      value={form.amount}
                      onChange={(e) => update('amount', e.target.value)}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Due Date</label>
                    <input
                      style={inputStyle}
                      type="date"
                      value={form.dueDate}
                      onChange={(e) => update('dueDate', e.target.value)}
                      onFocus={inputFocus}
                      onBlur={inputBlur}
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="my-6" style={{ borderTop: '1px solid var(--color-border-light)' }} />

                {/* Custom Message */}
                <div className="mb-6">
                  <label style={labelStyle}>
                    Add a note <span style={{ fontWeight: 400, color: 'var(--color-text-muted)' }}>(optional, but recommended)</span>
                  </label>
                  <textarea
                    style={{
                      ...inputStyle,
                      resize: 'none',
                      minHeight: '88px',
                      lineHeight: '1.6',
                    }}
                    placeholder="Write something honest, funny, or passive-aggressive — your call."
                    value={form.customMessage}
                    onChange={(e) => update('customMessage', e.target.value)}
                    onFocus={inputFocus as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                    onBlur={inputBlur as unknown as React.FocusEventHandler<HTMLTextAreaElement>}
                  />
                </div>

                {/* Generate */}
                <button
                  onClick={handleExport}
                  className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={{
                    background: 'var(--color-teal)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)',
                    boxShadow: '0 2px 8px rgba(42, 111, 106, 0.12)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--color-teal-dark)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(42, 111, 106, 0.18)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'var(--color-teal)';
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(42, 111, 106, 0.12)';
                  }}
                >
                  Download PDF
                </button>
              </div>
            </div>

            {/* Right — Preview */}
            <div
              className={`flex-1 min-w-0 ${mounted ? 'animate-in delay-2' : 'opacity-0'}`}
              style={{ animationFillMode: 'both' }}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className="text-[11px] font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--color-text-muted)', fontFamily: 'var(--font-display)' }}
                >
                  Preview
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--color-teal-light)' }} />
                  <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Live</span>
                </div>
              </div>

              {/* Invoice Card */}
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border-light)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-10">
                  <div>
                    <h2
                      className="text-lg font-bold tracking-tight"
                      style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
                    >
                      INVOICE
                    </h2>
                    <div className="text-xs font-mono mt-1" style={{ color: 'var(--color-text-muted)' }}>
                      {form.invoiceId}
                    </div>
                  </div>
                  <div
                    className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      background: 'var(--color-sage-pale)',
                      color: 'var(--color-teal)',
                    }}
                  >
                    Pending
                  </div>
                </div>

                {/* From / To */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>
                      From
                    </div>
                    <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      {form.senderName || 'Your Name'}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--color-text-muted)' }}>
                      To
                    </div>
                    <div className="text-sm font-medium" style={{ color: 'var(--color-text)' }}>
                      {form.friendName || 'Friend\'s Name'}
                    </div>
                    {form.address && (
                      <div className="text-xs mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>
                        {form.address}
                      </div>
                    )}
                  </div>
                </div>

                {/* Dates */}
                <div className="flex gap-8 mb-8">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      Issue Date
                    </div>
                    <div className="text-xs font-medium">{form.issueDate}</div>
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: 'var(--color-text-muted)' }}>
                      Due Date
                    </div>
                    <div className="text-xs font-medium">{form.dueDate}</div>
                  </div>
                </div>

                {/* Item table */}
                <div className="mb-6">
                  <div
                    className="flex justify-between pb-2 mb-3"
                    style={{ borderBottom: '1px solid var(--color-border)' }}
                  >
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                      Description
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                      Amount
                    </span>
                  </div>

                  <div className="flex justify-between py-3">
                    <span className="text-sm" style={{ color: 'var(--color-text)' }}>
                      {form.reason || 'Item description'}
                    </span>
                    <span className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>
                      {displayAmount}
                    </span>
                  </div>

                  {/* Total */}
                  <div
                    className="flex justify-between pt-4 mt-3"
                    style={{ borderTop: '1.5px solid var(--color-text)' }}
                  >
                    <span className="text-sm font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                      Total
                    </span>
                    <span className="text-base font-bold" style={{ color: 'var(--color-teal)' }}>
                      {displayAmount}
                    </span>
                  </div>
                </div>

                {/* Custom note */}
                {form.customMessage && (
                  <div
                    className="mt-6 pt-5"
                    style={{ borderTop: '1px solid var(--color-border-light)' }}
                  >
                    <div className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--color-text-muted)' }}>
                      Note
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>
                      {form.customMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
