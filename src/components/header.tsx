import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const Header = (props: Props) => {
  const { children } = props;
  return (
    <div className="header">
      <Link href="/" className="md:flex-1">
        <Image
          src={'/assets/icons/logo.svg'}
          alt="Logo with"
          width={120}
          height={32}
          className="hidden md:block"
        />
        <Image
          src={'/assets/icons/logo-icon.svg'}
          alt="Logo with"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  );
};
