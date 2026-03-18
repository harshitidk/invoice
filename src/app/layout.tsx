import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Petty Invoice — A simple invoice for personal debts",
  description: "Create a clean, professional invoice for someone who still owes you. Add the details, write a note, and download a PDF you can actually send.",
  openGraph: {
    title: "Petty Invoice — A simple invoice for personal debts",
    description: "Create a clean invoice for someone who still owes you.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
