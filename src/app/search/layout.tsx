import { ReactNode } from 'react';
import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Search',
  description: 'Search',
};

export default function PageLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode;
}>) {
  return (
    <main className={'flex flex-col'}>
      <section className={'animate-fade-in'}>
        <Breadcrumbs/>
        {children}
      </section>
    </main>
  );
}
