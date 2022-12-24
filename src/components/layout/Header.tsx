/* eslint-disable @typescript-eslint/no-explicit-any */

import { enGB } from 'date-fns/locale';
import moment from 'moment';
import * as React from 'react';
import { RiSearchLine } from 'react-icons/ri';
import { DateRangePicker } from 'react-nice-dates';
import { useDispatch, useSelector } from 'react-redux';

import {
  updateEndDate,
  updateEndDateUnix,
  updateStartDate,
  updateStartDateUnix,
} from '@/features/app';

interface HeaderProps {
  date?: boolean;
}

export default function Header({ date }: HeaderProps) {
  const dispatch = useDispatch();
  const app = useSelector((state: any) => state.app);

  const handleStartDate = (val: any) => {
    dispatch(updateStartDate(val));
    dispatch(updateStartDateUnix(moment(val).unix()));
  };
  const handleEndDate = async (val: any) => {
    dispatch(updateEndDate(val));
    dispatch(updateEndDateUnix(moment(val).unix()));
  };

  return (
    <header>
      <div className='layout flex h-14 items-center justify-between gap-x-10'>
        <div className='relative my-auto'>
          <span className='absolute left-0 flex translate-y-1/2 items-center pl-5'>
            <button
              type='submit'
              className='focus:shadow-outline p-1 focus:outline-none'
            >
              <RiSearchLine className='h-5 w-5 text-blue-500' />
            </button>
          </span>

          <input
            type='text'
            placeholder='search'
            className='ring-primary focus:border-primary h-[3.3125rem] w-[40vw] rounded-lg border-[0.2px] border-gray-100 bg-dark pl-14 text-white outline-none focus:ring-0'
          />
        </div>

        {date && (
          <div className='z-50 flex'>
            <DateRangePicker
              startDate={app.startDate}
              endDate={app.endDate}
              onStartDateChange={handleStartDate}
              onEndDateChange={handleEndDate}
              maximumDate={new Date()}
              minimumDate={
                new Date(
                  'Sat Dec 24 2010 11:03:38 GMT+0100 (West Africa Standard Time)'
                )
              }
              minimumLength={30}
              maximumLength={365}
              format='dd MMM yyyy'
              locale={enGB}
            >
              {({ startDateInputProps, endDateInputProps }) => (
                <div className='date-range flex flex-row'>
                  <input
                    className='input rounded-l-2xl border-0 bg-content py-4'
                    {...startDateInputProps}
                    placeholder='Start date'
                  />

                  <input
                    className='input rounded-r-2xl border-0 bg-content py-4 text-right'
                    {...endDateInputProps}
                    placeholder='End date'
                  />
                </div>
              )}
            </DateRangePicker>
          </div>
        )}
      </div>
    </header>
  );
}
