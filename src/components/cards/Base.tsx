import React from 'react';

import clsxm from '@/lib/clsxm';

interface BaseCardProps {
  className?: string;
  leftBorder?: boolean;
  leftBorderBg?: string;
  children: JSX.Element;
  onClick?: () => void;
}

const BaseCard = ({
  className,
  leftBorder,
  leftBorderBg,
  children,
  onClick,
}: BaseCardProps) => {
  return (
    <div onClick={onClick} className='relative'>
      <div
        className={clsxm(
          className,
          'flex flex-col rounded-2xl bg-content py-6 px-8'
        )}
      >
        {children}

        {leftBorder && (
          <div
            className={clsxm(
              leftBorderBg,
              'absolute top-2 left-0 h-6 w-1 rounded-md bg-gray-200'
            )}
          ></div>
        )}
      </div>
    </div>
  );
};

export default BaseCard;
