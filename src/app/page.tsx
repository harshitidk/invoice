'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {/* Nav */}
      <nav
        className={`flex items-center justify-between px-6 md:px-10 lg:px-16 py-5 ${
          mounted ? 'animate-fade' : 'opacity-0'
        }`}
      >
        <div className="flex items-center gap-2.5">
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
        </div>

        <div className="flex items-center gap-6">
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
            Create Invoice
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div
          className={`text-center max-w-lg mx-auto ${
            mounted ? 'animate-in' : 'opacity-0'
          }`}
        >
          <h1
            className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold leading-tight tracking-tight mb-5"
            style={{ fontFamily: 'var(--font-display)', color: 'var(--color-text)' }}
          >
            Create an invoice for that friend who “forgot.”
          </h1>

          <p
            className={`text-base md:text-lg leading-relaxed mb-10 max-w-md mx-auto ${
              mounted ? 'animate-in delay-1' : 'opacity-0'
            }`}
            style={{ color: 'var(--color-text-secondary)', animationFillMode: 'both' }}
          >
            For splits, IOUs, and messages that ended with “I’ll send it.” Add the details, write your note, and make it official.
          </p>

          <div
            className={`${mounted ? 'animate-in delay-2' : 'opacity-0'}`}
            style={{ animationFillMode: 'both' }}
          >
            <button
              onClick={() => router.push('/generate')}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{
                background: 'var(--color-teal)',
                color: '#fff',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                boxShadow: '0 2px 8px rgba(42, 111, 106, 0.15)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-teal-dark)';
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(42, 111, 106, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--color-teal)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(42, 111, 106, 0.15)';
              }}
            >
              Create Invoice
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </div>

        {/* Quiet note */}
        <p
          className={`mt-16 text-xs ${mounted ? 'animate-in delay-3' : 'opacity-0'}`}
          style={{ color: 'var(--color-text-muted)', animationFillMode: 'both' }}
        >
          Because reminders clearly aren’t working.
        </p>
      </main>
    </div>
  );
}
