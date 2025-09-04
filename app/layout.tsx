import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '../styles/global.css';
import '../styles/layout.css';
import '../styles/typography.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'AI Task Tracker',
  description: 'Умный трекер задач с напоминаниями и визуальной структурой',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={inter.variable}>
      <body className="layout-root">{children}</body>
    </html>
  );
}
