import { useRouter } from 'next/router';
import React from 'react';
import { RiBarChart2Fill, RiMenuLine, RiTableFill } from 'react-icons/ri';
import { useDispatch } from 'react-redux';

import clsxm from '@/lib/clsxm';

import UnstyledLink from '@/components/links/UnstyledLink';

import { setId } from '@/features/app';

function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleId = (value: string) => dispatch(setId(value));

  return (
    <div className='hidden flex-col gap-y-10 lg:flex'>
      <button className='flex max-w-[5rem] items-center justify-center rounded-3xl bg-content p-5'>
        <RiMenuLine className='h-6 w-6 text-blue-500' />
      </button>

      <div className='flex min-h-[75vh] max-w-[5rem] flex-col items-center gap-y-6 rounded-3xl bg-content px-4 py-6'>
        <UnstyledLink href='/'>
          <button
            className={clsxm(
              router.pathname === '/' && 'bg-blue-500',
              'flex min-h-[4rem] min-w-[4rem] flex-col items-center justify-center rounded-3xl p-2'
            )}
          >
            <RiTableFill className='h-6 w-6 text-white' />
          </button>
        </UnstyledLink>

        <UnstyledLink href='/bitcoin'>
          <button
            onClick={() => handleId('bitcoin')}
            className={clsxm(
              router.pathname !== '/' && 'bg-blue-500',
              'flex min-h-[4rem] min-w-[4rem] flex-col items-center justify-center rounded-3xl p-2'
            )}
          >
            <RiBarChart2Fill className='h-6 w-6 text-white' />
          </button>
        </UnstyledLink>
      </div>
    </div>
  );
}

export default Sidebar;
