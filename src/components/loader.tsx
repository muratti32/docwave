import React from 'react';
import Image from 'next/image';

type Props = {};

export const Loader = (props: Props) => {
  return (
    <div className="loader">
      <Image
        src={'/assets/icons/loader.svg'}
        alt="Loader"
        width={32}
        height={32}
        className="animate-spin"
      />
      Loading...
    </div>
  );
};
