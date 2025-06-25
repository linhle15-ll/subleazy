import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import Header from '@/components/layout/header';
import ReactQueryProvider from '@/components/providers/react-query-provider';
import MapProvider from '@/components/providers/map-provider';
import './globals.css';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Subleazy',
  description: 'sublease made easy',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <ReactQueryProvider>
          <MapProvider>
            <Header />
            {/* TODO: Refactor UI by adding consistent layout to the pages and font + size tot texts */}
            {children}
          </MapProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
