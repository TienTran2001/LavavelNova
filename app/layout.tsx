import ThemeProvider from '@/app/_theme';
import { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Laravel Nova - Home',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
