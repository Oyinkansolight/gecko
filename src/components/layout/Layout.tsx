import * as React from 'react';

import Sidebar from '@/components/layout/Sidebar';

import Header from './Header';

export default function Layout({
  children,
  date = false,
}: {
  children: React.ReactNode;
  date?: boolean;
}) {
  // Put Header or Footer Here
  return (
    <div className='m-0 flex max-h-screen min-h-screen max-w-[100vw] flex-col overflow-x-hidden bg-dark md:overflow-hidden'>
      <div className='flex flex-1 flex-row'>
        <main className='flex flex-1 flex-col'>
          <header className='mt-6 self-start'>
            <Header date={date} />
          </header>

          <div className='max-h-[100vh] p-6 lg:p-10'>{children}</div>
        </main>

        <nav className='order-first ml-8 mt-2 hidden py-4 lg:block'>
          <Sidebar />
        </nav>
      </div>
    </div>
  );
}
