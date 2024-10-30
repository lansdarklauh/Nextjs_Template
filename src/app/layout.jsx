import './globals.scss';
import ClientComponent from './components/ClientComponent';
import { Suspense } from 'react';
import Script from 'next/script';

export const metadata = {
  title: 'Nextjs Template',
  description: 'A Next.js template with a custom layout, global styles, and metadata configuration.',
  authors: [{ name: 'LansDarkLauh', url: 'https://github.com/lansdarklauh' }]
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};
// 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head></head>
      <body>
        <Suspense fallback={null}>
          <ClientComponent></ClientComponent>
        </Suspense>
        <div className='_next_main'>
          <main className='_next_content'>
            <div className='_next_page'>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
