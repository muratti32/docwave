'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import { Loader } from '@/components/loader';

export function LiveBlockProvider({ children }: { children: ReactNode }) {
  const authEndPoint =
    process.env.NEXT_PUBLIC_LIVEBLOCKS_AUTH_ENDPOINT || '/api/liveblocks-auth';
  return (
    <LiveblocksProvider authEndpoint={authEndPoint}>
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}
