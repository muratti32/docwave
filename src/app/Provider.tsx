'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  ClientSideSuspense,
} from '@liveblocks/react/suspense';
import { Loader } from '@/components/loader';
import { getClerkUsers } from '@/lib/actions/user.actions';

export function Provider({ children }: { children: ReactNode }) {
  const authEndPoint =
    process.env.NEXT_PUBLIC_LIVEBLOCKS_AUTH_ENDPOINT || '/api/liveblocks-auth';
  return (
    <LiveblocksProvider
      authEndpoint={authEndPoint}
      resolveUsers={async (userIds) => {
        console.log(`halo resolve userIds:`, userIds);
        const users = await getClerkUsers({ userIds });

        return users;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
}
