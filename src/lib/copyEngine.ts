export function generateInvoiceId(): string {
  const num = Math.floor(Math.random() * 900000 + 100000);
  return `INV-${num}`;
}

export function formatCurrency(amount: string): string {
  const num = parseFloat(amount);
  if (isNaN(num)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(num);
}
