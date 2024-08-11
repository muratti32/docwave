import { useOthers } from '@liveblocks/react/suspense';
import Image from 'next/image';
import React from 'react';

type Props = {};

export const ActiveCollabrators = (props: Props) => {
  const others = useOthers();
  const collabrators = others.map((other) => other.info);
  return (
    <div>
      {collabrators.map(({ id, avatar, name, color }) => (
        <li>
          <Image
            alt="avatar"
            src={avatar}
            width={100}
            height={100}
            className="inline-block rounded-full size-8 ring-2 ring-dark-100"
            style={{ border: `2px solid ${color}` }}
          />
        </li>
      ))}
    </div>
  );
};
